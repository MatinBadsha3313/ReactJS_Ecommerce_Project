import React from "react";
import { useProductContext } from "../store/store";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Star from "./Star";

const Wishlist = () => {
  const { wish_List, cart, removeFromCart, addToCart, removeHeartFunction } =
    useProductContext();
  return (
    <>
      {wish_List.length === 0 ? (
        <div
          className="card text-center mx-auto my-2"
          style={{ width: "50vw" }}
        >
          <div className="card-body">
            <h5 className="card-title">Sorry You Have No Wish List.</h5>

            <Link to="/" className="btn btn-warning">
              Go To Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-center fs-4 text-body-secondary">
            {" "}
            Wish List Items ({wish_List.length})
          </p>
          {wish_List.map((product) => {
            return (
              <div className="my-1" key={product.id}>
                <div className="card mb-3" style={{ width: "80vw" }}>
                  <div className="row g-0">
                    <div className="col-4">
                      <Link to={`/product/${product.id}`} className="">
                        <figure>
                          <img
                            src={product.thumbnail}
                            className="img-fluid rounded-start"
                            alt={product.title}
                          />
                        </figure>
                      </Link>
                    </div>
                    <div className="col-8">
                      <RxCross1
                        className="cross"
                        onClick={() => removeHeartFunction(product.id)}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <h6>₹{product.price}</h6>
                        <div className="mb-3">
                          <Star stars={product.rating} />
                        </div>
                        {cart.some((elm) => elm.id === product.id) ? (
                          <button
                            className="btn btn-danger"
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
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Wishlist;
