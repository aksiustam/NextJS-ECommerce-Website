import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Switch from "../comp/Switch";
import { FaCheck } from "react-icons/fa";

const SideBar = (props) => {
  const { onFilterChange, allcategory } = props;
  const [sidebar, setSidebar] = useState({
    cat: allcategory.category,
    brand: { id: [], data: [] },
    color: allcategory.color,
    size: allcategory.size.filter((item) => item.name !== "null"),
  });

  const [filter, setFilter] = useState({
    mycat: [],
    mybrand: [],
    mycolor: [],
    mysize: [],
    minPrice: 0,
    maxPrice: 500,
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
      maxprice: filter.maxPrice || 500,
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
      maxPrice: 500,
      bio: false,
      ofg: false,
    });
    setSidebar((prev) => ({
      ...prev,
      brand: { id: [], data: [] },
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="col-lg-3">
        <div className="shop_sidebar_wrapper">
          <div
            className="tw-flex md:tw-hidden tw-justify-center tw-items-center"
            onClick={toggleSidebar}
          >
            <span className="tw-border-t tw-border-solid tw-border-black tw-flex-grow" />
            <span className="tw-py-2 tw-px-5 tw-bg-black tw-text-white tw-rounded-full tw-flex tw-gap-3 tw-items-center">
              Filtrer
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

                        setSidebar((prev) => {
                          let oldid = prev.brand.id;
                          let data = [];

                          if (!item.Brand.find((hey) => hey.name === "null")) {
                            if (oldid.includes(item.id)) {
                              oldid = oldid.filter((data) => data !== item.id);
                            } else {
                              oldid.push(item.id);
                            }
                          }

                          if (oldid.length === 0) {
                            return {
                              ...prev,
                              brand: { id: [], data: [] },
                            };
                          } else {
                            let uniqueData = {};

                            sidebar?.cat?.forEach((filterdata) => {
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
            <p className="tw-font-extrabold tw-pb-4">Types</p>
            {sidebar.brand?.data?.map((item) => {
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
              max={500}
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
                  min={0}
                  max={500}
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
              <div>&</div>
              <div className="tw-relative">
                <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-2 tw-flex tw-items-center">
                  €
                </span>
                <input
                  type="number"
                  id="maxPrice"
                  min={0}
                  max={500}
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
            <div className="product-variable-color tw-gap-2 ">
              {sidebar?.color?.map((item) => (
                <label
                  key={item.id}
                  className={
                    filter?.mycolor?.includes(item.id)
                      ? "tw-ring-[3.5px] tw-ring-stone-300"
                      : "tw-ring-[2px]"
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
                  >
                    <FaCheck className="iconsvg" size={18} color="white" />
                  </span>
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
                {sidebar.size
                  ?.filter((data) => data.SizeType.type === "dress")
                  .map((item, index) => (
                    <label key={index} className="custom_boxed tw-font-bold">
                      {item.name}
                      <input
                        type="checkbox"
                        name="checkbox4"
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            mysize: prev.mysize.includes(item.id)
                              ? prev.mysize.filter(
                                  (sizeId) => sizeId !== item.id
                                )
                              : [...prev.mysize, item.id],
                          }));
                        }}
                        checked={filter?.mysize?.includes(item.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ))}
              </div>
              <div className="tw-border-b tw-border-black tw-my-2" />
              <div className="tw-flex tw-gap-1 tw-flex-wrap">
                {sidebar.size
                  ?.filter((data) => data.SizeType.type === "shoe")
                  .map((item, index) => (
                    <label key={index} className="custom_boxed tw-font-bold">
                      {item.name}
                      <input
                        type="checkbox"
                        name="checkbox4"
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            mysize: prev.mysize.includes(item.id)
                              ? prev.mysize.filter(
                                  (sizeId) => sizeId !== item.id
                                )
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
