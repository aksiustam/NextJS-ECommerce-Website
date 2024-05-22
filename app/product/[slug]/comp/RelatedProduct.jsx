"use client";
import ProductCard from "@/app/components/Products/ProductCard";

const RelatedProduct = (props) => {
  const { products } = props;
  return (
    <>
      <section id="related_product" className="pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="center_heading">
                <h2 className="tw-bg-gray-300 tw-capitalize tw-rounded-full">
                  Produits similaires
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {products.slice(0, 4).map((data) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-6 tw-px-1"
                key={data.id}
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
