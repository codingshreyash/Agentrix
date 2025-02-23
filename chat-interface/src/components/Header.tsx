import Image from 'next/image';

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-semibold">Good morning, {userName}.</h1>
      <h2 className="text-gray-500 text-xl">How can I help you today?</h2>
    </div>
  );
};
