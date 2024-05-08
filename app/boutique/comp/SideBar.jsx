"use client";

import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Switch from "./Switch";

const SideBar = (props) => {
  const { onFilterChange, searchProduct, allcategory } = props;
  const [count, setCount] = useState(0);

  const [sidebar, setSidebar] = useState(null);
  useEffect(() => {
    const initialSidebarState = {
      cat: allcategory.category.filter(
        (item) => item.SizeType.name === searchProduct
      ),
      brand: { id: [], data: [] },
      color: allcategory.color,
      size: allcategory.size.filter(
        (item) => item.SizeType.name === searchProduct
      ),
    };

    if (sidebar === null) setSidebar(initialSidebarState);
  }, []);
  const [filter, setFilter] = useState({
    mycat: [],
    mybrand: [],
    mycolor: [],
    mysize: [],
    minPrice: 0,
    maxPrice: 3000,
    bio: false,
    ofg: false,
  });

  useEffect(() => {
    onFilterChange({
      mycat: filter.mycat || [],
      mybrand: filter.mybrand || [],
      mycolor: filter.mycolor || [],
      mysize: filter.mysize || [],
      minprice: filter.minPrice || 0,
      maxprice: filter.maxPrice || 3000,
      bio: filter.bio,
      ofg: filter.ofg,
    });
  }, [onFilterChange, filter]);

  const clearFilter = () => {
    setFilter({
      mycat: [],
      mybrand: [],
      mycolor: [],
      mysize: [],
      minPrice: 0,
      maxPrice: 3000,
      bio: false,
      ofg: false,
    });
    setSidebar((prev) => ({
      ...prev,
      brand: { id: [], data: [] },
    }));
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  console.log(sidebar?.brand);
  return (
    <>
      <div className="col-lg-3 ">
        <div className="shop_sidebar_wrapper">
          <div
            className="tw-flex md:tw-hidden tw-justify-center tw-items-center"
            onClick={toggleSidebar}
          >
            <span className="tw-border-t tw-border-solid tw-border-black tw-flex-grow" />
            <span className="tw-py-2 tw-px-5 tw-bg-black tw-text-white tw-rounded-full tw-flex tw-gap-3 tw-items-center">
              Trier Par
              <i className="fa fa-caret-down"></i>
            </span>

            <span className="tw-border-t tw-border-solid tw-border-black tw-flex-grow " />
          </div>
          <div
            className={`shop_sidebar_boxed ${
              isSidebarOpen ? "tw-block" : "tw-hidden"
            }`}
          >
            <div className="tw-flex tw-justify-between tw-items-center ">
              <p className="tw-font-extrabold">Catégories</p>
              <button
                className="theme-btn-one bg-black btn_sm tw-mb-8"
                onClick={() => clearFilter()}
              >
                Réinitialiser
              </button>
            </div>
            <div className={`tw-max-h-[185px] tw-overflow-y-scroll `}>
              {sidebar?.cat?.map((item) => {
                return (
                  <label key={item?.id} className="custom_boxed tw-font-bold">
                    {item?.name}
                    <input
                      type="checkbox"
                      name="checkbox1"
                      onChange={() => {
                        setFilter((prev) => ({
                          ...prev,
                          mycat: Array.isArray(prev.mycat)
                            ? prev.mycat.includes(item.id)
                              ? prev.mycat.filter((catId) => catId !== item.id)
                              : [...prev.mycat, item.id]
                            : [item.id],
                          mybrand: [],
                        }));

                        console.log("HEYY");

                        setSidebar((prev) => {
                          let oldid = prev.brand.id;
                          let data = [];
                          console.log(oldid);
                          if (!item.Brand.find((hey) => hey.name === "null")) {
                            if (oldid.includes(item.id)) {
                              oldid = oldid.filter((data) => data !== item.id);
                            } else {
                              oldid.push(item.id);
                            }
                          }
                          console.log(oldid);
                          if (oldid.length === 0) {
                            return {
                              ...prev,
                              brand: { id: [], data: [] },
                            };
                          } else {
                            let uniqueData = {};

                            prev?.cat?.forEach((filterdata) => {
                              if (oldid.includes(filterdata.id)) {
                                filterdata.Brand.forEach(
                                  (item) => (uniqueData[item.id] = item)
                                );
                              }
                            });

                            data = Object.values(uniqueData);

                            return {
                              ...prev,
                              brand: { id: oldid, data: data },
                            };
                          }
                        });
                      }}
                      checked={filter?.mycat?.includes(item?.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div
            className={`shop_sidebar_boxed ${
              isSidebarOpen ? "tw-block" : "tw-hidden"
            }`}
          >
            <p className="tw-font-extrabold">Types</p>
            {sidebar?.brand?.data?.map((item) => {
              return (
                <label key={item?.id} className="custom_boxed tw-font-bold">
                  {item?.name}
                  <input
                    type="checkbox"
                    name="checkbox2"
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        mybrand: Array.isArray(prev.mybrand)
                          ? prev.mybrand.includes(item.id)
                            ? prev.mybrand.filter((catId) => catId !== item.id)
                            : [...prev.mybrand, item.id]
                          : [item.id],
                      }));
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </div>
          <div
            className={`shop_sidebar_boxed ${
              isSidebarOpen ? "tw-block" : "tw-hidden"
            }`}
          >
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-3 tw-mb-4">
              <Switch
                value={filter?.bio}
                handleCheckChange={() =>
                  setFilter((prev) => ({
                    ...prev,
                    bio: !filter.bio,
                  }))
                }
              />
              <span className="tw-pb-2 tw-font-bold">Bio</span>
            </div>
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-3 tw-mb-4">
              <Switch
                value={filter?.ofg}
                handleCheckChange={() =>
                  setFilter((prev) => ({
                    ...prev,
                    ofg: !filter.ofg,
                  }))
                }
              />
              <span className="tw-pb-2 tw-font-bold">
                Origine France Garantie
              </span>
            </div>

            <RangeSlider
              min={0}
              max={3000}
              value={[filter?.minPrice, filter?.maxPrice]}
              onInput={(values) => {
                setFilter((prev) => ({
                  ...prev,
                  minPrice: values[0],
                  maxPrice: values[1],
                }));
              }}
            />

            <div className="tw-flex tw-justify-center tw-items-center tw-mt-4 tw-gap-3 ">
              <div className="tw-relative">
                <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-2 tw-flex tw-items-center">
                  €
                </span>
                <input
                  type="number"
                  id="minPrice"
                  value={filter?.minPrice}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className="tw-pl-8 tw-pr-4 tw-py-1 tw-border tw-rounded-md tw-w-28"
                />
              </div>
              <div>ve</div>
              <div className="tw-relative">
                <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-2 tw-flex tw-items-center">
                  €
                </span>
                <input
                  type="number"
                  id="maxPrice"
                  value={filter?.maxPrice}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className="tw-pl-8 tw-pr-4 tw-py-1 tw-border tw-rounded-md tw-w-28"
                />
              </div>
            </div>
          </div>

          <div
            className={`shop_sidebar_boxed ${
              isSidebarOpen ? "tw-block" : "tw-hidden"
            }`}
          >
            <p className="tw-font-extrabold tw-mb-4">Couleur</p>
            <div className="product-variable-color">
              {sidebar?.color?.map((item) => (
                <label
                  key={item.id}
                  className={
                    filter?.mycolor?.includes(item.id)
                      ? "tw-border-[3.5px] tw-border-stone-300"
                      : "tw-border-[2px]"
                  }
                >
                  <input
                    name="checkbox3"
                    className="color-select"
                    type="checkbox"
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        mycolor: prev.mycolor.includes(item.id)
                          ? prev.mycolor.filter(
                              (colorId) => colorId !== item.id
                            )
                          : [...prev.mycolor, item.id],
                      }));
                    }}
                  />
                  <span
                    style={{
                      backgroundColor: item.hex,
                    }}
                  ></span>
                </label>
              ))}
            </div>
          </div>
          <div
            className={`shop_sidebar_boxed ${
              isSidebarOpen ? "tw-block tw-mb-5" : "tw-hidden"
            }`}
          >
            <div id="sizes_input">
              <p className="tw-font-extrabold tw-mb-3">Taille</p>
              <div className="tw-flex tw-gap-1 tw-flex-wrap">
                {sidebar?.size?.map((item) => (
                  <label key={item.id} className="custom_boxed tw-font-bold">
                    {item.name}
                    <input
                      type="checkbox"
                      name="checkbox4"
                      onChange={() => {
                        setFilter((prev) => ({
                          ...prev,
                          mysize: prev.mysize.includes(item.id)
                            ? prev.mysize.filter((sizeId) => sizeId !== item.id)
                            : [...prev.mysize, item.id],
                        }));
                      }}
                      checked={filter?.mysize?.includes(item.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
