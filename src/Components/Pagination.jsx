import { GrNext, GrPrevious } from "react-icons/gr";

export default function Pagination({
  skip,
  total_Items,
  nextPage,
  previousPage,
  setPage,
}) {
  // console.log("skip", skip);
  // console.log("total_Items", total_Items);
  // console.log("total_Items", total_Items)
  return (
    <div className="pagination">
      {skip >= 2 && (
        <span className="next" onClick={previousPage}>
          <GrPrevious className="fs-4" />
        </span>
      )}
      {[...Array(Math.round(total_Items / 20))].map((_, index) => {
        return (
          <span
            key={index}
            className={`page-num ${
              skip === index + 1 ? "selected" : "not-selected"
            }`}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </span>
        );
      })}
      {skip <= 9 && (
        <span className="next" onClick={nextPage}>
          <GrNext className="fs-4" />
        </span>
      )}
    </div>
  );
}
