import React, { useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../Home/Heading";
import { getProducts } from "../../../redux/productSlice";
const RelatedProduct = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <section id="related_product" className="pb-100">
        <div className="container">
          <Heading heading="Produits similaires" />
          <div className="row">
            {products.slice(0, 4).map((data, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-6 tw-px-1"
                key={index}
              >
                <ProductCard data={data} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProduct;
