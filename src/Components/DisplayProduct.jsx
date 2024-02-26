import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductContext } from "../store/store";
import Star from "./Star";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const DisplayProduct = ({ items, addToCart, removeFromCart }) => {
  const {
    cart,
    wish_List,
    addHeartFunction,
    removeHeartFunction,
    isLoading,
    isError,
  } = useProductContext();
  if (isError) {
    return <div>Something Eroor..........</div>;
  } else if (isLoading) {
    return (
      <div className="text-center my-5">
        <h1>Loading......</h1>
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container-fluid my-2 text-center">
        <div className="row border row-cols-xl-3 row-cols-lg-2">
          {items.map((product) => {
            return (
              <div className="my-1" key={product.id}>
                <div className="card" style={{ width: "16rem" }}>
                  {wish_List.some((elm) => elm.id === product.id) ? (
                    <BsSuitHeartFill
                      className="h-icon"
                      onClick={() => removeHeartFunction(product.id)}
                    />
                  ) : (
                    <BsSuitHeart
                      className="h-icon"
                      onClick={() => addHeartFunction(product.id)}
                    />
                  )}

                  <Link to={`/product/${product.id}`} className="">
                    <figure>
                      <img
                        src={product.thumbnail}
                        className="card-img-top"
                        alt={product.title}
                      />
                      {product.rating >= "4.5" ? (
                        <figcaption className="caption">Recomanded</figcaption>
                      ) : (
                        <figcaption className="caption">
                          {product.rating}
                        </figcaption>
                      )}
                    </figure>
                  </Link>
                  <div className="card-body">
                    <div>
                      <Star stars={product.rating} />
                    </div>
                    <h5 className="card-title">
                      {product.title.toUpperCase()}
                    </h5>
                    <p className="card-text">{product.description}</p>
                    <h6>
                      ₹{product.price} |{" "}
                      <span className="text-decoration-line-through">
                        ₹{product.discountPercentage}
                      </span>
                    </h6>
                    {cart.some((elm) => elm.id === product.id) ? (
                      <button
                        className="btn btn-danger mx-4"
                        onClick={() => removeFromCart(product)}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayProduct;
