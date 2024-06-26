"use client";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import ProductCard from "../../components/Products/ProductCard";
import ofgimg from "@/public/assets/img/common/logo-france.png";
import bioimg from "@/public/assets/img/common/bio.png";
import Image from "next/image";
const ShopPage = (props) => {
  const { products, allcategory } = props;

  const [filteredData, setFilteredData] = useState([]);

  const [drawer, setDrawer] = useState("normal");
  const [sort, setSort] = useState("all");

  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    const filterMyProducts = () => {
      const selectedCategories = filteredData?.mycat || [];
      const selectedBrands = filteredData?.mybrand || [];
      const selectedColors = filteredData?.mycolor || [];
      const selectedSizes = filteredData?.mysize || [];

      const minPrice = filteredData?.minprice || 0;
      const maxPrice = filteredData?.maxprice || 500;
      const selectedBio = filteredData?.bio || false;
      const selectedOfg = filteredData?.ofg || false;

      return products.filter((product) => {
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product?.Category?.id);
        const brandMatch =
          selectedBrands.length === 0 ||
          product.Brand.some((brand) => selectedBrands.includes(brand.id));

        const colorSizeMatch = product?.ProductColorSize?.some((colorSize) => {
          const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.includes(colorSize?.Color?.id);

          const sizeMatch =
            selectedSizes.length === 0 ||
            colorSize?.SizeStock?.some((sizeStock) =>
              selectedSizes.includes(sizeStock?.Size?.id)
            );
          return colorMatch && sizeMatch;
        });
        const slugMatch = product.ofg === true ? true : false;

        const priceMatch =
          product.price >= minPrice && product.price <= maxPrice;

        const bioMatch =
          selectedBio === true ? product.bio === selectedBio : true;
        const ofgMatch =
          selectedOfg === true ? product.ofg === selectedOfg : true;

        return (
          slugMatch &&
          categoryMatch &&
          brandMatch &&
          colorSizeMatch &&
          priceMatch &&
          bioMatch &&
          ofgMatch
        );
      });
    };

    const sortMyProducts = (data) => {
      switch (sort) {
        case "low":
          return data.sort(
            (a, b) =>
              (a.indirim ? a.inprice : a.price) -
              (b.indirim ? b.inprice : b.price)
          );
        case "high":
          return data.sort(
            (a, b) =>
              (b.indirim ? b.inprice : b.price) -
              (a.indirim ? a.inprice : a.price)
          );
        case "new":
          return data.filter((item) => item.yeni === true);
        case "all":
          return data;
        default:
          return [];
      }
    };
    const filteredProducts = sortMyProducts(filterMyProducts());

    setFilterProducts(filteredProducts);
  }, [products, filteredData, sort]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filterProducts?.length / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const generatePageGroups = () => {
    const pageGroups = [];
    for (let i = 0; i < totalPages; i += 5) {
      pageGroups.push(pageNumbers.slice(i, i + 5));
    }
    return pageGroups;
  };

  const pageGroups = generatePageGroups();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = pageGroups[currentGroupIndex];

  const goToPreviousGroup = () => {
    setCurrentGroupIndex(Math.max(currentGroupIndex - 1, 0));
  };

  const goToNextGroup = () => {
    setCurrentGroupIndex(
      Math.min(currentGroupIndex + 1, pageGroups.length - 1)
    );
  };

  const calculateIndexRange = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculateIndexRange();

  const pagiProducts = filterProducts.slice(startIndex, endIndex);

  return (
    <>
      <section id="shop_main_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <SideBar
              onFilterChange={setFilteredData}
              allcategory={allcategory}
            />
            <div className="col-lg-9">
              <div className="row tw-justify-center md:tw-justify-end tw-mb-4  tw-mt-6 md:tw-mt-0">
                <div className="tw-flex tw-gap-3">
                  <Image
                    src={bioimg}
                    alt="bio"
                    width={25}
                    height={25}
                    loading="eager"
                    className="tw-w-5 tw-h-5"
                  />
                  <span className="tw-font-bold">Bio</span>
                </div>
                <div className="tw-flex tw-gap-3 tw-ml-4">
                  <Image
                    src={ofgimg}
                    alt="ofg"
                    width={25}
                    height={25}
                    loading="eager"
                    className="tw-w-5 tw-h-5"
                  />
                  <span className="tw-font-bold">Origine France Garantie</span>
                </div>
              </div>
              <div className="row tw-justify-center  md:tw-justify-end tw-mx-2">
                <div className="product_shot">
                  <div className="product_shot_title ">
                    <p className="tw-text-sm lg:tw-text-lg">Trier par :</p>
                  </div>
                  <div className="customs_selects">
                    <select
                      name="product"
                      className="customs_sel_box"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="low">Prix: Croissant</option>
                      <option value="high">Prix: Decroissant</option>
                      <option value="new">Nouveautés</option>
                    </select>
                  </div>
                  <div className="product_shot_view tw-ml-2 tw-hidden md:tw-block">
                    <ul>
                      <li>
                        <i
                          className="fa fa-th-large tw-cursor-pointer"
                          onClick={() => setDrawer("normal")}
                        ></i>
                      </li>
                      <li>
                        <i
                          className="fa fa-th tw-cursor-pointer"
                          onClick={() => setDrawer("short")}
                        ></i>
                      </li>
                    </ul>
                  </div>
                  <div className="product_shot_view tw-ml-2 tw-block md:tw-hidden">
                    <ul>
                      <li>
                        <i
                          className="fa fa-th tw-cursor-pointer"
                          onClick={() => setDrawer("normal")}
                        ></i>
                      </li>
                      <li>
                        <i
                          className="fa fa-th-large tw-cursor-pointer"
                          onClick={() => setDrawer("short")}
                        ></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h1 className="tw-font-bold tw-text-xl tw-hidden">
                    Orjine France Garantie Produits
                  </h1>
                </div>
                {pagiProducts?.map((data) => {
                  if (drawer === "normal")
                    return (
                      <div
                        className="col-lg-4 col-md-4 col-sm-6 col-6 tw-px-1"
                        key={data?.id}
                      >
                        <ProductCard data={data} />
                      </div>
                    );
                  else if (drawer === "short")
                    return (
                      <div
                        className="col-lg-3 col-md-3 col-12 tw-px-1"
                        key={data?.id}
                      >
                        <ProductCard data={data} />
                      </div>
                    );
                  else
                    return (
                      <div
                        className="col-lg-4 col-md-4 col-6 tw-px-1"
                        key={data?.id}
                      >
                        <ProductCard data={data} />
                      </div>
                    );
                })}
                <div className="col-lg-12">
                  <ul className="pagination">
                    {pageNumbers?.length > 1 && (
                      <>
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#!"
                            onClick={goToPreviousGroup}
                            disabled={currentGroupIndex === 0}
                          >
                            &laquo;
                          </a>
                        </li>
                      </>
                    )}
                    {currentGroup?.map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          page === pageNumber ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#!"
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </a>
                      </li>
                    ))}
                    {pageNumbers?.length > 1 && (
                      <>
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#!"
                            onClick={goToNextGroup}
                            disabled={
                              currentGroupIndex === pageGroups.length - 1
                            }
                          >
                            &raquo;
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
