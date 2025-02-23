import React from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Combobox } from './Combobox';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  group?: string;
}

const timeRanges: FilterOption[] = [
  { id: '24h', label: 'Last 24 hours', value: '24h' },
  { id: '7d', label: 'Last 7 days', value: '7d' },
  { id: '30d', label: 'Last 30 days', value: '30d' },
  { id: 'custom', label: 'Custom range', value: 'custom' }
];

const demographics: FilterOption[] = [
  { id: 'new', label: 'New Users', value: 'new', group: 'User Type' },
  { id: 'returning', label: 'Returning Users', value: 'returning', group: 'User Type' },
  { id: 'premium', label: 'Premium Users', value: 'premium', group: 'User Type' },
  { id: 'na', label: 'North America', value: 'na', group: 'Region' },
  { id: 'eu', label: 'Europe', value: 'eu', group: 'Region' },
  { id: 'asia', label: 'Asia', value: 'asia', group: 'Region' }
];

export function DashboardFilters() {
  const [selectedTime, setSelectedTime] = React.useState<FilterOption>(timeRanges[0]);
  const [selectedDemographics, setSelectedDemographics] = React.useState<FilterOption[]>([]);
  const [customDateRange, setCustomDateRange] = React.useState({ start: '', end: '' });

  return (
    <div className="bg-white dark:bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Time Range Dropdown */}
          <div className="relative">
            <Combobox
              value={selectedTime}
              onChange={setSelectedTime}
              options={timeRanges}
              displayValue={(option) => option.label}
              placeholder="Select time range"
              className="min-w-[200px]"
            />
          </div>

          {/* Custom Date Range (shows only when custom is selected) */}
          {selectedTime.id === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customDateRange.start}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="bg-white text-gray-900 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-gray-600">to</span>
              <input
                type="date"
                value={customDateRange.end}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="bg-white text-gray-900 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Demographics Multi-select */}
          <div className="relative flex-1">
            <Combobox
              value={selectedDemographics}
              onChange={setSelectedDemographics}
              options={demographics}
              displayValue={(options) => 
                options.length === 0 
                  ? 'Select demographics' 
                  : `${options.length} selected`
              }
              multiple
              placeholder="Select demographics"
              className="min-w-[250px]"
            />
          </div>

          {/* Selected Filters Display */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedDemographics.map((demo) => (
              <span
                key={demo.id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-sm"
              >
                {demo.label}
                <button
                  onClick={() => setSelectedDemographics(prev => prev.filter(d => d.id !== demo.id))}
                  className="hover:text-purple-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}