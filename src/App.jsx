import { useReducer } from "react";

// List of products available in the store
const products = [
  { id: 1, name: "Wireless Mouse", price: 25 },
  { id: 2, name: "Bluetooth Headphones", price: 40 },
  { id: 3, name: "USB-C Charger", price: 15 },
  { id: 4, name: "Notebook", price: 10 },
  { id: 5, name: "Mechanical Keyboard", price: 55 },
];

// Reducer function to manage cart state based on action types
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the product is already in the cart
      const exist = state.cart.some((item) => item.id === action.payload.id);
      if (exist) {
        // If product already in cart, do nothing
        return state;
      } else {
        // If not in cart, add the product with quantity = 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_ITEM":
      // Remove the item from cart by filtering it out
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: updatedCart,
      };

    case "INCREASE_QUANTITY":
      // Increase quantity of selected item in cart
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      // Decrease quantity, and remove if quantity becomes 0
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      // Return the current state if action is unknown
      return state;
  }
};

// Initial state with empty cart
const initialState = {
  cart: [],
};

function App() {
  // useReducer hook to manage cart state and actions
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <>
      <h1>Shopping Cart</h1>

      {/* Show product list and pass dispatch to allow adding to cart */}
      <ProductList dispatch={dispatch} />

      {/* Show cart items and allow interaction (increase/decrease/remove) */}
      <CartList cart={state.cart} dispatch={dispatch} />
    </>
  );
}

// Component to display list of products with "Add to Cart" button
function ProductList({ dispatch }) {
  return (
    <>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h4>Name: {product.name}</h4>
              <p>Price: ${product.price}</p>
              <br />
              {/* When clicked, dispatch ADD_TO_CART action with product */}
              <button
                onClick={() =>
                  dispatch({ type: "ADD_TO_CART", payload: product })
                }
              >
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// Component to display the cart with product details and controls
function CartList({ cart, dispatch }) {
  return (
    <>
      <h1>Cart Items</h1>

      {/* Show message if cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => {
              return (
                <li key={product.id}>
                  <h4>Name: {product.name}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  {/* Show total price for this item */}
                  <p>Total: ${product.price * product.quantity}</p>
                  <br />

                  {/* Button to increase quantity */}
                  <button
                    onClick={() =>
                      dispatch({ type: "INCREASE_QUANTITY", payload: product })
                    }
                  >
                    +
                  </button>

                  {/* Button to decrease quantity */}
                  <button
                    onClick={() =>
                      dispatch({ type: "DECREASE_QUANTITY", payload: product })
                    }
                  >
                    -
                  </button>

                  {/* Button to remove item from cart */}
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: product })
                    }
                  >
                    Remove from Cart
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Show total cart value */}
          <h3>
            Cart Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
        </>
      )}
    </>
  );
}

export default App;
