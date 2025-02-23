import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendData {
  intent: string;
  growth: number;
  volume: number;
  color: string;
}

const mockTrendData: TrendData[] = [
  { intent: 'Blade Helicopter', growth: 135, volume: 2500, color: '#10B981' },
  { intent: 'Luxury Car Rental', growth: 85, volume: 5000, color: '#10B981' },
  { intent: 'Private Jet', growth: 45, volume: 1200, color: '#10B981' },
  { intent: 'Regular Taxi', growth: -5, volume: 15000, color: '#EF4444' },
  { intent: 'Bus Booking', growth: -20, volume: 8000, color: '#EF4444' },
  { intent: 'Train Tickets', growth: -35, volume: 6000, color: '#EF4444' },
];

interface IntentTrendsProps {
  showGrowth?: boolean;
}

export function IntentTrends({ showGrowth = true }: IntentTrendsProps) {
  const [metric, setMetric] = React.useState<'growth' | 'volume'>('growth');
  
  const sortedData = [...mockTrendData].sort((a, b) => 
    metric === 'growth' ? b.growth - a.growth : b.volume - a.volume
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Intent Trends</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMetric('growth')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${metric === 'growth'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            Growth Rate
          </button>
          <button
            onClick={() => setMetric('volume')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${metric === 'volume'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            Volume
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6',
              }}
              formatter={(value: number) => [
                metric === 'growth' ? `${value}%` : value.toLocaleString(),
                metric === 'growth' ? 'Growth Rate' : 'Volume'
              ]}
            />
            <Bar
              dataKey={metric}
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={metric === 'growth'
                    ? entry.growth > 0 ? '#10B981' : '#EF4444'
                    : '#6366F1'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Fastest Growing</span>
          </div>
          <div className="space-y-2">
            {sortedData.slice(0, 3).map(item => (
              <div key={item.intent} className="flex justify-between items-center">
                <span className="text-gray-300">{item.intent}</span>
                <span className="text-emerald-400">+{item.growth}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">Declining</span>
          </div>
          <div className="space-y-2">
            {sortedData.slice(-3).reverse().map(item => (
              <div key={item.intent} className="flex justify-between items-center">
                <span className="text-gray-300">{item.intent}</span>
                <span className="text-red-400">{item.growth}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}