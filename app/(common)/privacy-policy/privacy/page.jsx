import MenuData from "../../../components/Layout/Header/MenuData";

import Header from "../../../components/Layout/Header";
import Banner from "../../../components/Layout/Banner/Banner";
import Footer from "../../../components/Layout/Footer";
import Image from "next/image";

const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Politique De Confidentialité" />
      <main>
        <section id="privacy-policy_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12 tw-flex tw-justify-start tw-mb-12">
                <Image
                  src={"/img/nilrio-logo.png"}
                  width={1000}
                  height={500}
                  alt="Nilrio Logo"
                  className="tw-w-64 tw-h-auto"
                />
              </div>
              <div className="col-12">
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">
                  POLITIQUE DE CONFIDENTIALITÉ
                </h1>
                <span className="tw-text-sm">Table des matières</span>
                <div className="tw-flex tw-flex-col tw-mt-2 tw-mb-8">
                  <a href="#PRÉAMBULE" className="tw-underline">
                    PRÉAMBULE
                  </a>
                  <a href="#DÉFINITIONS" className="tw-underline">
                    DÉFINITIONS
                  </a>
                  <a href="#IDENTITÉ" className="tw-underline">
                    IDENTITÉ DU RESPONSABLE DE TRAITEMENT
                  </a>
                  <a href="#DONNÉES" className="tw-underline">
                    DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES
                  </a>
                  <a href="#FINALITÉ" className="tw-underline">
                    FINALITÉ ET BASES LÉGALES DES TRAITEMENTS DE DONNÉES
                  </a>
                  <a href="#DESTINAIRES" className="tw-underline">
                    DESTINAIRES DES DONNÉES
                  </a>
                  <a href="#TRANSFERT" className="tw-underline">
                    TRANSFERT HORS DE L’UNION EUROPEENNE
                  </a>
                  <a href="#DURÉE" className="tw-underline">
                    DURÉE DE CONSERVATION DES DONNÉES
                  </a>
                  <a href="#DROITS" className="tw-underline">
                    DROITS DES UTILISATEURS
                  </a>
                  <a href="#MODALITÉS" className="tw-underline">
                    MODALITÉS D’EXERCICE DES DROITS
                  </a>
                  <a href="#SÉCURITÉ" className="tw-underline">
                    SÉCURITÉ DES DONNÉES
                  </a>
                  <a href="#MODIFICATIONS" className="tw-underline">
                    MODIFICATIONS
                  </a>
                </div>
                <div id="PRÉAMBULE" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">PRÉAMBULE</h2>
                  <p className="tw-text-sm tw-mb-2">
                    Dans le cadre de son activité de vente au détail d’articles
                    vestimentaires, ISPA met en œuvre des Traitements de Données
                    à caractère personnel concernant les utilisateurs du site
                    accessible à l’URL{" "}
                    <a
                      href="https://nilrio.com"
                      className="tw-underline tw-text-blue-600 tw-font-bold"
                    >
                      https://nilrio.com
                    </a>{" "}
                    (ci-après «<strong>lesUtilisateurs</strong>» et «
                    <strong>leSite</strong> »).{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA accorde une importance particulière à la protection des
                    données à caractère personnel. À ce titre, ISPA veille à ce
                    que les données des utilisateurs soient collectées et
                    traitées conformément aux lois et règlements en vigueur
                    relatifs à la protection des données à caractère personnel,
                    et notamment au Règlement (UE) 2016/679 du 27 avril 2016,
                    relatif à la protection des personnes physiques à
                    l&apos;égard du traitement des données à caractère personnel
                    et à la libre circulation de ces données (ci-après « le{" "}
                    <strong>RGPD</strong> ») ainsi qu’à la loi n°78-17 du 6
                    janvier 1978 relative à l’informatique, aux fichiers et aux
                    libertés, telle que modifiée par la loi n°2018-493 du 20
                    juin 2018.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    La présente politique (ci-après la «{" "}
                    <strong>Politique</strong> ») a pour but d’informer les
                    Utilisateurs sur la manière dont ISPA collecte, utilise et
                    partage les données à caractère personnel que ses
                    Utilisateurs lui fournissent via le Site.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Cette Politique a vocation à s’appliquer uniquement aux
                    traitements portant sur des données susceptibles
                    d’identifier ou de rendre identifiables des personnes
                    physiques, directement ou indirectement.
                  </p>

                  <p className="tw-text-sm tw-mb-2">
                    Avant d’accéder aux services proposés par ISPA,
                    l’Utilisateur est invité à prendre pleinement connaissance
                    des dispositions ci-dessous.
                  </p>
                </div>
                <div id="DÉFINITIONS" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    DÉFINITIONS
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    Les termes indiqués ci-dessous ont la définition suivante :{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    « <strong>Données à caractère personnel</strong> » ou «{" "}
                    <strong>Données</strong> » désignent toute information
                    permettant d’identifier directement ou indirectement une
                    personne physique ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    « <strong>Responsable de traitement</strong> » désigne toute
                    personne physique ou morale qui détermine les finalités et
                    les moyens des traitements des Données à caractère
                    personnel, en l’occurrence ISPA ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    « <strong>Sous-traitant</strong> » désigne la personne
                    physique ou morale en charge de traiter des Données à
                    caractère personnel pour le compte du Responsable de
                    traitement dans le cadre d’un service ou d’une prestation ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    « <strong>Traitements</strong> » désigne toute opération
                    portant sur des Données à caractère personnel, quel que soit
                    le procédé utilisé, informatisé ou non, tels que la
                    collecte, l’enregistrement, l’organisation, l’adaptation, la
                    modification, l’extraction, la consultation, la
                    communication, l’utilisation, la diffusion ou le
                    rapprochement de Données ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    « <strong>Utilisateurs</strong> » désigne les personnes
                    physiques naviguant sur le Site, ayant passé commande ou
                    non.
                  </p>
                </div>
                <div id="IDENTITÉ" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    IDENTITÉ DU RESPONSABLE DE TRAITEMENT
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    Les Données à caractère personnelles sont collectées par
                    ISPA, société à responsabilité au capital de 1,000 euros,
                    dont le siège social est situé 6 rue de Palestro, 93500
                    Pantin, inscrite au Registre du Commerce et des Société de
                    Bobigny sous le numéro 804 763 704.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Le Responsable du traitement des données à caractère
                    personnel peut être contacté par email à l’adresse suivante
                    : nilrio.info@gmail.com
                  </p>
                </div>
                <div id="DONNÉES" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    Sur le Site, les Utilisateurs peuvent être amenés à
                    transmettre des Données, directement ou par l’usage qu’ils
                    font du Site.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Les Données collectées sur le Site pourront inclure :
                  </p>
                  <ul className="tw-mb-2 tw-text-sm">
                    <li>
                      • Des données d’identification, telles que le prénom et le
                      nom, l’adresse e-mail et/ou postale, le numéro de
                      téléphone ;
                    </li>
                    <li>
                      • Des données techniques, telles que l’adresse IP, le type
                      et la version du navigateur, le système d’exploitation
                      utilisé ;
                    </li>
                    <li>
                      • Des données de connexion, telles que les fonctions
                      utilisées, les pages visitées, les configurations
                      sélectionnées, l’horodatage des visites et les termes
                      recherchés.
                    </li>
                  </ul>
                  <p className="tw-text-sm tw-mb-2">
                    Certaines de ces Données sont collectées via des cookies
                    utilisés sur le Site. Pour en savoir plus sur la manière
                    dont ces cookies sont gérés, l’Utilisateur peut consulter à
                    tout moment la Politique d’utilisation des cookies.
                  </p>
                </div>
                <div id="FINALITÉ" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    FINALITÉ ET BASES LÉGALES DES TRAITEMENTS DE DONNÉES
                  </h2>
                  <p className="tw-text-sm tw-mb-8">
                    Les Données à caractère personnel des Utilisateurs sont
                    collectées et traitées par le Responsable de traitement sur
                    la base de fondements légaux et dans la mesure strictement
                    nécessaire aux finalités décrites ci-dessous :
                  </p>
                  <table className="tw-max-w-[968px] tw-mb-4">
                    <tbody>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Finalités poursuivies par le traitement
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Base légale du traitement
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>
                              • Traitement des demandes d’informations adressées
                              par l’Utilisateur par le biais du formulaire de
                              contact du Site ou par email
                            </li>
                            <li>
                              • Envoi de newsletters et prospection commerciale
                              aux clients potentiels
                            </li>
                            <li>
                              • Mise en place de contenu personnalisé via le
                              traçage et le suivi de navigation de l’Utilisateur
                            </li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Consentement
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black  tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>• Prise en compte et gestion des commandes</li>
                            <li>
                              • Gestion des rétractations et retours de produits
                            </li>
                            <li>
                              • Traitement des données bancaires dans le cadre
                              de la transaction
                            </li>
                            <li>• Livraison des produits commandés</li>
                            <li>• Service après-vente</li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Exécution d’un contrat
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black  tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>• Tenue de la comptabilité de l’entreprise</li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Obligation légale
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black  tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>• Administration du Site</li>
                            <li>• Lutte contre la fraude</li>
                            <li>
                              • Détection et prévention des incidents de
                              sécurité
                            </li>
                            <li>
                              • Envoi de newsletter et prospection commerciale
                              aux clients existants
                            </li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Intérêt légitime
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tw-text-sm tw-mb-2">
                    Pour les traitements réalisés sur la base du consentement,
                    l’Utilisateur peut à tout moment retirer son consentement,
                    sans porter atteinte à la licéité des Traitements effectués
                    avant ce retrait, en s’adressant à ISPA dans les conditions
                    définies à l’article 10 ci-dessous.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Pour les traitements réalisés sur la base de l’exécution
                    d’un contrat, les Données demandées à l’Utilisateur sont
                    nécessaires à la conclusion et l’exécution du contrat entre
                    ISPA et l’Utilisateur. L’absence de communication de ces
                    Données peut donc empêcher la formation et l’exécution du
                    contrat.
                  </p>
                </div>
                <div id="DESTINAIRES" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    DESTINAIRES DES DONNÉES
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    Les Données des Utilisateurs sont strictement
                    confidentielles et destinées exclusivement à ISPA.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Sauf obligation légale, comptable ou judiciaire, ISPA ne
                    divulguera, louera, cédera ou transmettra de quelque manière
                    que ce soit ces Données à des tiers autres que :
                  </p>
                  <ul className="tw-mb-2 tw-text-sm">
                    <li>
                      • L’hébergeur du Site (situé en France), aux fins
                      d’exécution des prestations d’hébergement et de
                      maintenance du Site et des Données ;
                    </li>
                    <li>
                      • L’éditeur d’applications tierces présentes sur le Site,
                      aux fins d’accès et d’utilisation de ladite application ;
                    </li>
                    <li>
                      • Nos fournisseurs de services, distributeurs,
                      représentants, sous-traitants et partenaires, aux fins
                      d’accès aux services demandés ou d’exécution d’une
                      prestation/transaction.
                    </li>
                  </ul>
                </div>
                <div id="TRANSFERT" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    TRANSFERT HORS DE L’UNION EUROPEENNE
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA choisit principalement des prestataires hébergeant
                    leurs données au sein de l’Union européenne. Néanmoins,
                    lorsque cela est nécessaire, ISPA peut être amenée à
                    transmettre des Données à des prestataires opérant hors
                    Union européenne.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Dans un tel cas, des mesures sont prises afin d’assurer que
                    lesdites Données bénéficient du même niveau de protection
                    que celui imposé par l’Union européenne en la matière,
                    notamment par la mise en place les Clauses Contractuelles
                    Types approuvées par la Commission Européenne, et
                    l’insertion d’un Data Processing Agreement (« DPA ») dans le
                    cadre de ses relations contractuelles avec ces prestataires.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    En tout état de cause, ISPA s’assure que les Traitements
                    sont effectués conformément à la présente Politique et
                    qu’ils sont encadrés conformément à la réglementation
                    relative à la protection des Données.{" "}
                  </p>
                </div>
                <div id="DURÉE" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    DURÉE DE CONSERVATION DES DONNÉES
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA conserve les Données à caractère personnel de ses
                    Utilisateurs pour la durée strictement nécessaire à la
                    réalisation des finalités du Traitement, sauf autorisation
                    expresse de l’Utilisateur pour une conservation prolongée.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    La durée de conservation des Données varie en fonction des
                    finalités des traitements mis en œuvre :
                  </p>
                  <table className="tw-max-w-[968px] tw-mb-4">
                    <tbody>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Données collectées
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Durée de conservation en base active
                        </td>
                        <td className="tw-border-2 tw-border-black tw-font-bold tw-p-3">
                          Durée de conservation en archivage
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          Données des Utilisateurs étant en relation commerciale
                          avec ISPA
                        </td>
                        <td className="tw-border-2 tw-border-black tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>
                              <strong>
                                Toute la durée nécessaire à la gestion de la
                                relation
                              </strong>
                            </li>
                            <li>
                              <strong>commerciale</strong>, puis
                            </li>
                            <li>
                              <strong>3 ans maximum</strong>
                            </li>
                            <li>
                              à des fins de prospection commerciale à compter du
                              dernier contact émanant de l’Utilisateur
                            </li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          N/A
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          Données des Utilisateurs présentes dans les documents
                          contractuels et nécessaires à la gestion des
                          commandes, des livraisons et de la facturation
                        </td>
                        <td className="tw-border-2 tw-border-black tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>
                              <strong>10 ans</strong>
                            </li>
                            <li>à compter de la passation de la commande</li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          N/A
                        </td>
                      </tr>
                      <tr>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          Données relatives aux cartes bancaires
                        </td>
                        <td className="tw-border-2 tw-border-black tw-p-3">
                          <ul className="tw-mb-2 tw-text-sm">
                            <li>
                              <strong>
                                Supprimé une fois la transaction réalisée
                              </strong>
                            </li>
                          </ul>
                        </td>
                        <td className="tw-border-2 tw-border-black tw-text-sm tw-p-3">
                          Entre 13 mois et 15 mois à des fins de preuve en cas
                          d’éventuelle contestation de la transaction
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="DROITS" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    DROITS DES UTILISATEURS
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    En qualité de Responsable de traitement, ISPA est tenue
                    d’assurer le respect des droits dont disposent les
                    Utilisateurs sur leurs Données à caractère personnel.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Les droits des Utilisateurs sont les suivants :{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit d’accès aux Données </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut demander au Responsable de traitement la
                    confirmation que ses Données à caractère personnel sont ou
                    ne sont pas traitées.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Si le Responsable de traitement traite effectivement des
                    Données, l’Utilisateur peut en contrôler l’exactitude en
                    sollicitant une copie, lisible dans un format
                    compréhensible, de toutes informations que le Responsable de
                    traitement détient le concernant.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit de rectification des Données </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut demander la modification de ses Données à
                    caractère personnel lorsque celles-ci sont erronées ou
                    incomplètes.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit d’opposition au Traitement </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut s’opposer, pour des motifs légitimes, à
                    ce que ses Données soient utilisées pour des finalités
                    précises.{" "}
                  </p>{" "}
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit à la limitation du Traitement </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut solliciter que le Traitement de ses
                    Données à caractère personnel soit bloqué pendant un certain
                    temps, notamment le temps d’examiner une demande d’exercice
                    des droits.{" "}
                  </p>{" "}
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit à l’effacement des Données </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut demander l’effacement de l’intégralité
                    des Données que le Responsable de traitement détient sur
                    lui.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Le Responsable de traitement s’engage à supprimer les
                    Données à caractère personnel lorsque :{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Les Données ne sont plus nécessaires au regard des finalités
                    pour lesquelles elles ont été collectées ou traitées ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Le consentement de l’Utilisateur est l’unique fondement du
                    Traitement et l’Utilisateur retire son consentement ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur s’oppose au traitement dans les conditions
                    déterminées par le RGPD ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Les Données à caractère personnel ont fait l’objet d’un
                    traitement illicite ;
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Lorsque la loi impose au Responsable de traitement d’effacer
                    les Données.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Le Responsable pourra toutefois refuser l’effacement des
                    données dès lors que les données sont nécessaires au respect
                    d’une obligation légale (ex. délai de conservation d’une
                    facture = 10 ans) ou aux besoins de la constatation, de
                    l’exercice ou de la défense de droits en justice
                  </p>{" "}
                  <p className="tw-text-sm tw-mb-2">
                    <strong>• Droit à la portabilité des Données </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur peut solliciter la récupération de ses Données
                    à caractère personnel pour son propre usage ou dans le but
                    de les communiquer à un autre organisme.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    <strong>
                      • Droit de donner des directives sur le sort des Données
                      après le décès
                    </strong>
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    L’Utilisateur a la possibilité d’informer le Responsable de
                    traitement sur les modalités d’utilisation de ses Données
                    après son décès.{" "}
                  </p>
                </div>
                <div id="MODALITÉS" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    MODALITÉS D’EXERCICE DES DROITS
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    Pour toute demande d’exercice des droits, l’Utilisateur peut
                    prendre contact avec ISPA par e-mail à l’adresse
                    nilrio.info@gmail.com ou par courrier postal à l’attention
                    de ISPA, 6 rue du Palestro, 93500 Pantin.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA pourra demander la communication de la copie d’une
                    pièce justificative d’identité si nécessaire. Le niveau des
                    vérifications effectuées par ISPA lors du traitement des
                    demandes d’exercice de droits variera en fonction de la
                    nature des demandes, de la sensibilité des informations
                    communiquées et du contexte dans lequel la demande est
                    effectuée.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA s’engage à répondre dans les meilleurs délais à toute
                    demande d’exercice des droits et en tout état de cause dans
                    un délai d’un (1) mois à compter de la réception de la
                    demande. Compte tenu de la complexité et/ou du nombre
                    important de demandes, le délai de réponse peut être prorogé
                    de deux (2) mois. Dans ce dernier cas, l’Utilisateur en sera
                    informé dans les meilleurs délais.{" "}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    En l’absence de réponse satisfaisante, l’Utilisateur est en
                    droit d’introduire une réclamation devant l’autorité de
                    contrôle, à savoir la Commission Nationale de l’Informatique
                    et des Liberté (la CNIL) via l’adresse suivante :
                    https://www.cnil.fr/fr/plaintes.{" "}
                  </p>
                </div>
                <div id="SÉCURITÉ" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    SÉCURITÉ DES DONNÉES
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA s’engage à prendre toutes les mesures nécessaires et
                    adéquates autant sur le plan technique qu’organisationnel,
                    afin de garantir la sécurité et l’intégrité des Données des
                    Utilisateurs. Ces mesures garantissent la protection de ces
                    données contre tout accès non autorisé, toute modification,
                    altération, divulgation, perte ou destruction.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    En cas de recours à un prestataire agissant pour son compte
                    en qualité de sous-traitant, ISPA s’assure que ce dernier
                    respecte ses obligations en matière de sécurité
                    préalablement à toute communication de Données des
                    Utilisateurs
                  </p>
                </div>
                <div id="MODIFICATIONS" className="tw-mb-4">
                  <h2 className="tw-text-lg tw-font-bold tw-mb-4">
                    MODIFICATIONS
                  </h2>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA se réserve le droit de modifier la présente Politique
                    de protection des Données à caractère personnel. Dans ce
                    cas, une version mise à jour sera publiée sur le Site et la
                    « date de dernière mise à jour » sera portée à la date à
                    laquelle les modifications ont été effectuées.
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    ISPA invite ses Utilisateurs à consulter régulièrement la
                    présente Politique afin de prendre connaissance des
                    éventuelles modifications ou mises à jour apportées à cette
                    Politique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
