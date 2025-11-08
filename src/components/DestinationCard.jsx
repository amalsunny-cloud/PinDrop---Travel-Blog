import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast, ToastContainer } from "react-toastify";

export default function DestinationCard({ img, title, shortDesc, longDesc, tips, savedTrips, setSavedTrips }) {
  const [isOpen, setIsOpen] = useState(false);
  const isSaved = savedTrips.includes(title);

  const toggleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      setSavedTrips(savedTrips.filter(t => t !== title));
    } else if (savedTrips.length < 3) {
      setSavedTrips([...savedTrips, title]);
      if (savedTrips.length >= 0) {
        confetti({ particleCount: 160, spread: 40, origin: { y: 0.8 } });
        
      }
    } else {
      toast.warn("Maximum 3 destinations allowed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full relative transition-colors duration-300">
      <div className="relative h-56 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
        <button
          onClick={toggleSave}
          className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-10 transition-all ${
            isSaved 
              ? "bg-red-500 text-white" 
              : "bg-white/90 dark:bg-gray-700 text-gray-700 dark:text-white"
          } hover:scale-110`}
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{shortDesc}</p>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">{longDesc}</p>
                <ul className="space-y-1 text-sm text-green-500 font-medium text-center mt-4">
                  {tips.map((t, i) => <li key={i}>• {t}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-3 text-teal-500 font-medium text-sm flex items-center"
        >
          {isOpen ? "Show less" : "Read more"}
          <svg className={`w-4 h-4 ml-1 transition ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}