const PriceSection = ({ priceRanges, filterProductsByPrice }) => {
  // Function to handle user click on a specific price range
  const handlePriceRangeClick = (start, end) => {
    filterProductsByPrice(start, end);
  };
  // Function to format price
  const formatPrice = (price) => `₹${price.toLocaleString()}`;

  return (
    <div>
      {priceRanges.map((range, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name="radioPrice"
            id={`radio${index}`}
            onClick={() => handlePriceRangeClick(range.start, range.end)}
          />
          <label className="form-check-label" htmlFor={`radio${index}`}>
            {index === 0
              ? `Min ${formatPrice(range.start)}`
              : index === priceRanges.length - 1
              ? `Max ${formatPrice(range.end)}`
              : `${formatPrice(range.start)} - ${formatPrice(range.end)}`}
          </label>
        </div>
      ))}
    </div>
  );
};
export default PriceSection;
