import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://wallpaperaccess.com/full/185289.jpg",
      title: "PinDrop",
      subtitle: "Discover breathtaking destinations around the globe."
    },
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      title: "Adventure Awaits",
      subtitle: "Explore hidden gems and iconic landmarks."
    },
    {
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      title: "Create Memories",
      subtitle: "Your perfect journey starts here."
    },
    {
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "World Wonders",
      subtitle: "Experience cultures and landscapes like never before."
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Smoother variants for slide transitions
  const slideVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  // Staggered text animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Carousel Slides */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`
            }}
          />
        </AnimatePresence>

        {/* Dark overlay with subtle fade */}
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Navigation Arrows - Smoother hover */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Slide Indicators - Smoother scale & opacity */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              animate={{ scale: index === currentSlide ? 1.25 : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Content - Staggered entrance */}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={textVariants}
                custom={0}
                className="space-y-6"
              >
                <motion.h1
                  custom={0}
                  variants={textVariants}
                  className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg select-none"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  custom={1}
                  variants={textVariants}
                  className="text-xl md:text-2xl mb-8 drop-shadow select-none"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.a
                  href="#destinations"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
                >
                  Explore Now
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll indicator - Smoother bounce */}
        <motion.a
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          href="#destinations"
        >
          {/* <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg> */}
        </motion.a>
      </div>
    </section>
  );
}