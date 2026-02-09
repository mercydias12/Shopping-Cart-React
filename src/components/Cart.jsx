import { useMemo } from "react";
import { useCart } from "../cardContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const { totalItems, subtotal } = useMemo(() => {
    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return { totalItems, subtotal };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-2xl p-5 flex flex-col sm:flex-row gap-6"
          >
            
            <img
              src={product.thumbnail || product.images[0]}
              alt={product.title}
              className="w-24 h-24 object-contain"
            />

          
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {product.title}
              </h2>

              <p className="text-gray-600">
                ₹{product.price} × {quantity}
              </p>

              <p className="font-semibold mt-1">
                Item Total: ₹{(product.price * quantity).toFixed(2)}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm
                  ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {product.availabilityStatus}
              </span>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>🚚 {product.shippingInformation}</p>
                <p>🛡 {product.warrantyInformation}</p>
                <p>↩ {product.returnPolicy}</p>
              </div>

         
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() =>updateQuantity(product.id, quantity - 1)} disabled={quantity === 1} className="w-7 h-7 border rounded-full text-lg
                     hover:bg-gray-100 disabled:opacity-40">
                    −
                </button>

                <span className="font-semibold">{quantity}</span>

                <button onClick={() =>updateQuantity(product.id, quantity + 1)} className="w-7 h-7 border rounded-full text-lg hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            <button onClick={() => removeFromCart(product.id)} className="self-start px-4 py-1.5 text-sm border border-red-500 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition" >
                Remove
            </button>
          </div>
        ))}
      </div>

    
      <div className="mt-10 border-t pt-6 text-right">
        <p>
          Total Items: <strong>{totalItems}</strong>
        </p>
        <p className="text-2xl font-bold mt-2">
          Subtotal: ₹{subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
