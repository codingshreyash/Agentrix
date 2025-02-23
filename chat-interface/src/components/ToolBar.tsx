interface Tool {
  icon: string;
  label: string;
  onClick: () => void;
}

interface ToolBarProps {
  tools: Tool[];
}

export const ToolBar = ({ tools }: ToolBarProps) => {
  return (
    <div className="flex gap-8 flex-wrap justify-center pt-8">
      {tools.map((tool, index) => (
        <button
          key={index}
          onClick={tool.onClick}
          className="flex items-center gap-3 hover:text-gray-600 transition-colors group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">{tool.icon}</span>
          <span className="text-lg">{tool.label}</span>
        </button>
      ))}
    </div>
  );
};
