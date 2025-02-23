import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { analyticsStore } from '../store/analytics';

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(analyticsStore.getState());

  useEffect(() => {
    return analyticsStore.subscribe(() => {
      setAnalyticsData(analyticsStore.getState());
    });
  }, []);

  const hourlyData = Object.entries(analyticsData.messagesByHour)
    .map(([hour, count]) => ({
      hour: new Date(hour).toLocaleTimeString([], { hour: '2-digit' }),
      messages: count,
    }))
    .sort((a, b) => a.hour.localeCompare(b.hour));

  const sortedIntents = Object.entries(analyticsData.intents)
    .sort(([, a], [, b]) => b - a)
    .map(([intent, count]) => ({
      intent: intent.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      count,
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Usage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Message Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">User Messages</p>
              <p className="text-2xl font-bold">{analyticsData.totalUserMessages}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">AI Responses</p>
              <p className="text-2xl font-bold">{analyticsData.totalAIResponses}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Top Intents</h2>
          <div className="space-y-3">
            {sortedIntents.slice(0, 5).map(({ intent, count }) => (
              <div key={intent} className="flex items-center justify-between">
                <span className="text-gray-300">{intent}</span>
                <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-sm">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Over Time Chart */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Messages Over Time</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="hour"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Bar dataKey="messages" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Interactions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400">Time</th>
                <th className="pb-3 text-gray-400">Message</th>
                <th className="pb-3 text-gray-400">Intent</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.events.map((event, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 text-gray-300">
                    {event.timestamp.toLocaleTimeString()}
                  </td>
                  <td className="py-3 text-gray-300">{event.userMessage}</td>
                  <td className="py-3">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
                      {event.recognizedIntent.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}