import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayProduct from "./DisplayProduct";
import { useProductContext } from "../store/store";
import PageNavigation from "./PageNavigation";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
const API = "https://dummyjson.com/products";
const ProductDetail = () => {
  const [imag, setImag] = useState([]);
  const [singleImg, setSingleImg] = useState();

  const { id } = useParams();
  const {
    singleProduct,
    addToCart,
    singleProductDetails,
    removeFromCart,
    cart,
    relatedProducts,
    getRelatedProduct,
    addHeartFunction,
    removeHeartFunction,
    wish_List,
    isSingleItemLoading,
    isSingleItemError,
  } = useProductContext();

  const singleProductImages = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setImag(data.images);
      setSingleImg(data.images[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRelatedProduct(singleProduct);
    singleProductImages(`${API}/${id}`);
  }, [singleProduct, singleProduct.category]);
  useEffect(() => {
    singleProductDetails(`${API}/${id}`);
  }, [id]);

  if (isSingleItemError) {
    return <div>Error...........</div>;
  } else if (isSingleItemLoading) {
    return (
      <div className="text-center my-5">
        <h1>Loading......</h1>
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <PageNavigation name={singleProduct.title} />
      <div className="position-relative">
        {wish_List.some((elm) => elm.id === singleProduct.id) ? (
          <BsSuitHeartFill
            className="h-icon"
            onClick={() => removeHeartFunction(singleProduct.id)}
          />
        ) : (
          <BsSuitHeart
            className="h-icon"
            onClick={() => addHeartFunction(singleProduct.id)}
          />
        )}
      </div>

      <div className="justify-content-center align-items-center row mx-5 my-3 text-center">
        <div className="grid-four-column">
          {imag.map((elm, index) => {
            return (
              <div
                className={`${
                  elm === singleImg ? "imgDiv_Select" : "imgDiv_Not_Select"
                }`}
                key={index}
              >
                <img
                  src={elm}
                  className="box_image"
                  onClick={() => setSingleImg(elm)}
                />
              </div>
            );
          })}
        </div>
        <div className="w-50 col-lg-6">
          <img src={singleImg} className="w-75" alt={singleProduct.title} />
        </div>

        <div className="col-lg-6">
          <h4 className="mb-4">{singleProduct.title}</h4>
          <p className="mb-4">{singleProduct.description}</p>
          <h6 className="mb-4">₹{singleProduct.price}</h6>
          {cart.some((elm) => elm.id === singleProduct.id) ? (
            <button
              className="btn btn-danger mx-4"
              onClick={() => removeFromCart(singleProduct)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="btn btn-success mx-4"
              onClick={() => addToCart(singleProduct)}
            >
              Add To Cart
            </button>
          )}

          <Link to={`/cart`} className="btn btn-warning">
            Go To Cart
          </Link>
        </div>
      </div>
      <h2 className="text-center">Related Products</h2>
      <hr />

      <DisplayProduct
        items={relatedProducts}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </>
  );
};

export default ProductDetail;
