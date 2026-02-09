import { createContext, useContext, useReducer, useEffect, } from "react";
import { cartReducer, CART_ACTIONS } from "./components/cartReducer";

const CartContext = createContext();

//  Load initial cart from localStorage
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    // Persist cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        dispatch({
            type: CART_ACTIONS.ADD_TO_CART,
            payload: { product, quantity },
        });
    };

    const removeFromCart = (id) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_FROM_CART,
            payload: id,
        });
    };
    const updateQuantity = (id, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { id, quantity },
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
