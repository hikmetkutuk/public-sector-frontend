"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Wrench,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
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
    <div className="flex flex-col h-screen">
      {/* Navbar (Header) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-gray-800 dark:bg-gray-900 text-white flex items-center px-6 shadow-md z-50">
        <h1 className="text-xl font-bold">ps</h1>
        <div className="flex-1 flex justify-center"></div>
        {/* Dark Mode Butonu */}
        <button
          onClick={toggleDarkMode}
          className="p-2 pr-2 bg-gray-700 hover:bg-gray-600 rounded-lg mx-3"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <User />
        </button>
      </header>

      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <motion.div
          animate={{ width: isOpen ? "250px" : "80px" }}
          className="fixed left-0 top-14 bottom-0 bg-gray-800 dark:bg-gray-900 text-white shadow-lg h-screen flex flex-col overflow-y-auto"
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4">
            {isOpen && <h1 className="text-2xl font-bold"></h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              <Menu />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4 flex flex-col space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
            >
              <Home /> {isOpen && "Ana Sayfa"}
            </a>

            <div className="flex flex-col">
              <button
                onClick={() => toggleSubmenu("parameters")}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <Wrench /> {isOpen && "Sistem Parametreleri"}
                </div>
                {isOpen && (
                  <ChevronDown
                    className={`transition-transform ${
                      openMenus["parameters"] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {openMenus["parameters"] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="ml-6 flex flex-col space-y-2"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-lg"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-lg"
                  >
                    Security
                  </a>
                </motion.div>
              )}
            </div>
          </nav>
        </motion.div>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-all ${
            isOpen ? "pl-[250px]" : "pl-[80px]"
          }`}
        ></main>
      </div>
    </div>
  );
};

export default Sidebar;
