'use client';

import React, { useState, useEffect } from 'react';
import { Home, Wrench, Sun, Moon, Menu, ChevronDown, User, Logs } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));

      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return newMode;
    });
  };
  const toggleSubmenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar (Header) */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center bg-gray-800 px-6 text-white shadow-md dark:bg-gray-900">
        <h1 className="text-xl font-bold">ps</h1>
        <div className="flex flex-1 justify-center"></div>
        {/* Dark Mode Butonu */}
        <button
          onClick={toggleDarkMode}
          className="mx-3 rounded-lg bg-gray-700 p-2 pr-2 hover:bg-gray-600"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
        <button className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600">
          <User />
        </button>
      </header>

      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <motion.div
          animate={{ width: isOpen ? '16rem' : '5rem' }}
          className="fixed bottom-0 left-0 top-14 flex h-screen flex-col overflow-y-auto bg-gray-800 text-white shadow-lg transition-all duration-300 dark:bg-gray-900"
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4">
            {isOpen && <h1 className="text-2xl font-bold"></h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
            >
              <Menu />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4 flex flex-col space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700"
            >
              <Home /> {isOpen && 'Ana Sayfa'}
            </a>

            <div className="flex flex-col">
              <button
                onClick={() => toggleSubmenu('parameters')}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 transition hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Wrench /> {isOpen && 'Sistem Parametreleri'}
                </div>
                {isOpen && (
                  <ChevronDown
                    className={`transition-transform ${
                      openMenus['parameters'] ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {openMenus['parameters'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="ml-6 flex flex-col space-y-2"
                >
                  <Link
                    href="/definition"
                    className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <Logs /> Tanımlar{' '}
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </nav>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
