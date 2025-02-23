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
          ? 'bg-purple-500/20 text-purple-400' 
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export function Sidebar() {
  const [activeSection, setActiveSection] = React.useState('engagement');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm
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
          onClick={() => setActiveSection('pinned')}
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
          onClick={() => setActiveSection('engagement')}
        />

        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          label="User Behavior"
          active={activeSection === 'behavior'}
          onClick={() => setActiveSection('behavior')}
        />

        <SidebarItem
          icon={<BarChart2 className="w-5 h-5" />}
          label="Intent Analysis"
          active={activeSection === 'intent'}
          onClick={() => setActiveSection('intent')}
        />

        <SidebarItem
          icon={<DollarSign className="w-5 h-5" />}
          label="Revenue Impact"
          active={activeSection === 'revenue'}
          onClick={() => setActiveSection('revenue')}
        />

        <SidebarItem
          icon={<Heart className="w-5 h-5" />}
          label="User Satisfaction"
          active={activeSection === 'satisfaction'}
          onClick={() => setActiveSection('satisfaction')}
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
          onClick={() => setActiveSection('settings')}
        />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-400">JD</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-200">John Doe</div>
            <div className="text-xs text-gray-400">Product Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}