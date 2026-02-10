Project Documentation
1. Project Setup Steps
Follow these steps to set up and run the project locally:
npm create vite@latest project-name -- --template react
cd project-name
npm install
npm run dev

Install required dependencies:
npm install react-router-dom


2. Public API Used
DummyJSON Products API
https://dummyjson.com/products
This API is used to fetch product data such as product name, price, images, and description.

3. Implemented Features
Product Listing
Grid layout for displaying products
Responsive UI for better user experience
Cart Functionality
Add products to cart
Remove products from cart
Increase product quantity
Decrease product quantity
Prevent negative quantity values

Price Calculation
Automatic calculation of total cart price
Updates total price on quantity change
Pagination
Configurable number of products per page
Previous and Next page navigation

4. React Hooks Used
useState
Manage component-level state such as cart items, quantities, and pagination state
useEffect
Fetch product data from the API
Handle side effects such as updating UI on state changes
useMemo
Optimize performance by memoizing total price calculations
Prevent unnecessary recalculations on re-renders
useReducer
Manage complex cart logic (add, remove, increase, decrease actions)
Maintain predictable and centralized state updates.

