import React from 'react';
import {
  PinIcon,
  Users,
  Activity,
  DollarSign,
  BarChart2,
  Heart,
  Settings,
  Search,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${active 
          ? 'bg-purple-100 text-gray-900' 
          : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 pl-10 pr-4 py-2 rounded-lg text-sm
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <SidebarItem
          icon={<PinIcon className="w-5 h-5" />}
          label="Pinned Reports"
          active={activeSection === 'pinned'}
          onClick={() => onSectionChange('pinned')}
        />
        
        <div className="pt-4 pb-2">
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Analytics
          </div>
        </div>

        <SidebarItem
          icon={<Activity className="w-5 h-5" />}
          label="Engagement & Retention"
          active={activeSection === 'engagement'}
          onClick={() => onSectionChange('engagement')}
        />

        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          label="User Behavior"
          active={activeSection === 'behavior'}
          onClick={() => onSectionChange('behavior')}
        />

        <SidebarItem
          icon={<BarChart2 className="w-5 h-5" />}
          label="Intent Analysis"
          active={activeSection === 'intent'}
          onClick={() => onSectionChange('intent')}
        />

        <SidebarItem
          icon={<DollarSign className="w-5 h-5" />}
          label="Revenue Impact"
          active={activeSection === 'revenue'}
          onClick={() => onSectionChange('revenue')}
        />

        <SidebarItem
          icon={<Heart className="w-5 h-5" />}
          label="User Satisfaction"
          active={activeSection === 'satisfaction'}
          onClick={() => onSectionChange('satisfaction')}
        />

        <div className="pt-4 pb-2">
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Settings
          </div>
        </div>

        <SidebarItem
          icon={<Settings className="w-5 h-5" />}
          label="Preferences"
          active={activeSection === 'settings'}
          onClick={() => onSectionChange('settings')}
        />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-900">PG</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Paul Graham</div>
            <div className="text-xs text-gray-700">Product Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}