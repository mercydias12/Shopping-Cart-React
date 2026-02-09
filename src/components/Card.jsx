import { Link } from "react-router-dom";
import { useState } from "react";

const Card = ({ productData }) => {
  const { id, title, images } = productData;
  const [imageError, setImageError] = useState(false);

  if (imageError || !images?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col h-full">
      <h1 className="text-base font-semibold text-center mb-3 truncate">
        {title}
      </h1>

      <div className="h-48 flex items-center justify-center">
        <img
          src={images[0]}
          alt={title}
          onError={() => setImageError(true)}
          className="max-h-full object-contain"
        />
      </div>

      <Link
        to={`/product/${id}`}
        state={{ product: productData }}
        className="mt-4 bg-purple-600 text-white py-2 rounded-full text-center hover:bg-purple-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
