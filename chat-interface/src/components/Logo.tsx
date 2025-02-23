import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="absolute top-4 left-4">
      <Image
        src="/expedia_logo.png"
        alt="Expedia Logo"
        width={120}
        height={40}
        className="object-contain"
      />
    </div>
  );
};
