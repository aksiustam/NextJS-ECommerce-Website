import { ImBoxAdd } from "react-icons/im";
const OrderClient = (props) => {
  const { user, id } = props;

  const sipdata = user.Siparis.find((item) => item.id === parseInt(id));

  const createdAt = sipdata?.createdAt;
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("fr-FR", options);

  const getCountryFullName = (countryCode) => {
    const countryData = {
      DE: "Allemagne",
      AT: "Autriche",
      BE: "Belgique",
      BG: "Bulgarie",
      CY: "Chypre",
      HR: "Croatie",
      DK: "Danemark",
      ES: "Espagne",
      EE: "Estonie",
      FI: "Finlande",
      FR: "France",
      GR: "Grèce",
      HU: "Hongrie",
      IE: "Irlande",
      IT: "Italie",
      LV: "Lettonie",
      LT: "Lituanie",
      LU: "Luxembourg",
      MT: "Malte",
      NL: "Pays-Bas",
      PL: "Pologne",
      PT: "Portugal",
      CZ: "République tchèque",
      RO: "Roumanie",
      SK: "Slovaquie",
      SI: "Slovénie",
      SE: "Suède",
      TR: "Turquie",
    };

    return countryData[countryCode] || "Ülke bulunamadı";
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-12">
          <h4>Détails de ma commande</h4>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3 tw-text-sm tw-block md:tw-hidden">
          <div className="tw-flex tw-flex-row tw-gap-2  tw-border-2 tw-py-4 tw-border-black">
            <div className="tw-flex tw-items-center tw-justify-center  tw-py-1 tw-px-3 ">
              <ImBoxAdd size={33} />
            </div>
            <div className="tw-flex tw-flex-col tw-justify-evenly tw-gap-1 tw-whitespace-nowrap">
              <span className="tw-font-bold">#{sipdata?.id}</span>{" "}
              <span>{formattedDate}</span>
            </div>

            <div className="tw-ml-auto tw-flex tw-flex-col tw-justify-between tw-text-right tw-mr-2">
              <span className="tw-text-red-600 tw-font-bold">
                {sipdata?.amount?.toFixed(2)}€
              </span>{" "}
              {sipdata?.status === "paid" && (
                <span className="badge badge-info">En cours de traitement</span>
              )}
              {sipdata?.status === "send" && (
                <span className="badge badge-success">Envoyée</span>
              )}
              {sipdata?.status === "error" && (
                <span className="badge badge-danger tw-whitespace-normal tw-w-28 tw-ml-4">
                  {sipdata?.error !== "null"
                    ? sipdata?.error
                    : "Erreur Consultez votre mail"}
                </span>
              )}
              <a
                href={
                  sipdata?.shipping?.name === "colissimo"
                    ? ``
                    : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${
                        sipdata?.kargono || ""
                      }&langue=fr`
                }
                className="tw-underline tw-cursor-pointer tw-text-green-600 tw-font-bold"
              >
                SUIVRE MON COLIS
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3 tw-text-sm tw-hidden md:tw-block">
          <div className="tw-flex tw-flex-row tw-gap-6 tw-w-[510px] tw-border-2 tw-p-4 tw-border-black">
            <div className="tw-flex tw-items-center tw-justify-center  tw-py-3 tw-px-6 ">
              <ImBoxAdd size={55} />
            </div>
            <div className="tw-flex tw-flex-col tw-justify-evenly tw-gap-2 tw-whitespace-nowrap">
              <span className="tw-font-bold">#{sipdata?.id}</span>{" "}
              <span>{formattedDate}</span>
            </div>
            <div className="tw-ml-auto tw-flex tw-flex-col tw-justify-evenly tw-text-right">
              <span className="tw-text-red-600 tw-font-bold">
                {sipdata?.amount?.toFixed(2)}€
              </span>{" "}
              {sipdata?.status === "paid" && (
                <span className="badge badge-info">En cours de traitement</span>
              )}
              {sipdata?.status === "send" && (
                <span className="badge badge-success">Envoyée</span>
              )}
              {sipdata?.status === "error" && (
                <span className="badge badge-danger">
                  {sipdata?.error !== "null"
                    ? sipdata?.error
                    : "Erreur Consultez votre mail"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3">
          <button className="btn btn-success theme_btn_one tw-py-3 tw-font-bold">
            <a
              href={
                sipdata?.shipping?.name === "colissimo"
                  ? ``
                  : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${
                      sipdata?.kargono || ""
                    }&langue=fr`
              }
              className="hover:tw-text-white"
            >
              SUIVRE MON COLIS
            </a>
          </button>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3">
          <h4 className="tw-font-bold">Livraison</h4>
          <div className="tw-flex tw-max-w-[510px] tw-bg-slate-300 tw-p-4 tw-text-sm tw-whitespace-nowrap">
            <ul className="tw-ml-4">
              <li>
                {sipdata?.sendadress?.firstName}
                {sipdata?.sendadress?.lastName}
              </li>
              <li>{sipdata?.sendadress?.phoneNumber}</li>
              <li>{sipdata?.sendadress?.address}</li>
              <li>
                {sipdata?.sendadress?.city} {sipdata?.sendadress?.zipCode}
              </li>
              <li>{getCountryFullName(sipdata?.sendadress?.country)}</li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3">
          <h4 className="tw-font-bold">Détail de votre commande</h4>
          <div className="tw-flex tw-flex-col tw-max-w-[510px] tw-bg-slate-50 tw-p-4  tw-whitespace-nowrap">
            {sipdata?.basket?.map((item) => {
              return (
                <ul
                  className="tw-border-b-2 tw-border-stone-300"
                  key={item?.id}
                >
                  <li>
                    <span className="tw-font-bold">Nom du produit :</span>{" "}
                    {item?.name} {item?.color}{" "}
                    {item?.size === "null" ? "" : item?.size}
                  </li>
                  <li>
                    <span className="tw-font-bold">Nombre D’article :</span>{" "}
                    {item?.quantity}
                  </li>
                  <li>
                    <span className="tw-font-bold">Prix Total :</span>{" "}
                    {(item?.price * item?.quantity).toFixed(2)}€
                  </li>
                </ul>
              );
            })}
            <ul>
              <li>
                <span className="tw-font-bold">Expédition :</span>{" "}
                <span>
                  {sipdata?.shipping?.name}- {sipdata?.shipping?.price}
                </span>
              </li>
              <li>
                <span className="tw-font-bold">TOTAL :</span>{" "}
                <span className="tw-font-bold">
                  {sipdata?.amount?.toFixed(2)}€
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderClient;
