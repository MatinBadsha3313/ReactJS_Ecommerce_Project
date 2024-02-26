import { createContext, useEffect, useReducer } from "react";

import { toast } from "react-toastify";
import { useContext } from "react";

const StoreContext = createContext({
  filterByCategory: () => {},

  dispatch: () => {},
  state: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

const getSaveCartItems = () => {
  let saveCartData = localStorage.getItem("cartItems");
  if (saveCartData === "") {
    return [];
  } else {
    // return console.log(saveCartData);
    return JSON.parse(saveCartData);
  }
};
const getWishList = () => {
  let wishListItems = localStorage.getItem("wishList");
  if (wishListItems === "") {
    return [];
  } else {
    return JSON.parse(wishListItems);
  }
};
//----Define-InitaialState----
const initialState = {
  items: [],
  total_Items: 0,
  isLoading: false,
  isError: false,
  cart: getSaveCartItems(),
  isSingleItemLoading: false,
  isSingleItemError: false,
  singleProduct: {},
  relatedProducts: [],
  skip: 1,
  wish_List: getWishList(),
};

//-----Main_API----
// const API = `https://dummyjson.com/products?limit=20&skip=${
//   state.skip * 20 - 20
// }`;
// const API = "https://dummyjson.com/products?limit=100";
// const API = `https://dummyjson.com/products?limit=${state.limit}`;
// const API = "https://dummyjson.com/products";

const reducer = (state, action) => {
  const { items } = state;
  switch (action.type) {
    case "SET_LOADING_DATA":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_API_DATA":
      // console.log(action.payload);
      const { data, totalData } = action.payload;
      const priceM = data.map((elem) => elem.price);
      const priceSort = [...new Set(priceM)];
      const priceMax = Math.max(...priceSort);
      const priceMin = Math.min(...priceSort);
      // console.log("total", totalData);
      return {
        ...state,
        isLoading: false,
        items: data,
        maxPrice: priceMax,
        minPrice: priceMin,
        total_Items: totalData,
      };
    case "SET_ERROR_DATA":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SINGLE_PRODUCT_LOADING":
      return {
        ...state,
        isSingleItemLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleItemLoading: false,
        singleProduct: action.payload,
      };
    case "SINGLE_PRODUCT_ERROR":
      return {
        ...state,
        isSingleItemLoading: false,
        isSingleItemError: true,
      };
    case "RELATED_PRODUCT":
      const categoryProducts = items.filter(
        (categ) => categ.category === action.payload
      );
      return {
        ...state,
        relatedProducts: categoryProducts,
      };
    case "SET_WISH_LIST":
      let wishProduct = items.filter((elm) => elm.id == action.payload);

      return {
        ...state,
        wish_List: [...state.wish_List, wishProduct[0]],
      };
    case "REMOVE_WISH_LIST":
      const { wish_List } = state;
      const removeWishList = wish_List.filter(
        (elm) => elm.id !== action.payload
      );
      return {
        ...state,
        wish_List: removeWishList,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      const { cart } = state;

      const removeitem = cart.filter((elem) => elem.id !== action.payload.id);
      return {
        ...state,
        cart: removeitem,
      };
    case "CLEAR_ALL_CART":
      return {
        ...state,
        cart: [],
      };
    case "FILTER_BY_PRICE":
      const priceItems = ite.filter((cat) => cat.price === action.payload);
      return {
        ...state,
        items: priceItems,
      };

    case "SET_PAGE_ITEMS":
      return {
        ...state,
        skip: action.payload,
      };

    default:
      return state;

    //spread operator (...) to create a new array that includes all the existing items in the cart array and adds the new item at the end. if we use like this - return { ...state, cart: [...state.cart, action.payload] }
    // But if we use like this -  return { ...state, cart: [...action.payload] } it replaces the entire cart with a new array of items.
  }
};

const MyContext = ({ children }) => {
  //-------------------Reducer----------------
  const [state, dispatch] = useReducer(reducer, initialState);

  //----Saving_Cart_TO_LocalStorage-----
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
  }, [state.cart]);
  //----Saving_Wish_List_To_LocalStorage----------
  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(state.wish_List));
  }, [state.wish_List]);

  //-----API_Calling------
  const getAPIFunc = async (url) => {
    dispatch({ type: "SET_LOADING_DATA" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: "SET_API_DATA",
        payload: {
          data: data.products,
          totalData: data.total,
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR_DATA" });
      // console.log(error);
    }
    // return null;
  };
  //-----API_Calling-For_single_products------
  const singleProductDetails = async (url) => {
    dispatch({ type: "SINGLE_PRODUCT_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();

      dispatch({ type: "SET_SINGLE_PRODUCT", payload: data });
    } catch (error) {
      dispatch({ type: "SINGLE_PRODUCT_ERROR" });
      // console.log(error);
    }
    // return null;
  };

  useEffect(() => {
    getAPIFunc(
      `https://dummyjson.com/products?limit=20&skip=${state.skip * 20 - 20}`
    );
  }, [state.skip]);

  const filterByPrice = (event) => {
    const priceEvent = event.target.value;
    // console.log(priceEvent);
    dispatch({ type: "FILTER_BY_PRICE", payload: priceEvent });
  };
  //------------Add_Heart_Function------------
  const addHeartFunction = (pro) => {
    dispatch({ type: "SET_WISH_LIST", payload: pro });
  };
  //------------Remove_Heart_Function------------
  const removeHeartFunction = (pro) => {
    dispatch({ type: "REMOVE_WISH_LIST", payload: pro });
  };
  //--------------Add To Cart Funtion------------
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    //----Tostify-----
    toast.success(" Add To Cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  //-------------Related_Products------------
  const getRelatedProduct = (singleProduct) => {
    dispatch({ type: "RELATED_PRODUCT", payload: singleProduct.category });
  };
  //-------------Remove From Cart Function------------
  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  //--------------Clear_All_Cart------------
  const clearAllCart = () => {
    dispatch({ type: "CLEAR_ALL_CART" });
  };
  //------------Set_Products--------------
  const setPage = (num) => {
    //  const skipIndex = num;
    // let skipData = 0;
    // if (num === 0) {
    //   skipData;
    // } else {
    //   skipData = num * 20;
    // }
    // dispatch({ type: "SET_PAGE_ITEMS", payload: skipData });
    // another try
    dispatch({ type: "SET_PAGE_ITEMS", payload: num + 1 });
  };

  function previousPage() {
    dispatch({ type: "SET_PAGE_ITEMS", payload: state.skip - 1 });
  }

  function nextPage() {
    dispatch({ type: "SET_PAGE_ITEMS", payload: state.skip + 1 });
  }

  return (
    <StoreContext.Provider
      value={{
        ...state,
        getRelatedProduct,
        dispatch,
        addToCart,
        removeFromCart,
        clearAllCart,
        singleProductDetails,
        addHeartFunction,
        removeHeartFunction,
        filterByPrice,
        setPage,
        previousPage,
        nextPage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

//-----Custom-Hooks------
const useProductContext = () => {
  return useContext(StoreContext);
};
export { StoreContext, MyContext, useProductContext };

// If we pass reducer state like ...state in context value then we don't have to destructure the reducer
// initialState liki if we pass like state(without spread operater) then we can use the reducer initialState liki
// this const { items, cart } = state;
