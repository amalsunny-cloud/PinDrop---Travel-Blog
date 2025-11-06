// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import DestinationCard from "./components/DestinationCard";
import Footer from "./components/Footer";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import YourTrips from "./components/YourTrips";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);

  // Load saved trips
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pinDropTrips") || "[]");
    setSavedTrips(saved);
  }, []);

  const destinations = [
    { img: "src/assets/Bali.JPG", title: "Bali, Indonesia", shortDesc: "Temples, rice terraces, and perfect waves.", longDesc: "Bali is an Indonesian paradise that feels like a fantasy. Soak up the sun on powdery beaches, surf world-class waves, or hike through lush jungles.", tips: ["Best time: May - September", "Try Nasi Goreng",
    "Visit Ubud Monkey Forest","Watch the sunset at Tanah Lot Temple"] },

    { img: "src/assets/Swiss_alps.jpg", title: "Swiss Alps, Switzerland", shortDesc: "Snow-capped peaks, chocolate, and pure magic.", longDesc: "Ride the Glacier Express, ski in Zermatt, or hike to crystal-clear lakes. Switzerland is nature’s masterpiece — serene, majestic, unforgettable..", tips: ["Best time: June - September","Take the Jungfrau Railway",
"Try fondue in Grindelwald",
"Visit Lake Geneva at sunset",] },

    { img: "src/assets/Roman_Colosseum_Rom.jpg", title: "Rome, Italy", shortDesc: "Eternal city of pasta, ruins, and romance.", longDesc: "Throw a coin in the Trevi Fountain, explore the Colosseum at sunrise, and eat carbonara where it was born.", tips: ["Best time: September - October","Skip-the-line Vatican tickets",
"Gelato at Giolitti",
"Walk the Spanish Steps at night",] },


    { img: "src/assets/paris_eiffel.jpg", title: "Paris, France", shortDesc: "City of lights, love, and legendary croissants.", longDesc: "Climb the Eiffel Tower at dusk, wander Montmartre, and picnic under cherry blossoms along the Seine.", tips: ["Best time: April - June","Sunset cruise on the Seine",
"Macarons from Pierre Hermé",
"Free Louvre entry 1st Sunday",] },

    { img: "src/assets/dubai_uae.jpg", title: "Dubai, UAE", shortDesc: "Skyscrapers, gold souks, and desert safaris.", longDesc: "Shop in air-conditioned malls, ski indoors at Mall of the Emirates, then ride a camel under the stars. Dubai is luxury meets adventure.", tips: ["Best time: November - March","Visit Burj Khalifa at sunset",
"Gold Souk bargaining tip: start at 50%",
"Book desert safari with BBQ dinner"] },

    { img: "src/assets/cairo_egypt.jpg", title: "Cairo, Egypt", shortDesc: "Pyramids, sunsets, and 5,000 years of history.", longDesc: "Stand in the shadow of the Great Pyramid, cruise the Nile at dusk, and haggle for treasures in Khan el-Khalili bazaar.", tips: ["Best time: October - November","Sunrise hot-air balloon over Luxor",
"Try koshari — Egypt’s street food king",
"Sound & Light show at Giza"] },

    { img: "src/assets/Golden_Gate_Bridge_sanfrancisco.jpg", title: "San Francisco, USA", shortDesc: "Fog, tech, and the Golden Gate.", longDesc: "Bike across the Golden Gate Bridge, eat clam chowder in a sourdough bowl, and ride a cable car up Russian Hill.", tips: ["Best time: September - November","Alcatraz night tour (spooky + views)",
"Best sourdough: Boudin Bakery",
"Walk the Painted Ladies at Alamo Square",] },
  ];

  const filtered = destinations.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tips.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="pb-8">
        <section id="home"><Banner /></section>

        <section id="destinations" className="py-16 bg-gradient-to-br from-ivory via-snow to-ghost dark:from-gray-900 dark:to-gray-700">
          <div className="max-w-7xl mx-auto px-4">

            {/* LIVE SEARCH */}
            <div className="max-w-2xl mx-auto my-12">
              <input
                type="text"
                placeholder="Search Bali, Pyramids, Golden Gate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-400 text-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white select-none">
              {searchQuery ? `Results for "${searchQuery}"` : "Top Destinations"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((dest, i) => (
                <DestinationCard key={i} {...dest} savedTrips={savedTrips} setSavedTrips={setSavedTrips} />
              ))}
            </div>
          </div>


        </section>
          <YourTrips  savedTrips={savedTrips} destinations={destinations}/>
      </main>

      <Footer/>
    </div>
  );
}

export default App;