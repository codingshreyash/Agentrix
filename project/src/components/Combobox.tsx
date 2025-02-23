import React, { Fragment } from 'react';
import { Combobox as HeadlessCombobox } from '@headlessui/react';
import { Check, ChevronDown, Search } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  value: string;
  group?: string;
}

interface ComboboxProps {
  value: Option | Option[];
  onChange: (value: any) => void;
  options: Option[];
  displayValue: (option: any) => string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  displayValue,
  placeholder,
  className = '',
  multiple = false
}: ComboboxProps) {
  const [query, setQuery] = React.useState('');

  const filteredOptions = query === ''
    ? options
    : options.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  // Group options if any have a group property
  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const group = option.group || 'Other';
    return {
      ...groups,
      [group]: [...(groups[group] || []), option]
    };
  }, {} as Record<string, Option[]>);

  const hasGroups = Object.keys(groupedOptions).length > 1;

  return (
    <HeadlessCombobox
      value={value}
      onChange={onChange}
      multiple={multiple}
      as="div"
      className={`relative ${className}`}
    >
      <div className="relative">
        <HeadlessCombobox.Input
          className="w-full bg-white text-gray-700 pl-10 pr-10 py-2 rounded-lg text-sm
            placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={displayValue}
          placeholder={placeholder}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <HeadlessCombobox.Button className="absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </HeadlessCombobox.Button>
      </div>

      <HeadlessCombobox.Options
        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1
          shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-300 focus:outline-none"
      >
        {hasGroups ? (
          Object.entries(groupedOptions).map(([group, options]) => (
            <div key={group}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                {group}
              </div>
              {options.map((option) => (
                <ComboboxOption key={option.id} option={option} />
              ))}
            </div>
          ))
        ) : (
          filteredOptions.map((option) => (
            <ComboboxOption key={option.id} option={option} />
          ))
        )}

        {filteredOptions.length === 0 && query !== '' && (
          <div className="px-4 py-2 text-sm text-gray-400">
            No results found
          </div>
        )}
      </HeadlessCombobox.Options>
    </HeadlessCombobox>
  );
}

function ComboboxOption({ option }: { option: Option }) {
  return (
    <HeadlessCombobox.Option
      value={option}
      as={Fragment}
    >
      {({ active, selected }) => (
        <li
          className={`relative cursor-pointer select-none py-2 pl-10 pr-4 text-sm ${
            active ? 'bg-purple-100 text-purple-500' : 'text-gray-700'
          }`}
        >
          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
            {option.label}
          </span>
          {selected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-500">
              <Check className="h-4 w-4" />
            </span>
          )}
        </li>
      )}
    </HeadlessCombobox.Option>
  );
}