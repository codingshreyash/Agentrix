import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { intentCategories } from '../data/mockData';

// Add type for intent categories at the top of the file
type IntentCategory = 'supported' | 'unsupported';
type IntentCategoriesType = {
  [key in keyof typeof intentCategories]: IntentCategory;
};

// Update the TrendData interface to be more specific about intent types
interface TrendData {
  intent: keyof IntentCategoriesType;
  growth: number;
  volume: number;
  color: string;
}

// Map of intent colors from mockData
const intentColors: { [key: string]: string } = {
  'Book Flights': '#9333EA',
  'Schedule Waymo': '#F97316',
  'Call Uber': '#3B82F6',
  'Boom SuperSonic Flights': '#10B981',
  'Cruise Bookings': '#EF4444',
  'Rental Cars': '#6366F1'
};

// Calculate growth rates from first to last data point in intentDistributionOverTime
const calculateTrendData = (timeSeriesData: any[]): TrendData[] => {
  const firstDataPoint = timeSeriesData[0];
  const lastDataPoint = timeSeriesData[timeSeriesData.length - 1];
  
  return Object.keys(firstDataPoint)
    .filter(key => key !== 'date')
    .map(intent => {
      const initialValue = firstDataPoint[intent];
      const finalValue = lastDataPoint[intent];
      const growth = Math.round(Math.sign(finalValue - initialValue) * Math.log1p(Math.abs((finalValue - initialValue) / initialValue) * 100)) * 10;
      
      return {
        intent: intent as keyof IntentCategoriesType,
        growth,
        volume: finalValue,
        color: intentColors[intent] || '#6B7280'
      };
    });
};

interface IntentTrendsProps {
  data: any[];
}

export function IntentTrends({ data }: IntentTrendsProps) {
  const [metric, setMetric] = React.useState<'growth' | 'volume'>('growth');
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);
  
  const trendData = React.useMemo(() => calculateTrendData(data), [data]);
  
  const sortedData = [...trendData].sort((a, b) => 
    metric === 'growth' ? b.growth - a.growth : b.volume - a.volume
  );

  return (
    <div className="rounded-xl p-6 bg-white border border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Trends</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMetric('growth')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${metric === 'growth'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Growth Rate
          </button>
          <button
            onClick={() => setMetric('volume')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${metric === 'volume'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Volume
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">Analyze the growth and popularity of different user intents to identify emerging patterns and user preferences</p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis
              type="number"
              stroke="#9CA3AF"
              domain={metric === 'growth' ? [-100, 150] : [0, 'auto']}
            />
            <YAxis
              dataKey="intent"
              type="category"
              stroke="#9CA3AF"
              width={120}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }} // prevents white hover background
              contentStyle={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #D1D5DB', // added light gray border
                borderRadius: '0.5rem' // rounded corners
              }}
              formatter={(value: number) => [
                metric === 'growth' ? `${value}%` : value.toLocaleString(),
                metric === 'growth' ? 'Growth Rate' : 'Volume'
              ]}
            />
            <Bar
              dataKey={metric}
              radius={[0, 4, 4, 0]}
              activeBar={false} // Disable bar highlighting
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={metric === 'growth'
                    ? entry.growth > 0 ? '#10B981' : '#EF4444'
                    : '#6366F1'
                  }
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{
                    transition: 'transform 0.2s',
                    transform: hoveredBar === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Growing</span>
          </div>
          <div className="space-y-2">
            {sortedData.filter(item => item.growth > 0).slice(0, 4).map(item => (
              <div key={item.intent} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{item.intent}</span>
                  {intentCategories[item.intent] === 'unsupported' && (
                    <div className="relative group">
                      <AlertTriangle className="w-4 h-4 text-red-500 cursor-help" />
                      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg py-1 px-2 -right-4 -top-8 whitespace-nowrap">
                        Your don't support this feature
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-emerald-400">+{item.growth}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">Declining</span>
          </div>
          <div className="space-y-2">
            {sortedData.filter(item => item.growth < 0).map(item => (
              <div key={item.intent} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{item.intent}</span>
                  {intentCategories[item.intent] === 'unsupported' && (
                    <div className="relative group">
                      <AlertTriangle className="w-4 h-4 text-red-500 cursor-help" />
                      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg py-1 px-2 -right-4 -top-8 whitespace-nowrap">
                        Your agent does not support this feature
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-red-400">{item.growth}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}