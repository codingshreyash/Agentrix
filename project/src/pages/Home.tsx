import React from 'react';
import { ArrowRight, Brain, LineChart, Zap, Activity, DollarSign } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative">
          <span className="inline-block text-emerald-400 font-medium mb-2">AI Analytics Platform</span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-orange-300 to-purple-400">
            Agentrix: Turn AI Interactions into Actionable Insights
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Track requests, spot opportunities, boost revenue—in real time
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={scrollToFeatures} variant="emerald">
              Learn More
            </Button>
            <Button to="/chat" variant="orange">
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-orange-300 to-purple-400">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="text-emerald-400 mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-time Intent Tracking
              </h3>
              <p className="text-gray-300">
                Pinpoint user requests—even for unexpected features
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <div className="text-orange-400 mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Automatic Feature Discovery
              </h3>
              <p className="text-gray-300">
                Uncover hidden product opportunities with pattern analysis
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="text-purple-400 mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Frustration & Sentiment Analysis
              </h3>
              <p className="text-gray-300">
                Reduce churn by detecting user frustration early
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="text-emerald-400 mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Revenue Impact
              </h3>
              <p className="text-gray-300">
                Prioritize features by estimated ROI and upsell potential
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-lg border border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Real World Example
            </h3>
            <p className="text-gray-300 mb-6">
              A code-writing AI agent's users frequently request design document templates.
              Agentrix identifies this pattern and suggests adding a document generator
              feature, leading to increased user satisfaction and reduced context switching.
            </p>
            <div className="flex justify-center">
              <Button to="/chat" variant="orange" className="flex items-center gap-2">
                Try Our Live Chat Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}