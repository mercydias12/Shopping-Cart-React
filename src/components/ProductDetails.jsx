import { useLocation } from "react-router-dom";
import { useCart } from "../cardContext";
import { useState } from "react";

const ProductDetails = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = location.state?.product;

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <img
        src={product.thumbnail || product.images[0]}
        alt={product.title}
        className="w-full max-h-96 object-contain mb-6"
      />

      <p className="text-lg"><strong>Brand:</strong> {product.brand}</p>
      <p className="text-lg"><strong>Price:</strong> ₹{product.price}</p>
      <p className="mt-3 text-gray-700">{product.description}</p>


      <span
        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium
          ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
        `}
      >
        {product.availabilityStatus}
      </span>


      <div className="mt-6 space-y-2 text-gray-700">
        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
        <p><strong>Shipping:</strong> {product.shippingInformation}</p>
        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
      </div>


      <div className="flex items-center gap-4 mt-6">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 bg-gray-200 rounded-full" >
          −
        </button>

        <span className="text-lg font-semibold">{quantity}</span>

        <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-gray-200 rounded-full">
          +
        </button>
      </div>

      <button onClick={handleAddToCart} className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700">
        Add to Cart
      </button>


      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border-b py-4">
            <p className="font-semibold">
              {review.reviewerName} ⭐ {review.rating}
            </p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
