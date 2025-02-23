import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { DashboardFilters } from '../components/DashboardFilters';
import { WordCloud } from '../components/WordCloud';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Clock, DollarSign, Users, ArrowUpRight,
  ArrowDownRight, Activity, Filter, AlertTriangle
} from 'lucide-react';

const mockData = {
  kpis: [
    {
      title: 'Total Interactions',
      value: '34.35M',
      change: '+12.5%',
      positive: true,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Avg Session Duration',
      value: '4m 32s',
      change: '-8.3%',
      positive: false,
      icon: Clock,
      color: 'emerald'
    },
    {
      title: 'Revenue Impact',
      value: '$12,450',
      change: '+15.2%',
      positive: true,
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'Escalation Rate',
      value: '4.8%',
      change: '-2.1%',
      positive: true,
      icon: Users,
      color: 'blue'
    }
  ],
  intentDistribution: [
    { intent: 'Flight Booking', users: 34350000, color: '#9333EA' },
    { intent: 'Taxi Booking', users: 22370000, color: '#F97316' },
    { intent: 'Loyalty Points', users: 15840000, color: '#3B82F6' },
    { intent: 'Feature Request', users: 13260000, color: '#10B981' }
  ],
  sentimentData: [
    { time: '00:00', positive: 65, neutral: 25, negative: 10 },
    { time: '04:00', positive: 70, neutral: 20, negative: 10 },
    { time: '08:00', positive: 60, neutral: 30, negative: 10 },
    { time: '12:00', positive: 55, neutral: 30, negative: 15 },
    { time: '16:00', positive: 75, neutral: 15, negative: 10 },
    { time: '20:00', positive: 70, neutral: 20, negative: 10 }
  ],
  userBehavior: {
    retention: [
      { day: 1, users: 100 },
      { day: 7, users: 75 },
      { day: 14, users: 60 },
      { day: 30, users: 45 },
      { day: 60, users: 30 },
      { day: 90, users: 25 }
    ],
    sessionDuration: [
      { duration: '0-1m', users: 1200 },
      { duration: '1-3m', users: 2500 },
      { duration: '3-5m', users: 3100 },
      { duration: '5-10m', users: 2300 },
      { duration: '10m+', users: 1400 }
    ]
  },
  revenueData: {
    byIntent: [
      { intent: 'Flight Booking', actual: 25000, potential: 35000 },
      { intent: 'Taxi Booking', actual: 12000, potential: 28000 },
      { intent: 'Hotel Booking', actual: 18000, potential: 22000 },
      { intent: 'Car Rental', actual: 8000, potential: 15000 }
    ],
    trending: [
      { month: 'Jan', revenue: 42000 },
      { month: 'Feb', revenue: 48000 },
      { month: 'Mar', revenue: 55000 },
      { month: 'Apr', revenue: 62000 },
      { month: 'May', revenue: 70000 },
      { month: 'Jun', revenue: 82000 }
    ]
  },
  trendingKeywords: [
    { text: 'Flight Booking', value: 100, intent: 'travel', trend: 'up', color: '#9333EA' },
    { text: 'Hotel Bundle', value: 85, intent: 'travel', trend: 'up', color: '#F97316' },
    { text: 'Car Rental', value: 70, intent: 'travel', trend: 'stable', color: '#3B82F6' },
    { text: 'Restaurant', value: 65, intent: 'local', trend: 'up', color: '#10B981' },
    { text: 'Airport Transfer', value: 60, intent: 'travel', trend: 'down', color: '#EF4444' },
    { text: 'Flight Change', value: 55, intent: 'support', trend: 'up', color: '#8B5CF6' },
    { text: 'Baggage Policy', value: 50, intent: 'support', trend: 'stable', color: '#EC4899' },
    { text: 'Loyalty Points', value: 45, intent: 'rewards', trend: 'up', color: '#F59E0B' }
  ]
};

export function Analytics() {
  const [activeSection, setActiveSection] = useState('engagement');
  const [hoveredKeyword, setHoveredKeyword] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'behavior':
        return (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">User Behavior Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Session Duration Distribution */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Session Duration</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.userBehavior.sessionDuration}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="duration" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                      <Bar
                        dataKey="users"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Retention */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">User Retention</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.userBehavior.retention}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );

      case 'revenue':
        return (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">Revenue Impact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue by Intent */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue by Intent</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.revenueData.byIntent}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="intent" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                      <Bar
                        dataKey="actual"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                        name="Actual Revenue"
                      />
                      <Bar
                        dataKey="potential"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        name="Potential Revenue"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Trend */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.revenueData.trending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#F97316"
                        fill="#F97316"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );

      case 'intent':
        return (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">Intent Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Intent Distribution */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Intent Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockData.intentDistribution}
                        dataKey="users"
                        nameKey="intent"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {mockData.intentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Trending Keywords */}
              <WordCloud
                keywords={mockData.trendingKeywords}
                onKeywordHover={setHoveredKeyword}
              />
            </div>

            {/* Failed Intents */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-white">Failed Intents</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    intent: 'Hotel Bundle Booking',
                    count: 1250,
                    impact: '$25,000',
                    color: 'orange'
                  },
                  {
                    intent: 'Car Rental',
                    count: 850,
                    impact: '$12,000',
                    color: 'blue'
                  },
                  {
                    intent: 'Restaurant Reservation',
                    count: 620,
                    impact: '$8,000',
                    color: 'emerald'
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                  >
                    <h4 className="text-white font-medium mb-2">{item.intent}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Requests</span>
                      <span className={`text-${item.color}-400`}>{item.count}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Potential Revenue</span>
                      <span className={`text-${item.color}-400`}>{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockData.kpis.map((kpi, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-${kpi.color}-500/10 rounded-lg`}>
                      <kpi.icon className={`w-6 h-6 text-${kpi.color}-500`} />
                    </div>
                    <span className={`text-sm ${kpi.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {kpi.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-gray-400 text-sm mb-2">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Intent Distribution & Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Intent Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.intentDistribution} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis
                        dataKey="intent"
                        type="category"
                        stroke="#9CA3AF"
                        width={120}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                        formatter={(value: number) => [
                          `${(value / 1000000).toFixed(2)}M users`,
                          'Users'
                        ]}
                      />
                      <Bar
                        dataKey="users"
                        radius={[0, 8, 8, 0]}
                      >
                        {mockData.intentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Sentiment Analysis</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-white">Analytics Dashboard</h1>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Add Filter</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                Export
              </button>
            </div>
          </div>
          <DashboardFilters />
        </div>

        {/* Main Content */}
        <div className="p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}