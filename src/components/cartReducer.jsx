export const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity } = action.payload;

      const existingItem = state.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...state, { product, quantity }];
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      return state.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
    }

    case CART_ACTIONS.REMOVE_FROM_CART:
      return state.filter(
        (item) => item.product.id !== action.payload
      );

    default:
      return state;
  }
};
