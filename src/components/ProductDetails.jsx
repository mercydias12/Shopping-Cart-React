import { useLocation } from "react-router-dom";
import { useCart } from "../cardContext";
import { useState } from "react";

const ProductDetails = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("✅ Product added to cart!");
  };

  const averageRating = product.rating || (product.reviews?.length > 0 
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl p-8">
          {/* Left - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden group">
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              {product.rating && (
                <div className="absolute top-4 left-4 bg-yellow-100 text-gray-800 px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ {product.rating.toFixed(1)}
                </div>
              )}
              {product.availabilityStatus && (
                <span
                  className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    product.stock > 0
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.availabilityStatus}
                </span>
              )}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-between">
            {/* Title & Brand */}
            <div>
              {product.brand && (
                <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-5xl font-bold text-purple-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              {product.warrantyInformation && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Warranty</p>
                  <p className="text-sm text-gray-800 font-medium">{product.warrantyInformation}</p>
                </div>
              )}
              {product.shippingInformation && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Shipping</p>
                  <p className="text-sm text-gray-800 font-medium">{product.shippingInformation}</p>
                </div>
              )}
              {product.returnPolicy && (
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Return Policy</p>
                  <p className="text-sm text-gray-800 font-medium">{product.returnPolicy}</p>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-2 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-purple-600 hover:text-white font-bold text-xl transition-all duration-300"
                >
                  −
                </button>
                <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-purple-600 hover:text-white font-bold text-xl transition-all duration-300"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-bold text-lg text-gray-900">{averageRating}</span> out of 5
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{review.reviewerName}</p>
                      <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold text-gray-800">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
