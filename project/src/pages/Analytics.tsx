import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { DashboardFilters } from '../components/DashboardFilters';
import { WordCloud } from '../components/WordCloud';
import { IntentTrends } from '../components/IntentTrends';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import {
  TrendingUp, Clock, DollarSign, Users, ArrowUpRight,
  ArrowDownRight, Activity, Filter, AlertTriangle,
  Heart, MessageSquare, AlertCircle
} from 'lucide-react';

interface LegendEntry {
  dataKey: keyof typeof visibleLines;
  value: string;
}

const mockData = {
  kpis: [
    {
      title: 'Daily Active Users',
      value: '1.35M',
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
      title: 'Human Escalation Rate',
      value: '4.8%',
      change: '-2.1%',
      positive: true,
      icon: Users,
      color: 'blue'
    }
  ],
  intentDistribution: [
    { intent: 'Book Flights', users: 800000, color: '#9333EA' },
    { intent: 'Schedule Waymo', users: 543000, color: '#F97316' },
    { intent: 'Call Uber', users: 104000, color: '#3B82F6' },
    { intent: 'Boom SuperSonic Flights', users: 23000, color: '#10B981' }
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
      { intent: 'Book Flights', actual: 25000, potential: 35000 },
      { intent: 'Schedule Waymo', actual: 12000, potential: 28000 },
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
    { text: 'Book Flights', value: 100, intent: 'travel', trend: 'up', color: '#9333EA' },
    { text: 'Hotel Bundle', value: 85, intent: 'travel', trend: 'up', color: '#F97316' },
    { text: 'Car Rental', value: 70, intent: 'travel', trend: 'stable', color: '#3B82F6' },
    { text: 'Restaurant', value: 65, intent: 'local', trend: 'up', color: '#10B981' },
    { text: 'Airport Transfer', value: 60, intent: 'travel', trend: 'down', color: '#EF4444' },
    { text: 'Flight Change', value: 55, intent: 'support', trend: 'up', color: '#8B5CF6' },
    { text: 'Baggage Policy', value: 50, intent: 'support', trend: 'stable', color: '#EC4899' },
    { text: 'Loyalty Points', value: 45, intent: 'rewards', trend: 'up', color: '#F59E0B' }
  ],
  satisfaction: {
    sentimentOverTime: [
      { date: '2024-01', positive: 75, neutral: 15, negative: 10 },
      { date: '2024-02', positive: 70, neutral: 20, negative: 10 },
      { date: '2024-03', positive: 65, neutral: 20, negative: 15 },
      { date: '2024-04', positive: 80, neutral: 15, negative: 5 },
      { date: '2024-05', positive: 85, neutral: 10, negative: 5 },
      { date: '2024-06', positive: 78, neutral: 12, negative: 10 }
    ],
    frustrationPoints: [
      { issue: 'Complex Booking Flow', count: 450, severity: 'high' },
      { issue: 'Payment Failures', count: 320, severity: 'high' },
      { issue: 'Unclear Pricing', count: 280, severity: 'medium' },
      { issue: 'Slow Response Time', count: 250, severity: 'medium' },
      { issue: 'Missing Features', count: 180, severity: 'low' }
    ],
    escalationsByIntent: [
      { intent: 'Flight Changes', rate: 25, total: 1200 },
      { intent: 'Refund Requests', rate: 35, total: 800 },
      { intent: 'Loyalty Points', rate: 15, total: 2000 },
      { intent: 'Booking Issues', rate: 30, total: 1500 },
      { intent: 'Price Match', rate: 20, total: 600 }
    ]
  },
  intentDistributionOverTime: [
    { date: '2024-01', 'Book Flights': 800000, 'Schedule Waymo': 543000, 'Call Uber': 104000, 'Boom SuperSonic Flights': 23000 },
    { date: '2024-02', 'Book Flights': 820000, 'Schedule Waymo': 553000, 'Call Uber': 114000, 'Boom SuperSonic Flights': 25000 },
    { date: '2024-03', 'Book Flights': 790000, 'Schedule Waymo': 563000, 'Call Uber': 124000, 'Boom SuperSonic Flights': 28000 },
    { date: '2024-04', 'Book Flights': 850000, 'Schedule Waymo': 573000, 'Call Uber': 134000, 'Boom SuperSonic Flights': 30000 },
    { date: '2024-05', 'Book Flights': 880000, 'Schedule Waymo': 583000, 'Call Uber': 144000, 'Boom SuperSonic Flights': 32000 },
    { date: '2024-06', 'Book Flights': 900000, 'Schedule Waymo': 593000, 'Call Uber': 154000, 'Boom SuperSonic Flights': 35000 },
  ],
};

export function Analytics() {
  const [activeSection, setActiveSection] = useState('engagement');
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    'Book Flights': true,
    'Schedule Waymo': true,
    'Call Uber': true,
    'Boom SuperSonic Flights': true
  });
  const [hoveredKeyword, setHoveredKeyword] = useState(null);
  // New state for per-line hover
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // Update the renderCustomDot function to use name instead of dataKey
  const renderCustomDot = (name: string) => (props: any) => {
    return (
      <circle 
        cx={props.cx} 
        cy={props.cy} 
        r={hoveredLine === name ? 6 : 4} 
        fill={props.stroke}
        onMouseEnter={() => setHoveredLine(name)}
        onMouseLeave={() => setHoveredLine(null)}
      />
    );
  };

  const handleLegendClick = (entry: any) => {
    setVisibleLines(prev => ({
      ...prev,
      [entry.dataKey]: !prev[entry.dataKey]
    }));
  };

  // Add these formatter functions near the top of the Analytics component
  const formatYAxis = (value: number) => {
    if (value === 0) return '0';
    return `${(value / 1000).toFixed(0)}k`;
  };

  const formatTooltip = (value: number) => {
    return value.toLocaleString();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'satisfaction':
        return (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Satisfaction Analysis</h2>
            
            {/* Satisfaction KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +5.2%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">Overall Satisfaction</h3>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-red-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +2.1%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">Escalation Rate</h3>
                <p className="text-2xl font-bold text-gray-900">12.5%</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-green-600 flex items-center">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    -15%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">Resolution Time</h3>
                <p className="text-2xl font-bold text-gray-900">2.5m</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-sm text-red-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +0.8%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">Churn Risk</h3>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
            </div>

            {/* Sentiment Over Time */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trends</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.satisfaction.sentimentOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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

              {/* Escalation Rates */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Escalation Rates by Intent</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockData.satisfaction.escalationsByIntent}
                      layout="vertical"
                    >
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
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
                        }}
                      />
                      <Bar
                        dataKey="rate"
                        fill="#8B5CF6"
                        radius={[0, 4, 4, 0]}
                        activeBar={{ fill: '#8B5CF6' }}
                        onMouseOver={(state) => {
                          return null;
                        }}
                      >
                        {mockData.satisfaction.escalationsByIntent.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill="#8B5CF6"
                            style={{
                              transition: 'all 0.2s ease',
                              transformOrigin: 'left',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              const target = e.target as SVGElement;
                              target.style.transform = 'scaleX(1.1)';
                              target.style.fill = '#8B5CF6';
                            }}
                            onMouseLeave={(e) => {
                              const target = e.target as SVGElement;
                              target.style.transform = 'scaleX(1)';
                              target.style.fill = '#8B5CF6';
                            }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Frustration Points */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Top Frustration Points</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockData.satisfaction.frustrationPoints.map((point, index) => (
                  <div
                    key={index}
                    className={`bg-gray-100 rounded-lg p-4 border ${
                      point.severity === 'high'
                        ? 'border-red-500/50'
                        : point.severity === 'medium'
                        ? 'border-orange-500/50'
                        : 'border-yellow-500/50'
                    }`}
                  >
                    <h4 className="text-gray-900 font-medium mb-2">{point.issue}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occurrences</span>
                      <span className={`${
                        point.severity === 'high'
                          ? 'text-red-400'
                          : point.severity === 'medium'
                          ? 'text-orange-400'
                          : 'text-yellow-400'
                      }`}>{point.count}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Severity</span>
                      <span className={`${
                        point.severity === 'high'
                          ? 'text-red-400'
                          : point.severity === 'medium'
                          ? 'text-orange-400'
                          : 'text-yellow-400'
                      }`}>{point.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'behavior':
        return (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Behavior Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Session Duration Distribution */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Duration</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.userBehavior.sessionDuration}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="duration" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Retention</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.userBehavior.retention}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Impact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue by Intent */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Intent</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.revenueData.byIntent}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="intent" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.revenueData.trending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Intent Analysis</h2>
            <div className="mb-8">
              {/* Intent Activity - now takes full width */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity</h2>
                <div className="flex">
                  <div className="flex-1 h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                        data={mockData.intentDistributionOverTime}
                        margin={{ left: 60, right: 30, top: 30, bottom: 30 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#9CA3AF"
                          label={{ 
                          value: 'Date', 
                          position: 'bottom',
                          offset: 10,
                          style: { fill: '#9CA3AF' }
                          }}
                        />
                        <YAxis 
                          stroke="#9CA3AF"
                          label={{ 
                          value: 'Number of Users', 
                          angle: -90, 
                          position: 'left',
                          offset: 20,
                          style: { fill: '#9CA3AF' },
                          dy: -20
                          }}
                          tickFormatter={formatYAxis}
                        />
                        <Tooltip
                          contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '0.5rem',
                          color: '#000000',
                          }}
                          formatter={(value: number, name: string) => [
                          `${value.toLocaleString()} users`,
                          name
                          ]}
                          itemSorter={(item) => (item.name === hoveredLine ? 1 : -1)}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{
                          paddingLeft: '32px',
                          }}
                          onClick={handleLegendClick}
                          formatter={(value: string) => {
                          const active = visibleLines[value];
                          return (
                            <span style={{ 
                            color: active ? '#1F2937' : '#9CA3AF',
                            cursor: 'pointer'
                            }}>
                            {value}
                            </span>
                          );
                          }}
                        />
                        <Line
                          type="monotoneX"
                          dataKey="Book Flights"
                          name="Book Flights"
                          stroke="#9333EA"
                          strokeWidth={2}
                          dot={renderCustomDot('Book Flights')}
                          hide={!visibleLines['Book Flights']}
                          connectNulls={true}
                        />
                        <Line
                          type="monotoneX"
                          dataKey="Schedule Waymo"
                          name="Schedule Waymo"
                          stroke="#F97316"
                          strokeWidth={2}
                          dot={renderCustomDot('Schedule Waymo')}
                          hide={!visibleLines['Schedule Waymo']}
                          connectNulls={true} 
                        />
                        <Line
                          type="monotoneX"
                          dataKey="Call Uber"
                          name="Call Uber"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={renderCustomDot('Call Uber')}
                          hide={!visibleLines['Call Uber']}
                          connectNulls={true}
                        />
                        <Line
                          type="monotoneX"
                          dataKey="Boom SuperSonic Flights"
                          name="Boom SuperSonic Flights"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={renderCustomDot('Boom SuperSonic Flights')}
                          hide={!visibleLines['Boom SuperSonic Flights']}
                          connectNulls={true}
                        />
                        </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Intent Trends */}
            <div className="mb-8">
              <IntentTrends showGrowth={true} />
            </div>

            {/* Missed Opportunities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Missed Opportunities</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="bg-gray-100 rounded-lg p-6 border border-gray-200"
                  >
                    <h4 className="text-gray-900 font-medium mb-3">{item.intent}</h4>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Requests</span>
                      <span className={`text-${item.color}-400`}>{item.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Potential Revenue</span>
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
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-${kpi.color}-100 rounded-lg`}>
                      <kpi.icon className={`w-6 h-6 text-${kpi.color}-600`} />
                    </div>
                    <span className={`text-sm ${kpi.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      {kpi.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-2">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Intent Activity & Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Intent Counts</h2>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={mockData.intentDistributionOverTime}
                      margin={{ left: 60, right: 30, top: 30, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        label={{ 
                          value: 'Date', 
                          position: 'bottom',
                          offset: 10,
                          style: { fill: '#9CA3AF' }
                        }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        label={{ 
                          value: 'Number of Users', 
                          angle: -90, 
                          position: 'left',
                          offset: 20,
                          style: { fill: '#9CA3AF' },
                          dy: -20
                        }}
                        tickFormatter={formatYAxis}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '0.5rem',
                          color: '#000000',
                        }}
                        formatter={(value: number, name: string) => [
                          `${value.toLocaleString()} users`,
                          name
                        ]}
                        itemSorter={(item) => (item.name === hoveredLine ? 1 : -1)}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                          paddingTop: '20px',
                        }}
                      />
                      <Line
                        type="monotoneX"
                        dataKey="Book Flights"
                        name="Book Flights"
                        stroke="#9333EA"
                        strokeWidth={2}
                        dot={renderCustomDot('Book Flights')}
                        hide={!visibleLines['Book Flights']}
                        connectNulls={true}
                      />
                      <Line
                        type="monotoneX"
                        dataKey="Schedule Waymo"
                        name="Schedule Waymo"
                        stroke="#F97316"
                        strokeWidth={2}
                        dot={renderCustomDot('Schedule Waymo')}
                        hide={!visibleLines['Schedule Waymo']}
                        connectNulls={true}
                      />
                      <Line
                        type="monotoneX"
                        dataKey="Call Uber"
                        name="Loyalty Points"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={renderCustomDot('Call Uber')}
                        hide={!visibleLines['Call Uber']}
                        connectNulls={true}
                      />
                      <Line
                        type="monotoneX"
                        dataKey="Boom SuperSonic Flights"
                        name="Boom SuperSonic Flights"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={renderCustomDot('Boom SuperSonic Flights')}
                        hide={!visibleLines['Boom SuperSonic Flights']}
                        connectNulls={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Sentiment Analysis</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF', // changed from '#1F2937'
                          border: '1px solid #D1D5DB', // added light gray border
                          borderRadius: '0.5rem',
                          color: '#000000', // changed from '#F3F4F6'
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
    <div className="flex h-screen bg-white">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Add Filter</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
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