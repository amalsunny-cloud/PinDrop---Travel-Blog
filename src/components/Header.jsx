import { useState, useEffect } from "react";
import PinDrop from '../assets/PinDrop.png'

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <img 
            src={PinDrop}
            alt="PinDrop Logo" 
            className="h-10 w-10 object-contain" 
          />


          <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-teal-600 transition-colors select-none">
            PinDrop
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition">
              Home
            </a>
            <a href="#destinations" className="text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition">
              Destinations
            </a>
            <a href="#footer" className="text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition">
              Contact
            </a>
          </nav>

          <button
            onClick={toggleDark}
            className="w-16 h-9 bg-gray-300 dark:bg-teal-600 rounded-full shadow-inner transition-all duration-300 overflow-hidden relative"
          >
            <div
              className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-xl transition-transform duration-300 ${
                isDark ? "translate-x-8" : "translate-x-1"
              }`}
            >
              {isDark ? "☾" : "☀"}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}