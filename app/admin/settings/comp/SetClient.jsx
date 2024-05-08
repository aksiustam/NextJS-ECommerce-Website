"use client";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HeaderSet from "./HeaderSet";
import BannerSet from "./Resimler/BannerSet";
import BannerBSet from "./Resimler/BannerBSet";
const SetClient = (props) => {
  const { category, ayarlar } = props;

  return (
    <div className="row -tw-mt-16">
      <div className="col-lg-12">
        <div className="product_details_tabs">
          <Tabs defaultActiveKey="baslik" id="uncontrolled-tab-example">
            <Tab eventKey="baslik" title="Başlıklar">
              <HeaderSet category={category} />
            </Tab>
            <Tab eventKey="resim" title="Resimler">
              <BannerSet settings={ayarlar} />
              <BannerBSet />
            </Tab>
            <Tab eventKey="ayar" title="Mail Ayarlar">
              <div>HEYY</div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SetClient;
