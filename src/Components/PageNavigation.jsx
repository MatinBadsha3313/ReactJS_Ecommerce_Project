import { NavLink } from "react-router-dom";

const PageNavigation = ({ name }) => {
  return (
    <div className="d-flex text-warning fs-4 my-3 mx-5">
      <NavLink to="/" className="text-warning ">
        Home
      </NavLink>
      /{name}
    </div>
  );
};

export default PageNavigation;
