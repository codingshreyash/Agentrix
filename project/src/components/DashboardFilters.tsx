import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  color: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => toggleOption(option.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selected.includes(option.id)
                ? `bg-${option.color}-500 text-white`
                : `bg-gray-700 text-gray-300 hover:bg-${option.color}-500/20`
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DashboardFilters() {
  const [selectedIntents, setSelectedIntents] = React.useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string[]>(['24h']);

  const intents: FilterOption[] = [
    { id: 'flight', label: 'Flight Booking', color: 'blue' },
    { id: 'taxi', label: 'Taxi Booking', color: 'green' },
    { id: 'hotel', label: 'Hotel Booking', color: 'orange' },
    { id: 'frustrated', label: 'Frustrated Users', color: 'red' },
  ];

  const users: FilterOption[] = [
    { id: 'new', label: 'New Users', color: 'emerald' },
    { id: 'returning', label: 'Returning', color: 'purple' },
    { id: 'premium', label: 'Premium', color: 'amber' },
  ];

  const periods: FilterOption[] = [
    { id: '24h', label: 'Last 24h', color: 'indigo' },
    { id: '7d', label: 'Last 7 Days', color: 'indigo' },
    { id: '30d', label: 'Last 30 Days', color: 'indigo' },
  ];

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FilterGroup
            title="Intent Type"
            options={intents}
            selected={selectedIntents}
            onChange={setSelectedIntents}
          />
          <FilterGroup
            title="User Demographics"
            options={users}
            selected={selectedUsers}
            onChange={setSelectedUsers}
          />
          <FilterGroup
            title="Time Period"
            options={periods}
            selected={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      </div>
    </div>
  );
}