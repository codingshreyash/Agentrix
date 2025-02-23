import sys
import time
import threading
import queue
import functools
import asyncio
from contextlib import contextmanager

# Simulated backend function (replace with actual backend integration)
def send_metric_to_backend(metric):
    print(f"Metric sent: {metric}")

# Queue and worker for asynchronous metric sending
metric_queue = queue.Queue()

def metric_worker():
    while True:
        metric = metric_queue.get()
        if metric is None:
            break
        try:
            send_metric_to_backend(metric)
        except Exception as e:
            print(f"Failed to send metric: {e}")
        metric_queue.task_done()

threading.Thread(target=metric_worker, daemon=True).start()

# Thread-local storage for session ID
_thread_local = threading.local()

@contextmanager
def session(session_id):
    """Set a session ID for all metrics within this block."""
    original_session_id = getattr(_thread_local, 'session_id', None)
    _thread_local.session_id = session_id
    try:
        yield
    finally:
        if original_session_id is None:
            del _thread_local.session_id
        else:
            _thread_local.session_id = original_session_id

def get_current_session_id():
    return getattr(_thread_local, 'session_id', None)

def send_metric(metric_name, data):
    """Send a metric asynchronously with the current session ID."""
    session_id = get_current_session_id()
    metric = {
        "session_id": session_id,
        "metric_name": metric_name,
        "data": data,
        "timestamp": time.time()
    }
    metric_queue.put(metric)

# Decorators and Functions
def track_user_input(func):
    """Decorator to track user input from a function's return value."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        input_text = func(*args, **kwargs)
        send_metric("user_input", {"text": input_text})
        return input_text
    return wrapper

def track_agent_output(func):
    """Decorator to track agent output, supporting sync and async functions."""
    if asyncio.iscoroutinefunction(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            output = await func(*args, **kwargs)
            send_metric("agent_output", {"output": output})
            return output
        return wrapper
    else:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            output = func(*args, **kwargs)
            send_metric("agent_output", {"output": output})
            return output
        return wrapper

@contextmanager
def track_displayed_output():
    """Context manager to capture displayed output."""
    original_stdout = sys.stdout
    try:
        sys.stdout = MetricsStream(original_stdout)
        yield
    finally:
        sys.stdout = original_stdout

class MetricsStream:
    """Custom stream to capture output for metrics."""
    def __init__(self, original_stream):
        self.original_stream = original_stream
        self.buffer = []

    def write(self, text):
        self.buffer.append(text)
        self.original_stream.write(text)

    def flush(self):
        displayed_text = ''.join(self.buffer)
        if displayed_text.strip():
            send_metric("displayed_output", {"text": displayed_text})
        self.buffer = []
        self.original_stream.flush()

def log_user_action(action_name, data):
    """Log a specific user action with associated data."""
    send_metric("user_action", {"action": action_name, "data": data})

# Explicit recording functions for finer control
def record_user_input(input_text):
    """Explicitly record user input."""
    send_metric("user_input", {"text": input_text})

def record_agent_output(output_text):
    """Explicitly record agent output."""
    send_metric("agent_output", {"output": output_text})

def record_displayed_output(output_text):
    """Explicitly record displayed output."""
    send_metric("displayed_output", {"text": output_text})