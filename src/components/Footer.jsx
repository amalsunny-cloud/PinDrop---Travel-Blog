
import YouTube from '../assets/youtube3.png'
import Instagram from '../assets/instagram3.png'
import Twitter from '../assets/twitter3.png'
import FaceBook from '../assets/facebook3.png'


export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-white pt-8 transition-colors duration-300 border-t" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-teal-600 mb-4 select-none">PinDrop</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 select-none">
              Discover breathtaking destinations around the globe. Plan your perfect trip with our curated travel guides and expert tips.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <img src={FaceBook} alt="" className="w-6"/>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <img src={Twitter} alt="" className="w-6"/>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <img src={Instagram} alt="" className="w-6"/>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="sr-only">YouTube</span>
                <img src={YouTube} alt="" className="w-6"/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white select-none">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#destinations" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Destinations</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Contact</a></li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white select-none">Contact Us</h4>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              <p>📧 hello@pindrop.com</p>
              <p>📞 +91 123456789</p>
              <p>📍 123 Travel Street, Adventure City, Boston</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 select-none">
            © 2025 PinDrop • All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}