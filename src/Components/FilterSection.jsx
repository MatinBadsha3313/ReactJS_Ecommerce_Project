import { FaCheck, FaStar } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import PriceSection from "./PriceSection";
import { useFilterStoreProvider } from "../store/Filter_Store";

const FilterSection = () => {
  const {
    all_Items,
    rating,
    starClick,
    filterFunction,
    filterShorting,
    clearFilters,
    filter_Items,
    priceRanges,
    filterProductsByPrice,
  } = useFilterStoreProvider();

  // filter brand, category function
  const allCategory = (product, filterCate) => {
    const categoryByFilter = product.map((elm) => elm[filterCate]);

    const vlaueOfCate = [...new Set(categoryByFilter)];
    return vlaueOfCate;
  };
  const vlaueOfCategory = allCategory(all_Items, "category");
  const vlaueOfBrand = allCategory(all_Items, "brand");

  return (
    <>
      <div className="filter_section">
        <div>{`Filter Products ${filter_Items.length}`}</div>
        <div>
          <h5>Ratings</h5>
          {[...Array(5)].map((_, i) => (
            <span key={i} onClick={() => starClick(i + 1)}>
              {rating > i ? (
                <FaStar className="fs-5" />
              ) : (
                <AiOutlineStar className="fs-5" />
              )}
            </span>
          ))}
        </div>

        {/* -------------Filter_By_Brand----------  */}
        <div className="filter-company">
          <h5>Brand</h5>
          {vlaueOfBrand.map((elm, index) => {
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioBrand"
                  id={`radioBrand${index}`}
                  value={elm}
                  onClick={() => filterFunction(elm, "brand")}
                  // onClick={filterBy}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radioBrand${index}`}
                >
                  {elm}
                </label>
              </div>
            );
          })}
        </div>
        {/* -------------Filter_By_Shorting----------  */}
        <div className="filter-company">
          <h5>Sorting</h5>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSorting"
              id="radioSort1"
              value="low"
              onClick={filterShorting}
            />
            <label className="form-check-label" htmlFor="radioSort1">
              Price: Low to High
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSorting"
              id="radioSort2"
              value="high"
              onClick={filterShorting}
            />
            <label className="form-check-label" htmlFor="radioSort2">
              Price: High to Low
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSorting"
              id="radioSort3"
              value="a-z"
              onClick={filterShorting}
            />
            <label className="form-check-label" htmlFor="radioSort3">
              Name: (a-z)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSorting"
              id="radioSort4"
              value="z-a"
              onClick={filterShorting}
            />
            <label className="form-check-label" htmlFor="radioSort4">
              Name: (z-a)
            </label>
          </div>
        </div>
        {/* -------------Filter_By_Category----------  */}
        <div className="filter-company">
          <h5>Category</h5>
          {vlaueOfCategory.map((elm, index) => {
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioCategory"
                  id={`radioCategory${index}`}
                  value={elm}
                  onClick={() => filterFunction(elm, "category")}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radioCategory${index}`}
                >
                  {elm}
                </label>
              </div>
            );
          })}
        </div>
        {/* -------------Filter_By_Price----------  */}
        <div className="filter_price">
          <h5>Price</h5>
          <PriceSection
            priceRanges={priceRanges}
            filterProductsByPrice={filterProductsByPrice}
          />
        </div>
        {/* -------------Clear_Filter_Button----------  */}
        <div className="text-center my-3 pb-1">
          <button className="btn btn-danger" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
