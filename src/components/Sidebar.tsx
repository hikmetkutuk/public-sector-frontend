"use client";

import React, { useState } from "react";
import { Home, Wrench, Sun, Moon, Menu, ChevronDown, Logs } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isOpen ? "250px" : "80px" }}
        className="relative bg-gray-800 dark:bg-gray-900 text-white shadow-lg h-screen flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-2xl font-bold">ps</h1>}
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
            href="#"
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
              {isOpen && <ChevronDown className={`transition-transform ${openMenus["parameters"] ? "rotate-180" : ""}`} />}
            </button>
            {openMenus["parameters"] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-6 flex flex-col space-y-2"
              >
                <a href="#" className="block px-4 py-2 pt-2 pl-7 font-medium text-sm hover:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Logs /> Tanımlar
                    </div>
                </a>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Dark Mode Button */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            {isDarkMode ? <Sun /> : <Moon />}
            {isOpen && (isDarkMode ? "Light Mode" : "Dark Mode")}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold">Main Content</h1>
        <p className="mt-2">Bu, Sidebar ile birlikte ana içerik alanıdır.</p>
      </main>
    </div>
  );
};

export default Sidebar;
