import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useLanguage } from '../context/LanguageContext';
import translations from '../public/translations';
import { Fragment } from 'react';

export default function Dropdown() {
  const { language, setLanguage } = useLanguage();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl">
          {translations[language].selectLanguage}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-800 hover:text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {Object.keys(translations).map((lang) => (
              <Menu.Item key={lang}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(lang)}
                    className={`${
                      active ? 'bg-gray-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-150 ease-in-out`}
                  >
                    {lang}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}