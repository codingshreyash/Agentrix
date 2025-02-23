import React, { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Combobox } from './Combobox';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  group?: string;
}

interface FilterChip {
  id: string;
  label: string;
  type: 'user' | 'region' | 'device' | 'time';
}

const timeRangeOptions = [
  { id: '24h', label: 'Last 24 hours', value: '24h' },
  { id: '7d', label: 'Last 7 days', value: '7d' },
  { id: '30d', label: 'Last 30 days', value: '30d' },
  { id: '3m', label: 'Last 3 months', value: '3m' },
  { id: '6m', label: 'Last 6 months', value: '6m' },
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

const getFilterTypeFromGroup = (group: string | undefined): 'user' | 'region' | 'device' | 'time' => {
  switch (group) {
    case 'User Type':
      return 'user';
    case 'Region':
      return 'region';
    case 'Device Type':
      return 'device';
    default:
      return 'time';
  }
};

export function DashboardFilters() {
  const [selectedTime, setSelectedTime] = useState<FilterOption>(timeRangeOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<FilterChip[]>([]);
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const handleUserTypeSelect = (userType: string) => {
    setSelectedFilters(prev => {
      const exists = prev.some(filter => filter.label === userType && filter.type === 'user');
      if (exists) {
        return prev.filter(filter => !(filter.label === userType && filter.type === 'user'));
      }
      return [...prev, { id: Date.now().toString(), label: userType, type: 'user' }];
    });
  };

  const handleRegionSelect = (region: string) => {
    setSelectedFilters(prev => {
      const exists = prev.some(filter => filter.label === region && filter.type === 'region');
      if (exists) {
        return prev.filter(filter => !(filter.label === region && filter.type === 'region'));
      }
      return [...prev, { id: Date.now().toString(), label: region, type: 'region' }];
    });
  };

  const removeFilter = (id: string) => {
    setSelectedFilters(prev => prev.filter(filter => filter.id !== id));
  };

  const isSelected = (label: string, type: 'user' | 'region') => {
    return selectedFilters.some(filter => filter.label === label && filter.type === type);
  };

  const getFilterColors = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-emerald-100 text-emerald-700';
      case 'region':
        return 'bg-blue-100 text-blue-700';
      case 'device':
        return 'bg-orange-100 text-orange-700';
      case 'time':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="px-6 py-2 border-b border-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Time Range Section */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              onClick={() => setIsTimeOpen(!isTimeOpen)}
            >
              <span>{selectedTime.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isTimeOpen && (
              <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-500 font-medium">TIME RANGE</div>
                  {timeRangeOptions.map(timeRange => (
                    <button 
                      key={timeRange.id}
                      className={`w-full px-3 py-2 text-left rounded flex items-center justify-between ${
                        selectedTime.value === timeRange.value
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                      onClick={() => {
                        setSelectedTime(timeRange);
                        setIsTimeOpen(false);
                      }}
                    >
                      {timeRange.label}
                      {selectedTime.value === timeRange.value && (
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-gray-200 mx-2"></div>

          {/* Demographics Section */}
          <div className="flex items-center gap-2">
            {/* User Type Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => setIsUserTypeOpen(!isUserTypeOpen)}
              >
                <span>User Type</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isUserTypeOpen && (
                <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-500 font-medium">USER TYPE</div>
                    {['New Users', 'Returning Users', 'Premium Users'].map(userType => (
                      <button 
                        key={userType}
                        className={`w-full px-3 py-2 text-left rounded flex items-center justify-between ${
                          isSelected(userType, 'user')
                            ? 'bg-purple-50 text-purple-600'
                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                        }`}
                        onClick={() => handleUserTypeSelect(userType)}
                      >
                        {userType}
                        {isSelected(userType, 'user') && (
                          <div className="w-2 h-2 rounded-full bg-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Region Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => setIsRegionOpen(!isRegionOpen)}
              >
                <span>Region</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isRegionOpen && (
                <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-500 font-medium">REGION</div>
                    {['North America', 'Europe', 'Asia', 'Other'].map(region => (
                      <button 
                        key={region}
                        className={`w-full px-3 py-2 text-left rounded flex items-center justify-between ${
                          isSelected(region, 'region')
                            ? 'bg-purple-50 text-purple-600'
                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                        }`}
                        onClick={() => handleRegionSelect(region)}
                      >
                        {region}
                        {isSelected(region, 'region') && (
                          <div className="w-2 h-2 rounded-full bg-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(filter => (
              <div
                key={filter.id}
                className={`${getFilterColors(filter.type)} px-3 py-1 rounded-full text-sm flex items-center gap-2`}
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}