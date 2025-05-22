'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const transformRoute = (route: string) => {
  route = route
    .replace(/\/$/g, '')
    .replace('/', '')
    .replace(/\//g, ' > ');
  if (route.length === 0) {
    route = 'home';
  }
  if (route.startsWith('about') || route.startsWith('contact')) {
    route += ' me';
  }
  if (route.startsWith('projects')) {
    route = route.replace('projects', 'portfolio');
  }
  return route;
};

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const currentRoute = transformRoute(pathName);
  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
  const closeMenu = () => { setIsMenuOpen(false); };
  const isRouteOf = (route: string) => currentRoute.startsWith(route);
  useEffect(() => {
    closeMenu();
  }, [pathName]);
  return <nav className="sticky top-0 text-white uppercase z-20">
    <div className="block md:hidden">
      <div onClick={toggleMenu} className="bg-darkblue-400">
        <ul className="container mx-auto flex justify-between items-center py-5 px-6">
          <li>
            <Link onClick={(e) => {
              e.preventDefault();
              toggleMenu();
            }} href={pathName}>
              { currentRoute }
            </Link>
          </li>
          <li>
            <svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z" />
            </svg>
          </li>
        </ul>
      </div>
      <div className={(isMenuOpen ? '' : 'hidden ') + 'bg-darkblue-300 border-t-2 border-darkblue-600' }>
        <ul className="container mx-auto flex-col py-4">
          <li className="hover:bg-darkblue-400">
            <Link href="/" className="block py-1 px-4 my-1">
              Home
            </Link>
          </li>
          <li className="hover:bg-darkblue-400">
            <Link href="/projects" className="block py-1 px-4 my-1">
              Portfolio
            </Link>
          </li>
          <li className="hover:bg-darkblue-400">
            <Link href="/about" className="block py-1 px-4 my-1">
              About Me
            </Link>
          </li>
          <li className="hover:bg-darkblue-400">
            <Link href="/contact" className="block py-1 px-4 my-1">
              Contact Me
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="hidden md:block">
      <div className="bg-darkblue-400">
        <ul className="container mx-auto flex justify-start items-center">
          <Link className={(isRouteOf('home') ? 'bg-darkblue-800 ' : '') + 'py-5 px-6 hover:bg-darkblue-800'} href="/">
            Home
          </Link>
          <Link className={(isRouteOf('projects') ? 'bg-darkblue-800 ' : '') + 'py-5 px-6 hover:bg-darkblue-800'} href="/projects">
            Portfolio
          </Link>
          <Link className={(isRouteOf('about') ? 'bg-darkblue-800 ' : '') + 'py-5 px-6 hover:bg-darkblue-800'} href="/about">
            About Me
          </Link>
          <Link className={(isRouteOf('contact') ? 'bg-darkblue-800 ' : '') + 'py-5 px-6 hover:bg-darkblue-800'} href="/contact">
            Contact Me
          </Link>
        </ul>
      </div>
    </div>
  </nav>;
};
