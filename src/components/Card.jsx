import { Link } from "react-router-dom";
import { useState } from "react";

const Card = ({ productData }) => {
  const { id, title, images, price, rating } = productData;
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (imageError || !images?.length) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-200 hover:border-purple-300"
    >
      {/* Image Container */}
      <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          onError={() => setImageError(true)}
          className={`max-h-full object-contain transition-all duration-300 ${
            isHovered ? "rotate-2" : "rotate-0"
          }`}
        />
        {rating && (
          <div className="absolute top-3 right-3 bg-yellow-100 text-gray-800 px-2 py-1 rounded-full text-sm font-bold shadow-lg">
            ⭐ {rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h1 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-purple-600 transition-colors duration-300">
          {title}
        </h1>

        {/* Price */}
        {price && (
          <div className="mb-4">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </p>
          </div>
        )}

        {/* Button */}
        <Link
          to={`/product/${id}`}
          state={{ product: productData }}
          className="mt-auto bg-purple-600 text-white py-2 px-4 rounded-full text-center font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
