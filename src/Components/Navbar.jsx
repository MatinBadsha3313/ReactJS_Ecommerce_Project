import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useProductContext } from "../store/store";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaHeartCirclePlus } from "react-icons/fa6";

const Navbar = () => {
  const { cart, wish_List } = useProductContext();
  const [searchval, setSearchval] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();

  const searchProducts = (e) => {
    e.preventDefault();
    navigate(`/search/${searchval}`);
    setSearchval("");
  };

  return (
    <>
      <header className="sticky-top">
        {/* Nav Icons */}
        <nav
          className="navbar navbar-expand-lg  container-fluid"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <Link to="/" className="logo">
            E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Nav_Search */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <form className="search-bar" onSubmit={searchProducts}>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchval}
                className="form-control"
                onChange={(e) => setSearchval(e.target.value)}
              />
            </form>
            {/* ----Wish_List_Icon---- */}
            <div className="navbar-nav nav-l  me-auto mb-2 mb-lg-0 ">
              <Link to="/wishlist" className="cart">
                <button
                  type="button"
                  className="btn btn-warning position-relative"
                >
                  <FaHeartCirclePlus className="text-danger" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wish_List.length}
                  </span>
                </button>
              </Link>

              {/* ----Cart_Icon---- */}

              <Link to="/cart" className="cart">
                <button
                  type="button"
                  className="btn btn-success position-relative"
                >
                  <BsFillCartCheckFill />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </nav>
        {/* Header scond row */}
        {/* && location.pathname == `/search/${val}` */}
        {/* {location.pathname == "/" && (
         
        )} */}
      </header>
    </>
  );
};

export default Navbar;
