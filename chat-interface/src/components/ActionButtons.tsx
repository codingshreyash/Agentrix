interface ActionButton {
  icon: string;
  label: string;
  onClick: () => void;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
}

export const ActionButtons = ({ buttons }: ActionButtonsProps) => {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <span className="text-xl">{button.icon}</span>
          <span className="text-lg">{button.label}</span>
        </button>
      ))}
    </div>
  );
};
