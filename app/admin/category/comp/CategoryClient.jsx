"use client";
import CategoryTable from "./CategoryTable";
import BrandTable from "./BrandTable";
import ColorTable from "./ColorTable";
import DressSizeTable from "./DressSizeTable";
import ShoeSizeTable from "./ShoeSizeTable";
import SizeTypeTable from "./SizeTypeTable";
import CatTypeTable from "./CatTypeTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GloveTable from "./GloveTable";
import BeltTable from "./BeltTable";
import SockTable from "./SockTable";
const CategoryClient = (props) => {
  const { AllCategory } = props;
  const { category, brand, color, size, sizetype, cattype } = AllCategory;

  return (
    <div className="row -tw-mt-16">
      <div className="col-lg-12">
        <div className="product_details_tabs">
          <Tabs defaultActiveKey="kategori" id="uncontrolled-tab-example">
            <Tab eventKey="kategori" title="Kategori">
              <CategoryTable
                category={category}
                brand={brand}
                sizetype={sizetype}
                cattype={cattype}
              />
            </Tab>
            <Tab eventKey="brand" title="Çeşit">
              <BrandTable brand={brand} />
            </Tab>
            <Tab eventKey="color" title="Renk">
              <ColorTable color={color} />
            </Tab>
            <Tab eventKey="dresssize" title="Giysi">
              <DressSizeTable size={size} />
            </Tab>

            <Tab eventKey="shoesize" title="Ayakkabı">
              <ShoeSizeTable size={size} />
            </Tab>
            <Tab eventKey="glovesize" title="Eldiven">
              <GloveTable size={size} />
            </Tab>
            <Tab eventKey="beltsize" title="Kemer">
              <BeltTable size={size} />
            </Tab>
            <Tab eventKey="socksize" title="Çorap">
              <SockTable size={size} />
            </Tab>

            <Tab eventKey="sizetype" title="Boyutlar">
              <SizeTypeTable sizetype={sizetype} />
            </Tab>
            <Tab eventKey="cattype" title="Gruplar">
              <CatTypeTable cattype={cattype} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CategoryClient;
