React Shopping Cart App:
A beginner-friendly Shopping Cart application built with React and the useReducer hook. It lets users:


Features:
Add products to cart
Prevent duplicate entries
Increase/decrease product quantity
Remove products from cart
Calculate total cart price
User-friendly and beginner-focused code structure


Concepts Used:
useReducer for managing complex state logic
Component-based structure (App, ProductList, CartList)
Action dispatching and state immutability
Basic conditional rendering
Mapping arrays in JSX


Getting Started:
Follow these steps to run the project locally:

1. Clone the repository
git clone https://github.com/your-username/shopping-cart-app.git
cd shopping-cart-app
2. Install dependencies
npm install
3. Start the development server
npm run dev
The app will be running at http://localhost:3000


How it Works:
Clicking Add to Cart dispatches an ADD_TO_CART action.
Quantity buttons (+ / -) update the quantity using reducer actions.
Removing an item dispatches REMOVE_ITEM.
Cart total is recalculated automatically using .reduce().


What You’ll Learn:
Perfect for beginners who want to:
Practice React’s useReducer for state handling
Build a functional, real-world UI
Understand how cart systems work

Future Ideas:
Add product images
Store cart data in localStorage
Create a checkout screen
Add loading spinners or success messages

🧑‍💻 Author
Muhammad Salman – aspiring front-end developer passionate about building clean, functional UIs with React.