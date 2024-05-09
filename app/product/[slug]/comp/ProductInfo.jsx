"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ProductInfo = (props) => {
  const { product } = props;

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="product_details_tabs">
            <Tabs defaultActiveKey="description" id="uncontrolled-tab-example">
              <Tab eventKey="description" title="Caractéristiques">
                <div id="description" className="tab-pane fade in show active">
                  <div
                    className="product_description"
                    dangerouslySetInnerHTML={{ __html: product.quill }}
                  />
                </div>
              </Tab>
              <Tab eventKey="additional" title="Livraison & Retours">
                <div className="product_additional">
                  <ul className="tw-pl-5 tw-pt-5">
                    <li className="tw-list-disc">
                      Les livraisons standard s'effectuent habituellement sous 3
                      à 5
                    </li>
                    <li className="tw-list-disc">
                      Les retours sont toujours gratuits
                    </li>
                  </ul>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
