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
  Heart, MessageSquare, AlertCircle, Sun
} from 'lucide-react';
import { mockData, intentCategories } from '../data/mockData';

// Update the CustomTooltip component at the top of the file
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 shadow-lg border border-gray-200 rounded-lg">
      <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.stroke || entry.color }}
            />
            <span className="text-sm text-gray-500">{entry.name}</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// Add type for intent keys
type IntentKey = keyof typeof intentCategories;

const calculateNormalizedGrowth = (intent: IntentKey): string => {
  const data = mockData.intentDistributionOverTime;
  if (!data || data.length < 2) return '+0.0%';
  
  const initialValue = data[0][intent];
  const finalValue = data[data.length - 1][intent];
  
  if (initialValue === 0) return '+0.0%';
  
  // Using logarithmic normalization formula
  const normalizedGrowth = Math.round(
    Math.sign(finalValue - initialValue) * 
    Math.log1p(Math.abs((finalValue - initialValue) / initialValue) * 100)
  ) * 10;
  
  return `${normalizedGrowth >= 0 ? '+' : ''}${normalizedGrowth.toFixed(1)}%`;
};

// Add this function to filter and sort opportunities
const getGrowingUnsupportedIntents = () => {
  const intents = Object.keys(intentCategories) as IntentKey[];
  
  return intents
    .filter(intent => {
      // Only include unsupported intents
      if (intentCategories[intent] !== 'unsupported') return false;
      
      // Calculate growth to check if it's growing
      const data = mockData.intentDistributionOverTime;
      const initialValue = data[0][intent];
      const finalValue = data[data.length - 1][intent];
      return finalValue > initialValue;
    })
    .map(intent => ({
      intent,
      count: mockData.intentDistributionOverTime[mockData.intentDistributionOverTime.length - 1][intent],
      color: intent === 'Schedule Waymo' ? 'orange' : 'emerald' // Maintain existing colors
    }))
    .sort((a, b) => {
      // Sort by normalized growth rate in descending order
      const growthA = Number(calculateNormalizedGrowth(a.intent).replace(/[^-\d.]/g, ''));
      const growthB = Number(calculateNormalizedGrowth(b.intent).replace(/[^-\d.]/g, ''));
      return growthB - growthA;
    });
};

export function Analytics() {
  const [activeSection, setActiveSection] = useState('intent');
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    'Book Flights': true,
    'Schedule Waymo': true,
    'Call Uber': true,
    'Boom SuperSonic Flights': true,
    'Cruise Bookings': true,
    'Rental Cars': true
  });
  const [hoveredKeyword, setHoveredKeyword] = useState(null);
  // New state for per-line hover
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [addedToRoadmap, setAddedToRoadmap] = useState<Record<string, boolean>>({});

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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Sentiment Trends</h2>
                <p className="text-sm text-gray-500 mb-6">Track changes in user sentiment over time to identify patterns and areas for improvement</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.satisfaction.sentimentOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          
                          return (
                            <div className="bg-white p-3 shadow-lg border border-gray-200 rounded-lg">
                              <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
                              {payload.map((entry: any, index: number) => (
                                <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-3 h-3 rounded-full" 
                                      style={{ backgroundColor: entry.stroke || entry.color }}
                                    />
                                    <span className="text-sm text-gray-500">{entry.name}</span>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {entry.value.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                        cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        name="Positive"
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        name="Neutral"
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                        name="Negative"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Escalation Rates */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Escalation Rates by Intent</h2>
                <p className="text-sm text-gray-500 mb-6">Monitor which intents lead to human escalation to identify areas needing optimization</p>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Session Duration</h2>
                <p className="text-sm text-gray-500 mb-6">Analyze how long users spend interacting with the system in different time intervals</p>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">User Retention</h2>
                <p className="text-sm text-gray-500 mb-6">Track how many users continue to engage with the system over different time periods</p>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Revenue by Intent</h2>
                <p className="text-sm text-gray-500 mb-6">Compare actual vs potential revenue generation across different user intents</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.revenueData.byIntent}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="intent" 
                        stroke="#000000"
                        label={{ 
                          value: 'Intent Categories', 
                          position: 'bottom',
                          offset: 15,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
                      <YAxis 
                        stroke="#000000"
                        label={{ 
                          value: 'Revenue ($)', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: -5,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Revenue Trend</h2>
                <p className="text-sm text-gray-500 mb-6">Monitor revenue growth and patterns over time to identify business opportunities</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.revenueData.trending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#000000"
                        label={{ 
                          value: 'Month', 
                          position: 'bottom',
                          offset: 15,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
                      <YAxis 
                        stroke="#000000"
                        label={{ 
                          value: 'Revenue ($)', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: -5,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Activity</h2>
                <p className="text-sm text-gray-500 mb-6">Track the volume and distribution of different user intents across time periods</p>
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
                          stroke="#000000"
                          label={{ 
                            value: 'Date', 
                            position: 'bottom',
                            offset: 15,
                            style: { fill: '#000000', fontWeight: 500 }
                          }}
                        />
                        <YAxis 
                          stroke="#000000"
                          label={{ 
                            value: 'Number of Users', 
                            angle: -90, 
                            position: 'insideLeft',
                            offset: -5,
                            style: { fill: '#000000', fontWeight: 500 }
                          }}
                          tickFormatter={formatYAxis}
                        />
                        <Tooltip 
                          content={<CustomTooltip />}
                          cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{
                            paddingLeft: '32px',
                          }}
                          onClick={handleLegendClick}
                          content={(props) => {
                            const { payload } = props;
                            if (!payload) return null;

                            return (
                              <div className="flex flex-col gap-2">
                                {payload.map((entry: any, index: number) => {
                                  const isUnsupported = intentCategories[entry.value as keyof typeof intentCategories] === 'unsupported';
                                  const active = visibleLines[entry.value];
                                  
                                  return (
                                    <div 
                                      key={`legend-${index}`} 
                                      className={`flex items-center gap-2 cursor-pointer ${active ? 'text-gray-900' : 'text-gray-400'}`}
                                      onClick={() => handleLegendClick(entry)}
                                    >
                                      <div 
                                        className={`w-2 h-2 rounded-full`}
                                        style={{ backgroundColor: active ? entry.color : '#9CA3AF' }}
                                      />
                                      <span>{entry.value}</span>
                                      {isUnsupported && (
                                        <div className="relative group">
                                          <AlertTriangle className="w-4 h-4 text-red-500 cursor-help" />
                                          <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg py-1 px-2 -right-4 -top-8 whitespace-nowrap">
                                            Your agent does not support this feature
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
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
                        <Line
                          type="monotoneX"
                          dataKey="Cruise Bookings"
                          name="Cruise Bookings"
                          stroke="#EF4444"
                          strokeWidth={2}
                          dot={renderCustomDot('Cruise Bookings')}
                          hide={!visibleLines['Cruise Bookings']}
                          connectNulls={true}
                        />
                        <Line
                          type="monotoneX"
                          dataKey="Rental Cars"
                          name="Rental Cars"
                          stroke="#6366F1"
                          strokeWidth={2}
                          dot={renderCustomDot('Rental Cars')}
                          hide={!visibleLines['Rental Cars']}
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
              <IntentTrends data={mockData.intentDistributionOverTime} />
            </div>

            {/* Opportunities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Opportunities</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Growing unsupported intents that could be prioritized for implementation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGrowingUnsupportedIntents().map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-6 border border-gray-200 relative"
                  >
                    <div className="absolute top-3 right-3">
                      <button 
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors shadow-sm ${
                          addedToRoadmap[item.intent]
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                        onClick={() => {
                          setAddedToRoadmap(prev => ({
                            ...prev,
                            [item.intent]: !prev[item.intent]
                          }));
                        }}
                      >
                        {addedToRoadmap[item.intent] ? 'Remove from Roadmap' : 'Add to Roadmap'}
                      </button>
                    </div>
                    <h4 className="text-gray-900 font-medium mb-3 pr-24">{item.intent}</h4>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Request Volume</span>
                      <span className={`text-${item.color}-400`}>{item.count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Normalized Growth</span>
                      <span className={`text-${item.color}-400`}>{calculateNormalizedGrowth(item.intent)}</span>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Intent Counts</h2>
                <p className="text-sm text-gray-500 mb-6">Track the daily volume of user intents over time to identify usage patterns and trends</p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={mockData.intentDistributionOverTime}
                      margin={{ left: 60, right: 30, top: 30, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#000000"
                        label={{ 
                          value: 'Date', 
                          position: 'bottom',
                          offset: 15,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
                      <YAxis 
                        stroke="#000000"
                        label={{ 
                          value: 'Number of Users', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: -5,
                          style: { fill: '#000000', fontWeight: 500 }
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
                        formatter={(value: number) => [
                          value.toLocaleString(),
                          null
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Sentiment Analysis</h2>
                <p className="text-sm text-gray-500 mb-6">Monitor user sentiment distribution across positive, neutral, and negative interactions</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#000000"
                        label={{ 
                          value: 'Time Period', 
                          position: 'bottom',
                          offset: 15,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
                      <YAxis 
                        stroke="#000000"
                        label={{ 
                          value: 'User Count', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: -5,
                          style: { fill: '#000000', fontWeight: 500 }
                        }}
                      />
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
              <button 
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="w-4 h-4" />
              </button>
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