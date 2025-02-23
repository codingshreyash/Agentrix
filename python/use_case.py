import re
from flask import Flask, request, g # type: ignore
from agentrix import metrics

app = Flask(__name__)

# Set the session ID provider
def get_current_session_id():
    return g.conversation_id if hasattr(g, 'conversation_id') else None

metrics.set_session_id_provider(get_current_session_id)

# Before each request, set the conversation_id in the request context
@app.before_request
def set_conversation_id():
    g.conversation_id = request.headers.get('Conversation-ID')  # Assuming it's passed in headers


@app.route('/chat', methods=['POST'])
@metrics.track_response  # Automatically tracks the response as displayed output
def chat():
    user_input = request.json['message']
    metrics.record_user_input(user_input)  # Record user input

    output = kickoff_agent(user_input)
    return {'response': output}

@metrics.track_agent_output
def process_input(input_text):
    # Simulate tool execution
    if 'flight' in input_text:
        flight_id = extract_flight_id(input_text)
        metrics.log_user_action('tool_executed', {
            'tool': 'flight_lookup',
            'parameters': [flight_id]
        })
        return f"Flight {flight_id} status: On time"
    
    return "I'm sorry, I couldn't process your request."

def extract_flight_id(input_text):
    """Extract a flight ID from the input (dummy implementation)."""
    words = input_text.split()
    for word in words:
        if word.isdigit():
            return word
    return "unknown"