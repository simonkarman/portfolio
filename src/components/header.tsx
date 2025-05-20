'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header = () => {
  return <Link href="/">
    <header
      className="container mx-auto flex-wrap md:flex px-2 md:px-0 justify-center md:justify-start items-center my-6 text-center md:text-left"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 7, 0] }}
        transition={{ repeat: Infinity, delay: 2.5, repeatDelay: 4.5 }}
        className="px-6 text-darkblue-400"
      >
        <Logo />
      </motion.div>
      <div className="flex-col mt-3 md:mt-0">
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
