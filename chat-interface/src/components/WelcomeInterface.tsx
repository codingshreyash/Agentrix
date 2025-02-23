import Image from 'next/image';
import { Header } from './Header';
import { ChatInput } from './ChatInput';
import { ActionButtons } from './ActionButtons';

interface WelcomeInterfaceProps {
  userName: string;
  onSendMessage: (message: string) => void;
  actionButtons: Array<{
    icon: string;
    label: string;
    onClick: () => void;
  }>;
}

export const WelcomeInterface = ({ userName, onSendMessage, actionButtons }: WelcomeInterfaceProps) => {
  return (
    <div className="w-full max-w-5xl p-12 space-y-12">
      <div className="flex justify-center">
        <Image
          src="/expedia_logo.png"
          alt="Expedia Logo"
          width={200}
          height={60}
          priority
        />
      </div>

      <Header userName={userName} />
      
      <div className="w-full space-y-6">
        <ChatInput onSubmit={onSendMessage} />
        <ActionButtons buttons={actionButtons} />
      </div>
    </div>
  );
};
