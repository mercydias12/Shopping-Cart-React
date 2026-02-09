import { Link } from "react-router-dom";
import { useCart } from "../cardContext";

const Navbar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center">
      <Link to="/" className="text-3xl font-[Allura] text-purple-600">Let's Shop </Link>
      
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-purple-400">Main</Link>
        <Link to="/cart" className="hover:text-purple-400"> Cart 🛒 <span className="ml-1 bg-purple-600 px-2 rounded-full text-sm">{totalItems}</span> </Link>
      </div>
    </nav>

  );
};

export default Navbar;
