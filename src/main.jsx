import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Product from "./Components/Product.jsx";
import ProductDetails from "./Components/ProductDetail.jsx";
import SearchItem from "./Components/SearchItem.jsx";
import WishList from "./Components/Wishlist.jsx";
import Cart from "./Components/Cart.jsx";
import Error from "./Components/Error.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { FilterStoreProvider } from "./store/Filter_Store.jsx";
import { MyContext } from "./store/store.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Product />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="search/:val" element={<SearchItem />} />
      <Route path="wishlist" element={<WishList />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyContext>
      <FilterStoreProvider>
        <RouterProvider router={router} />
      </FilterStoreProvider>
    </MyContext>
  </React.StrictMode>
);
