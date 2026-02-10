import { useMemo } from "react";
import { useCart } from "../cardContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const { totalItems, subtotal, tax, total } = useMemo(() => {
    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return { totalItems, subtotal, tax, total };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cart is Empty</h1>
          <p className="text-gray-600 text-lg mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-5xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-lg font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
        <p className="text-gray-600">Review and manage your items below</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
              >
                <div className="flex gap-6 p-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden group">
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Product Details - Middle */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h2>

                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.availabilityStatus}
                      </span>
                      {product.rating && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                          ⭐ {product.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      {product.description?.substring(0, 100)}...
                    </p>

                    {/* Info Pills */}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      {product.shippingInformation && (
                        <span className="bg-blue-50 px-3 py-1 rounded-full">🚚 {product.shippingInformation}</span>
                      )}
                      {product.warrantyInformation && (
                        <span className="bg-indigo-50 px-3 py-1 rounded-full">🛡️ {product.warrantyInformation}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    {/* Price */}
                    <div className="text-right mb-4">
                      <p className="text-sm text-gray-600">Unit Price</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 mb-4">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity === 1}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-purple-600 hover:text-white disabled:opacity-50 font-bold transition-all duration-300"
                      >
                        −
                      </button>
                      <span className="font-bold text-gray-800 w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-purple-600 hover:text-white font-bold transition-all duration-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total Bar */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 border-t border-purple-100 flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Item Total:</span>
                  <span className="text-xl font-bold text-purple-600">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {/* Subtotal */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-4xl font-bold text-purple-600">${total.toFixed(2)}</p>
            </div> 

            {/* Continue Shopping */}
            <Link to="/"
              className="w-full block text-center border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
