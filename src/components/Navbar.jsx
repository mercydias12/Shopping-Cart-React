import { Link } from "react-router-dom";
import { useCart } from "../cardContext";

const Navbar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg border-b border-purple-500/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-2">
          <span className="text-4xl font-[Allura] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-400 transition-all duration-300">
            Let's Shop
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="relative px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            Main
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <Link 
            to="/cart" 
            className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-all duration-300 group"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">🛒</span>
            <span>Cart</span>
            <span className={`ml-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg transform group-hover:scale-110 transition-all duration-300 ${
              totalItems > 0 ? "animate-pulse" : ""
            }`}>
              {totalItems}
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
