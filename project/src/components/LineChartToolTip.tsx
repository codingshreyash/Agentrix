import React from 'react';
import { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<any, any> {
  hoveredLine: string | null;
  active: boolean;
  payload?: any[];
  label?: string | number;
}

export function CustomTooltip({ active, payload, label, hoveredLine }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    // If a line is hovered, filter payload to only that line.
    const displayPayload = hoveredLine
      ? payload.filter((item) => item.name === hoveredLine)
      : payload;

    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-200 rounded shadow">
        <p className="label">{`Date: ${label}`}</p>
        {displayPayload.map((item, index) => (
          <p key={index} style={{ color: item.stroke }}>
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
}