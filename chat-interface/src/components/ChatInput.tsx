interface ChatInputProps {
  onSubmit: (value: string) => void;
}

export const ChatInput = ({ onSubmit }: ChatInputProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Where do you want to go?"
        className="w-full p-6 rounded-2xl border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200 text-lg transition-all shadow-sm"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = '';
          }
        }}
      />
    </div>
  );
};
