import { useProductContext } from "../store/store";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Cart = () => {
  const { cart, removeFromCart, clearAllCart } = useProductContext();

  const totalPrice = cart.reduce((accum, current) => {
    return accum + current.price;
  }, 0);
  const totalDiscount = cart.reduce((accum, current) => {
    return accum + current.discountPercentage;
  }, 0);

  const fees = cart.length * 3;
  return (
    <>
      {cart.length == 0 ? (
        <div className="text-center my-5">
          <h1>Your Cart is Empty</h1>
          <Link to="/" className="btn btn-warning my-3">
            Continue Shopping...
          </Link>
        </div>
      ) : (
        cart.map((product) => {
          return (
            <div
              className="justify-content-center align-items-center row mx-5 my-4 text-center border border-light-subtle position-relative"
              key={product.id}
            >
              <Link to={`/product/${product.id}`} className="w-50 col-6">
                <img src={product.thumbnail} className="w-25" alt="..." />
              </Link>

              <div className="col-6">
                <RxCross1
                  className="cross text-danger"
                  onClick={() => removeFromCart(product)}
                />
                <h5 className="mb-4">{product.title}</h5>
                <h6>₹{product.price}</h6>
                <h6>stock {product.stock}</h6>

                <button
                  className="btn btn-primary mx-4 mb-2"
                  onClick={() => alert("Thank You For The Order!")}
                >
                  Place Order
                </button>
              </div>
            </div>
          );
        })
      )}
      {cart.length === 0 ? (
        ""
      ) : (
        <>
          <div className="d-flex justify-content-between align-content-center mx-5 my-1 ">
            <Link to="/">
              <button className="btn btn-outline-success">
                Continue Shopping
              </button>
            </Link>
            <button className="btn btn-danger" onClick={clearAllCart}>
              Clear All Cart
            </button>
          </div>
          <div
            // className=" row row-cols-2  justify-content-center align-items-center"
            className="container-xl mx-auto p-2 w-50 border border-danger"
          >
            <h5 className="text-center">PRICE DETAILS</h5>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-medium">Total Items</p>
                <p>Total MRP</p>
                <p>Total Discount MRP</p>
                <p>Convenience Fee</p>
              </div>
              <div>
                <p className="fw-medium">{cart.length}</p>
                <p>₹{totalPrice}</p>
                <p>₹{totalDiscount.toFixed(2)}</p>
                <p>₹{fees}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h6>TOTAL AMOUNT</h6>
              <h6>₹{totalPrice - totalDiscount + fees}</h6>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
