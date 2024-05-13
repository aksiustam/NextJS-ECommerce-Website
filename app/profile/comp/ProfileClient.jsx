import { ImBoxAdd } from "react-icons/im";
import Link from "next/link";

const ProfileClient = (props) => {
  const { user } = props;
  const sipdata = user?.Siparis || null;
  return (
    <>
      <div className="myaccount-content">
        <h4 className="title">Mes Commandes </h4>
        <div className="row tw-pl-4">
          {sipdata
            ?.sort((a, b) => b?.id - a?.id)
            .map((item) => {
              const createdAt = item?.createdAt;
              const date = new Date(createdAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = date.toLocaleDateString("fr-FR", options);

              return (
                <>
                  <div
                    className="col-sm-12 col-md-12 col-lg-12 col-12 tw-px-0 tw-mb-3 tw-text-sm tw-block md:tw-hidden"
                    key={item?.id}
                  >
                    <div className="tw-flex tw-flex-row tw-gap-2  tw-border-2 tw-py-4 tw-border-black">
                      <div className="tw-flex tw-items-center tw-justify-center  tw-py-1 tw-px-3 ">
                        <ImBoxAdd size={33} />
                      </div>
                      <div className="tw-flex tw-flex-col tw-justify-between tw-gap-1">
                        <div className="tw-flex tw-flex-col tw-whitespace-nowrap">
                          <span className="tw-font-bold">#{item?.id}</span>{" "}
                          <span>{formattedDate}</span>
                        </div>
                        <Link
                          href={`/profile/order/${item?.id}`}
                          className="tw-underline tw-cursor-pointer tw-font-bold"
                        >
                          Voir en détail
                        </Link>
                      </div>
                      <div className="tw-ml-auto tw-flex tw-flex-col tw-justify-between tw-text-right tw-mr-2">
                        <span className="tw-text-red-600 tw-font-bold">
                          {item?.amount.toFixed(2)}€
                        </span>{" "}
                        {item?.status === "paid" && (
                          <span className="badge badge-info">
                            En cours de traitement
                          </span>
                        )}
                        {item?.status === "send" && (
                          <span className="badge badge-success">Envoyée</span>
                        )}
                        {item?.status === "error" && (
                          <span className="badge badge-danger tw-whitespace-normal tw-w-28 tw-ml-4">
                            Erreur Consultez votre mail
                          </span>
                        )}
                        <a
                          href={
                            item?.shipping?.name === "colissimo"
                              ? ``
                              : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${item?.kargono}&langue=fr`
                          }
                          className="tw-underline tw-cursor-pointer tw-text-green-600 tw-font-bold"
                        >
                          SUIVRE MON COLIS
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-sm-12 col-md-12 col-lg-12 col-12  tw-mb-3 tw-text-sm tw-hidden md:tw-block"
                    key={item?.id}
                  >
                    <div className="tw-flex tw-flex-row tw-gap-6 tw-max-w-[510px] tw-border-2 tw-p-4 tw-border-black">
                      <div className="tw-flex tw-items-center tw-justify-center  tw-py-3 tw-px-6 ">
                        <ImBoxAdd size={55} />
                      </div>

                      <div className="tw-flex tw-flex-col tw-justify-between tw-gap-2">
                        <div className="tw-flex tw-flex-col tw-whitespace-nowrap">
                          <span className="tw-font-bold">#{item?.id}</span>{" "}
                          <span>{formattedDate}</span>
                        </div>
                        <Link
                          href={`/profile/order/${item?.id}`}
                          className="tw-underline tw-cursor-pointer tw-font-bold"
                        >
                          Voir en détail
                        </Link>
                      </div>
                      <div className="tw-ml-auto tw-flex tw-flex-col tw-justify-between tw-text-right">
                        <span className="tw-text-red-600 tw-font-bold">
                          {item?.amount.toFixed(2)}€
                        </span>{" "}
                        {item?.status === "paid" && (
                          <span className="badge badge-info">
                            En cours de traitement
                          </span>
                        )}
                        {item?.status === "send" && (
                          <span className="badge badge-success">Envoyée</span>
                        )}
                        {item?.status === "error" && (
                          <span className="badge badge-danger">
                            {item?.error !== "null"
                              ? item?.error
                              : "Erreur Consultez votre mail"}
                          </span>
                        )}
                        <a
                          href={
                            item?.shipping?.name === "colissimo"
                              ? ``
                              : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${
                                  item?.kargono || ""
                                }&langue=fr`
                          }
                          className="tw-underline tw-cursor-pointer tw-text-green-600 tw-font-bold"
                        >
                          SUIVRE MON COLIS
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProfileClient;
