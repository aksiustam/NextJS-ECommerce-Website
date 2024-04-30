
import { GiBoxUnpacking } from "react-icons/gi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


const Feature = () => {
  return (
    <>
      <section
        id="service_promo_area"
        className="tw-py-3 tw-hidden md:tw-block"
        style={{ backgroundColor: "#E4E4E4" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="service_promo_single_item">
                <div className="service_prom_image tw-mr-2">
                  <GiBoxUnpacking size={33} />
                </div>
                <div className="service_prom_content ">
                  <h5 className="tw-text-sm tw-font-bold">
                    Retour offert sous 14 jours
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="service_promo_single_item ">
                <div className="service_prom_image tw-mr-2">
                  <LiaShippingFastSolid size={33} />
                </div>
                <div className="service_prom_content ">
                  <h5 className="tw-text-sm tw-font-bold">
                    Livraison Offerte dés 100€
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="service_promo_single_item">
                <div className="service_prom_image tw-mr-2">
                  <IoShieldCheckmarkOutline size={33} />
                </div>
                <div className="service_prom_content ">
                  <h5 className="tw-text-sm tw-font-bold">
                    Paiement en ligne sécurisé
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service_promo_area"
        className="tw-py-3 tw-block md:tw-hidden"
        style={{ backgroundColor: "#E4E4E4" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-4">
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
                <GiBoxUnpacking size={33} />
                <h5 className="tw-text-[10px] tw-text-center tw-font-bold">
                  Retour offert sous 14 jours
                </h5>
              </div>
            </div>
            <div className="col-sm-4 col-4">
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
                <LiaShippingFastSolid size={33} />

                <h5 className="tw-text-[10px] tw-text-center tw-font-bold">
                  Livraison Offerte dés 100€
                </h5>
              </div>
            </div>
            <div className="col-sm-4 col-4">
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
                <IoShieldCheckmarkOutline size={33} />

                <h5 className="tw-text-[10px] tw-text-center tw-font-bold">
                  Paiement en ligne sécurisé
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
