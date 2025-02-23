import React from 'react';
import { Code, CheckCircle } from 'lucide-react';

export function Setup() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Integrate Agentrix</h1>
        
        <div className="space-y-8">
          {/* Quick Start */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Install the Agentrix SDK and start tracking user interactions in minutes.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg">
                <code className="text-indigo-400">npm install @agentrix/sdk</code>
              </div>
            </div>
          </section>

          {/* Integration Example */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Integration Example</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm text-gray-300">
                  <code>{`import { AgentrixTracker } from '@agentrix/sdk';

const tracker = new AgentrixTracker({
  apiKey: 'your-api-key',
  agent: 'code-assistant'
});

// Track user messages
tracker.capture('user_message', {
  message: userInput,
  userId: user.id,
  timestamp: new Date()
});

// Track AI responses
tracker.capture('ai_response', {
  message: aiResponse,
  userId: user.id,
  intent: recognizedIntent,
  timestamp: new Date()
});

// Track recognized intents
tracker.capture('recognized_intent', {
  intent: 'generate_code',
  confidence: 0.95,
  userId: user.id
});`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Event Types */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Supported Event Types</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'user_message',
                    description: 'Track user inputs and queries',
                  },
                  {
                    name: 'ai_response',
                    description: 'Monitor AI agent responses',
                  },
                  {
                    name: 'recognized_intent',
                    description: 'Log detected user intents',
                  },
                  {
                    name: 'feature_request',
                    description: 'Capture implicit feature requests',
                  },
                ].map(event => (
                  <div key={event.name} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <code className="text-indigo-400">{event.name}</code>
                    </div>
                    <p className="text-gray-300 text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Custom Intent Configuration */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Configure Recognized Intents</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Define custom intents for your AI agent to track specific user behaviors.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm text-gray-300">
                  <code>{`// config/intents.js
export const customIntents = [
  {
    name: 'generate_code',
    keywords: ['code', 'function', 'class', 'implement'],
    confidence: 0.8
  },
  {
    name: 'create_design_doc',
    keywords: ['design', 'document', 'architecture', 'spec'],
    confidence: 0.7
  }
];`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Documentation Link */}
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
            >
              <Code className="w-5 h-5" />
              <span>View Full Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}