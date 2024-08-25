"use client";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HeaderSet from "./HeaderSet";
import BannerSet from "./Resimler/BannerSet";
import BannerBSet from "./Resimler/BannerBSet";
import BannerB1Set from "./Resimler/BannerB1Set";
import BannerB2Set from "./Resimler/BannerB2Set";

import SettingsClient from "./SettingsClient";
import { Accordion } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import Trendler from "./Resimler/Trendler";
import TrendlerTwo from "./Resimler/TrendlerTwo";
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
              <Accordion defaultActiveKey="-1">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="tw-bg-slate-100 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Banner Ayarı <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <BannerSet settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="tw-bg-slate-200 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Video Ayarı <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <BannerBSet settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="tw-bg-slate-200 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Trendler Ayarı <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <Trendler settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="tw-bg-slate-200 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Trendler-2 Ayarı
                      <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <TrendlerTwo settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header className="tw-bg-slate-300 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Resim-1 Ayarı <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <BannerB1Set settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="tw-bg-slate-400 tw-pl-4">
                    <div className="tw-flex tw-justify-start tw-items-center">
                      Resim-2 Ayarı <IoIosArrowDown size={21} color="black" />
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <BannerB2Set settings={ayarlar} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
            <Tab eventKey="ayar" title="Ayarlar">
              <SettingsClient settings={ayarlar} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SetClient;
