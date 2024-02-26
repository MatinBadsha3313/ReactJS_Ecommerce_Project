import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./store";

const FilterStore = createContext({
  all_Items: [],
  filter_Items: [],
  rating: 0,
  maxPrice: 0,
  minPrice: 0,
  priceRanges: [],
  filterByCategory: () => {},
});
const initialState = {
  all_Items: [],
  filter_Items: [],
  rating: 0,
  maxPrice: 0,
  minPrice: 0,
  priceRanges: [],
  sorting_value: "low",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ALL_PRODUCTS":
      return {
        ...state,
        all_Items: [...action.payload],
        filter_Items: [...action.payload],
      };

    case "FILTER_BY_RATINGS":
      const { stars, vlaue } = action.payload;
      return {
        ...state,
        rating: vlaue,
        filter_Items: stars,
      };
    case "FILTER_BY_CATEGORY":
      return {
        ...state,
        filter_Items: action.payload,
      };
    case "SET_PRICE_RANGES":
      const { minPrice, maxPrice, priceRanges } = action.payload;
      return {
        ...state,
        maxPrice: maxPrice,
        minPrice: minPrice,
        priceRanges: priceRanges,
      };

    case "SET_SELECTED_PRICE":
      return {
        ...state,
        filter_Items: action.payload,
      };
    case "SET_SORTING_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };
    case "FILTER_BY_SORTING_VALUE":
      const { filter_Items, sorting_value } = state;

      const sortingItems = (a, b) => {
        switch (sorting_value) {
          case "low":
            return a.price - b.price;
          case "high":
            return b.price - a.price;
          case "a-z":
            return a.title.localeCompare(b.title);
          case "z-a":
            return b.title.toUpperCase() > a.title.toUpperCase() ? 1 : -1;
          default:
            return 0;
        }
      };

      const finalShortItems = [...filter_Items].sort(sortingItems);

      return {
        ...state,
        filter_Items: finalShortItems,
      };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        filter_Items: action.payload,
      };

    default:
      return state;
  }
};
const FilterStoreProvider = ({ children }) => {
  const { items } = useProductContext();
  // console.log("items", items);

  const [state, dispatch] = useReducer(reducer, initialState);

  //------------Star Rating function---------------
  const starClick = (i) => {
    const vlaue = i;
    console.log(vlaue);
    const stars = items.filter((prod) => Math.round(prod.rating) === vlaue);
    // setRating(i + 1);
    dispatch({ type: "FILTER_BY_RATINGS", payload: { stars, vlaue } });
  };

  //------------Shorting Function------------
  const filterShorting = (event) => {
    // console.log(event.target.value);
    dispatch({ type: "SET_SORTING_VALUE", payload: event.target.value });
    dispatch({ type: "FILTER_BY_SORTING_VALUE" });
  };
  //------------Filter Function------------

  const filterFunction = (elm, value) => {
    const allProducts = items.filter((element) => element[value] === elm);
    dispatch({ type: "FILTER_BY_CATEGORY", payload: allProducts });
  };
  //----------Clear_All_Filters------------
  const clearFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS", payload: state.all_Items });
  };
  //====================Price===================
  // Function to filter products based on price range
  const filterProductsByPrice = (minPrice, maxPrice) => {
    const filtered = items.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    dispatch({ type: "SET_SELECTED_PRICE", payload: filtered });
    // console.log("filtered", filtered);
  };
  // const generatePriceRanges = (minPrice, maxPrice, numRanges) => {
  //   const step = (maxPrice - minPrice) / numRanges;
  //   // console.log(step);
  //   // step-180
  //   const ranges = [];
  //   // console.log("ranges", ranges);
  //   for (let i = 0; i <= numRanges; i++) {
  //     const start = i === 0 ? minPrice : i * step;
  //     // console.log(start);
  //     const end = i === numRanges ? maxPrice : start + step;
  //     // console.log(end);
  //     ranges.push({ start, end });
  //     console.log("start", start, "end", end);
  //   }

  //   // }
  //   // return ranges;
  // };
  // generatePriceRanges(100, 1000, 5);
  // Function to generate price ranges
  // min-100 max- 1000 numR-5
  // const generatePriceRanges = (minPrice, maxPrice, numRanges) => {
  //   const step = (maxPrice - minPrice) / numRanges;
  // step-180
  //   const ranges = [];

  //   for (let i = 0; i < numRanges; i++) {
  //     const start = minPrice + i * step;
  // console.log(100 + i * 180)
  //     const end = i === numRanges - 1 ? maxPrice : start + step;
  //     ranges.push({ start, end });
  //   }

  //   return ranges;
  // };
  const generatePriceRanges = (minPrice, maxPrice, numRanges) => {
    // const range = maxPrice - minPrice;
    const intervals = [0, 40, 100, 200, 200, 450]; // Adjust intervals as needed
    const ranges = [];

    for (let i = 0; i < numRanges; i++) {
      const start = i === 0 ? minPrice : ranges[i - 1].end;
      const end = Math.min(start + intervals[i], maxPrice);
      ranges.push({ start, end });
      // console.log(start, end, "start,end");
    }

    return ranges;
  };
  //----------Calculate_Min_Max_Price_Range_and dispatch--------
  // console.log(state.filter_Items);
  const calculatePriceRanges = () => {
    const priceArray = state.filter_Items.map((product) => product.price);
    // console.log(priceArray, "proceo");
    const minPrice = Math.min(...priceArray);
    const maxPrice = Math.max(...priceArray);
    // console.log(minPrice);
    // console.log(maxPrice);
    const numRanges = 5;

    //Calling the Generate price function to generate start and end
    const priceRanges = generatePriceRanges(minPrice, maxPrice, numRanges);

    // Dispatch min, max, and price ranges
    dispatch({
      type: "SET_PRICE_RANGES",
      payload: {
        minPrice,
        maxPrice,
        priceRanges,
      },
    });
  };

  useEffect(() => {
    calculatePriceRanges();
  }, [state.filter_Items]);
  // ---------To set all Products for Filters-----------
  useEffect(() => {
    dispatch({ type: "LOAD_ALL_PRODUCTS", payload: items });
  }, [items]);

  return (
    <FilterStore.Provider
      value={{
        ...state,
        starClick,
        filterFunction,
        filterProductsByPrice,
        filterShorting,
        clearFilters,
      }}
    >
      {children}
    </FilterStore.Provider>
  );
};

const useFilterStoreProvider = () => {
  return useContext(FilterStore);
};

export { FilterStoreProvider, useFilterStoreProvider };
