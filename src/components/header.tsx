import { Logo } from '@/components/logo';
import Link from 'next/link';

export const Header = () => {
  return <Link href="/">
    <header
      className="container mx-auto flex-wrap md:flex px-2 md:px-0 justify-center md:justify-start items-center my-6 text-center md:text-left"
    >
      <div className="px-6 text-darkblue-400">
        <Logo />
      </div>
      <div className="flex-col">
        <h1 className="font-oswald font-extrabold uppercase text-4xl pb-2">
        Simon Karman
        </h1>
        <p className="text-gray-700 uppercase tracking-wide leading-5">
        Cloud Consultant and Game&nbsp;Developer
        </p>
      </div>
    </header>
  </Link>;
};
