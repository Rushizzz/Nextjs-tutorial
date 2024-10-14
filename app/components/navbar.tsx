import React from 'react';
import Dropdown from './dropdown';
import { useLanguage } from '../context/LanguageContext';
import translations from '../public/translations';
import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ENCL from '@/app/assets/icons/ENCL logo.svg'
import ENCL_text from '@/app/assets/icons/Engineers Cell.svg'
export default function Navbar() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex gap-8 items-center">
                <ENCL/>
                {/* <ENCL_text/> */}
                <span className='text-white text-2xl font-extrabold'>
                  {translations[language].navbarTitle}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center justify-end md:ml-6">
              <Dropdown />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-gray-500 flex justify-end">
            <div className=" px-5">
              <Dropdown />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}