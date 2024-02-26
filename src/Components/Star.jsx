import { MdOutlineStarOutline } from "react-icons/md";
import { IoStar, IoStarHalf } from "react-icons/io5";

const Star = ({ stars }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        // console.log(index);
        // console.log(index + 1);
        let halfNum = index + 0.5;
        // console.log(halfNum); 012345
        return (
          <span key={index}>
            {stars >= index + 1 ? (
              <IoStar />
            ) : stars >= halfNum ? (
              <IoStarHalf />
            ) : (
              <MdOutlineStarOutline />
            )}
          </span>
        );
      })}
    </>
  );
};

export default Star;
