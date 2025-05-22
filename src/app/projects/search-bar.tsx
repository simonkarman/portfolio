'use client';

import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

type SearchProps = {
  simpleView: boolean,
  setSimpleView: (value: boolean) => void,
  searchFilter: string,
  setSearchFilter: (value: string) => void,
}

export const SearchBar = (props: SearchProps) => {
  const [showSearchBar, setShowSearchBar] = useState(props.searchFilter !== '');
  const { simpleView, setSimpleView, searchFilter, setSearchFilter } = props;

  // If the search bar loses focus and is empty, hide it
  const handleBlur = () => {
    if (searchFilter === '') {
      setShowSearchBar(false);
    }
  };

  return <div className="w-full p-5 space-y-2 sticky top-[4.5rem] md:top-16 z-10 bg-white text-darkblue-400 border-b">
    <div className="container mx-auto flex justify-center md:justify-end items-baseline gap-1">
      {showSearchBar
        ? <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          autoFocus={true}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          onBlur={handleBlur}
          placeholder="Search"
          type="search"
          className={`flex-1 py-1 px-3 border rounded leading-tight
                      focus:outline-none focus:shadow-outline appearance-none`}
        />
        : <button
          className="px-2 py-0.5 rounded border hover:bg-gray-100"
          onClick={() => setShowSearchBar(b => !b)}
        >
            Search <FontAwesomeIcon icon={faSearch} className={'ml-1'} />
        </button>
      }
      <button
        onClick={() => setSimpleView(!simpleView)}
        className={'px-2 py-0.5 rounded border hover:bg-gray-100'}
      >
        Show {!simpleView ? 'List' : 'Raster'}
      </button>
    </div>
  </div>;
};
