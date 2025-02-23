import React from 'react';
import { ArrowRight, Brain, LineChart, Zap } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Agentrix: Engagement Metrics for Vertical AI Agents
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Capture user intent and interactions in real time.
          </p>
          <div className="max-w-2xl mx-auto space-y-6 text-gray-300">
            <p>
              Users of AI agents often make unexpected requests—like asking a code-writing agent
              to create design documents. Without proper tracking, these opportunities for new
              features go unnoticed.
            </p>
            <p>
              We believe AI agents remove guesswork from product roadmaps and help teams ship
              features users will love. Agentrix seamlessly integrates with your AI agent layer,
              capturing every user input and mapping it to real-time analytics.
            </p>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Button onClick={scrollToFeatures}>
              Learn More
            </Button>
            <Button to="/chat" variant="secondary">
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How Agentrix Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="text-indigo-400 mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-time Intent Tracking
              </h3>
              <p className="text-gray-300">
                Advanced NLP algorithms analyze user queries to understand true intent and feature demands.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="text-indigo-400 mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Automatic Feature Discovery
              </h3>
              <p className="text-gray-300">
                Identify patterns in user requests to uncover opportunities for new features.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="text-indigo-400 mb-4">
                <LineChart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Seamless Analytics Integration
              </h3>
              <p className="text-gray-300">
                Easy integration with your existing analytics stack for comprehensive insights.
              </p>
            </div>
          </div>

          <div className="bg-gray-700 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Real World Example
            </h3>
            <p className="text-gray-300 mb-6">
              A code-writing AI agent's users frequently request design document templates.
              Agentrix identifies this pattern and suggests adding a document generator
              feature, leading to increased user satisfaction and reduced context switching.
            </p>
            <div className="flex justify-center">
              <Button to="/chat" className="flex items-center gap-2">
                Try Our Live Chat Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}