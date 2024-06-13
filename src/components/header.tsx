import { Logo } from '@/components/logo';

export const Header = () => {
  return <header className="container mx-auto flex-wrap md:flex justify-center md:justify-start items-center my-6 text-center md:text-left">
    <div className="px-6 text-darkblue-400">
      <Logo />
    </div>
    <div className="flex-col">
      <h1 className="font-oswald font-extrabold uppercase text-4xl">
        Simon Karman
      </h1>
      <p className="text-gray-700 uppercase tracking-wide">
        Cloud Consultant and Game Developer
      </p>
    </div>
  </header>;
};
