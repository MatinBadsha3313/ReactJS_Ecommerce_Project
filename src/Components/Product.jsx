import { useProductContext } from "../store/store";
import DisplayProduct from "./DisplayProduct";
import FilterSection from "./FilterSection";

import { useFilterStoreProvider } from "../store/Filter_Store";

import Pagination from "./Pagination";

const Product = () => {
  const {
    addToCart,
    removeFromCart,
    total_Items,
    setPage,
    nextPage,
    previousPage,
    skip,
  } = useProductContext();
  const { filter_Items } = useFilterStoreProvider();

  return (
    <>
      <div className="product-grid-column">
        <div className="filterDisplay">
          <FilterSection />
        </div>

        <div>
          <p className="product-data text-center">{`Total ${total_Items}  Showing Products ${
            20 * skip
          }  `}</p>

          <div>
            <Pagination
              skip={skip}
              total_Items={total_Items}
              nextPage={nextPage}
              previousPage={previousPage}
              setPage={setPage}
            />

            <DisplayProduct
              items={filter_Items}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
            <Pagination
              skip={skip}
              total_Items={total_Items}
              nextPage={nextPage}
              previousPage={previousPage}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
