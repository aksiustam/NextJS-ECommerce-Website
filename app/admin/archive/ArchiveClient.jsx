"use client";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ACategoryTable from "./ACategoryTable";
import ABeltTable from "./ABeltTable";
import AColorTable from "./AColorTable";
import ADressSizeTable from "./ADressSizeTable";
import AShoeSizeTable from "./AShoeSizeTable";
import AGloveTable from "./AGloveTable";
import ASockTable from "./ASockTable";
import ABrandTable from "./ABrandTable";
import AProductTable from "./AProductsTable";
const ArchiveClient = (props) => {
  const { AllCategory, products } = props;
  const { category, brand, color, size } = AllCategory;

  return (
    <div className="row -tw-mt-16">
      <div className="col-lg-12">
        <div className="product_details_tabs">
          <Tabs defaultActiveKey="product" id="uncontrolled-tab-example">
            <Tab eventKey="product" title="Ürünler">
              <AProductTable products={products} />
            </Tab>
            <Tab eventKey="kategori" title="Kategori">
              <ACategoryTable category={category} />
            </Tab>
            <Tab eventKey="brand" title="Çeşit">
              <ABrandTable brand={brand} />
            </Tab>
            <Tab eventKey="color" title="Renk">
              <AColorTable color={color} />
            </Tab>
            <Tab eventKey="dresssize" title="Giysi">
              <ADressSizeTable size={size} />
            </Tab>

            <Tab eventKey="shoesize" title="Ayakkabı">
              <AShoeSizeTable size={size} />
            </Tab>
            <Tab eventKey="glovesize" title="Eldiven">
              <AGloveTable size={size} />
            </Tab>
            <Tab eventKey="beltsize" title="Kemer">
              <ABeltTable size={size} />
            </Tab>
            <Tab eventKey="socksize" title="Çorap">
              <ASockTable size={size} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArchiveClient;
