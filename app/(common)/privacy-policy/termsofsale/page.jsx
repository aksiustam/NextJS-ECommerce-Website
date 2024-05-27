import MenuData from "../../../components/Layout/Header/MenuData";
import Header from "../../../components/Layout/Header";
import Banner from "../../../components/Layout/Banner/Banner";
import Footer from "../../../components/Layout/Footer";
import Image from "next/image";
import "./style.css";
import Link from "next/link";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Conditions De Vente" />
      <main>
        <section id="privacy-policy_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12 tw-flex tw-justify-start tw-mb-12">
                <Image
                  src={"/img/nilrio-logo.png"}
                  width={1000}
                  height={500}
                  loading="eager"
                  alt="Nilrio Logo"
                  className="tw-w-64 tw-h-auto"
                />
              </div>
              <div className="col-12 fontsmall">
                <p className="tw-mb-4">
                  <strong>CONDITIONS GÉNÉRALES DE VENTE (CGV)</strong>
                </p>

                <p>TABLE DES MATIÈRES</p>

                <p>INTÉGRALITÉ </p>
                <p>OBJET&#xa0;</p>
                <p>INFORMATIONS PRÉCONTRACTUELLES&#xa0;</p>
                <p>3.1 Communication des CGV&#xa0;</p>
                <p>
                  2 Informations relatives aux produits et aux frais de
                  livraison&#xa0;
                </p>
                <p>COMMANDE&#xa0;</p>
                <p>SIGNATURE ÉLECTRONIQUE&#xa0;</p>
                <p>CONFIRMATION DE COMMANDE&#xa0;</p>
                <p>PREUVE DE LA TRANSACTION&#xa0;</p>
                <p>INFORMATIONS SUR LES PRODUITS&#xa0;</p>
                <p>PRIX&#xa0;</p>
                <p>MOYENS DE PAIEMENT&#xa0;</p>
                <p>
                  DISPONIBILITE DES PRODUITS - REMBOURSEMENT - RÉSOLUTION&#xa0;
                </p>
                <p>LIVRAISON&#xa0;</p>
                <p>12.1 Modalités et frais de livraison&#xa0;</p>
                <p>12.2 Erreurs de livraison&#xa0;</p>
                <p>12.3 Réclamations&#xa0;</p>
                <p>12.4 Transfert des risques&#xa0;</p>
                <p>GARANTIES DES PRODUITS&#xa0;</p>
                <p>
                  13.1 Garantie légale de conformité et garantie légale des
                  vices cachés&#xa0;
                </p>
                <p>DROIT DE RÉTRACTATION&#xa0;</p>
                <p>PROPRIÉTÉ INTELLECTUELLE&#xa0;</p>
                <p>DONNÉES PERSONNELLES&#xa0;</p>
                <p>DISPOSITIONS GÉNÉRALES&#xa0;</p>
                <p>17.1 Force majeure&#xa0;</p>
                <p>17.2 Modification des CGV&#xa0;</p>
                <p>17.3 Non-validation partielle&#xa0;</p>
                <p>17.4 Non-renonciation&#xa0;</p>
                <p>
                  17.5 Langage du contrat - Loi applicable - Juridiction
                  compétente&#xa0;
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>INTEGRALİTE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les présentes conditions générales de vente (ci-après
                  «&#xa0;les&#xa0;CGV&#xa0;») expriment l&apos;intégralité des
                  obligations des parties. En ce sens, l’Acheteur, personne
                  physique non commerçante, est réputé les accepter sans
                  réserve.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  La société ISPA, dont le siège social est situé 6 rue de
                  Palestro, 93500 Pantin (ci-après
                  «&#xa0;le&#xa0;Vendeur&#xa0;»), et l’Acheteur conviennent que
                  les présentes CGV régissent exclusivement leurs
                  relations.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Si une condition de vente venait à faire défaut, elle serait
                  considérée être régie par les usages en vigueur dans le
                  secteur de la vente à distance dont les sociétés ont siège en
                  France.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>OBJET</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les présentes CGV ont pour objet de définir les droits et
                  obligations des parties dans le cadre de la vente en ligne de
                  biens proposés par le Vendeur à l’Acheteur, à partir du site
                  web&#xa0;
                  <a href="https://nilrio.com" className="tw-text-blue-600">
                    <span>https://nilrio.com</span>
                  </a>
                </p>
                <p>&#xa0;</p>
                <p>(Ci-après « le, Site »).</p>
                <p>&#xa0;</p>
                <h2>
                  <strong>INFORMATIONS PRÉCONTRACTUELLES</strong>
                </h2>

                <h2>
                  <strong>COMMUNICATION DES CGV</strong>
                  <strong>&#xa0;</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur reconnaît avoir eu communication des présentes CGV,
                  disponibles sur le Site, et via un lien hypertexte « J’ai lu
                  et j’accepte les Conditions Générales de Vente&#xa0;»
                  préalablement à la passation de sa commande.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>
                    INFORMATIONS RELATIVES AUX PRODUITS ET AUX FRAIS DE
                    LIVRAISON
                  </strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Sont transmises à l&apos;Acheteur, de manière claire et
                  compréhensible, préalablement à la passation de sa commande,
                  notamment, les informations suivantes :
                </p>
                <p>
                  Les caractéristiques détaillées du produit (matière, couleur,
                  taille) ;
                </p>
                <p>Le prix du produit ;</p>
                <p>Les frais et modalités de livraison.</p>
                <p>&#xa0;</p>
                <h2>
                  <strong>COMMANDE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  L&apos;Acheteur a la possibilité de passer sa commande à
                  partir du catalogue en ligne, dans la limite des stocks
                  disponibles. Il n&apos;est pas obligé de créer un compte
                  client pour passer commande.
                </p>
                <p>&#xa0;</p>
                <p>
                  Avant la validation de la commande, l’Acheteur aura accès au
                  détail de la commande et à son prix, pourra modifier sa
                  commande si nécessaire puis confirmer celle-ci.&#xa0;&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Pour que la commande soit validée, l&apos;Acheteur devra
                  accepter les présentes CGV en cochant la case «&#xa0;J’accepte
                  les Conditions Générales de Vente&#xa0;». Il devra aussi
                  choisir l&apos;adresse et le mode de livraison, et enfin
                  valider le paiement.
                </p>
                <p>&#xa0;</p>
                <p>
                  La vente sera considérée comme définitive après l’envoi à
                  l’Acheteur de la confirmation de la validation de la commande
                  par le Vendeur par courrier électronique et après encaissement
                  par le Vendeur de l’intégralité du prix (telle que décrite à
                  l’article 6 ci-dessous).
                </p>
                <p>&#xa0;</p>
                <p>
                  Dans certains cas, notamment défaut de paiement, adresse
                  erronée ou autre problème du côté de l&apos;Acheteur, le
                  Vendeur se réserve le droit de bloquer la commande de
                  l&apos;Acheteur jusqu&apos;à la résolution du problème.
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas d&apos;indisponibilité d&apos;un produit commandé,
                  l&apos;Acheteur en sera informé par courrier électronique.
                  L&apos;annulation de la commande de ce produit et son éventuel
                  remboursement seront alors effectués, le reste de la commande
                  demeurant ferme et définitif.
                </p>
                <p>&#xa0;</p>
                <p>
                  Toute commande vaut acceptation des prix et descriptions des
                  produits disponibles à la vente. Toute contestation sur ce
                  point interviendra dans le cadre d&apos;un éventuel échange et
                  des garanties ci-dessous mentionnées.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>SIGNATURE ÉLECTRONIQUE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  La fourniture en ligne du numéro de carte bancaire de
                  l&apos;Acheteur et la validation finale de la commande
                  vaudront preuve de l&apos;accord de l&apos;Acheteur s’agissant
                  de l’exigibilité des sommes dues ainsi que de toutes les
                  opérations réalisées.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas d&apos;utilisation frauduleuse de sa carte bancaire,
                  l&apos;Acheteur est invité, dès le constat de cette
                  utilisation, à contacter le Vendeur par mail à l’adresse
                  électronique&#xa0; nilrio.info@gmail.com &#xa0;
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>CONFIRMATION DE COMMANDE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur reçoit confirmation de sa commande par email. Cet
                  email comprend les éléments suivants&#xa0;:
                </p>
                <p>Le numéro de commande&#xa0;;</p>
                <p>La date de commande&#xa0;;</p>
                <p>Le détail des articles commandés&#xa0;;</p>
                <p>Le prix HT et TTC&#xa0;;</p>
                <p>Le montant des frais de livraison&#xa0;;</p>
                <p>Le mode de paiement choisi par l’Acheteur&#xa0;;</p>
                <p>Le mode et l’adresse de livraison choisis par l’Acheteur.</p>
                <p>&#xa0;</p>
                <h2>
                  <strong>PREUVE DE LA TRANSACTION</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les registres informatisés, conservés dans les systèmes
                  informatiques du Vendeur dans des conditions raisonnables de
                  sécurité, seront considérés comme les preuves des
                  communications, des commandes et des paiements intervenus
                  entre les parties. L&apos;archivage des bons de commande et
                  des factures est effectué sur un support fiable et durable
                  pouvant être produit à titre de preuve.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>INFORMATIONS SUR LES PRODUITS</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les produits régis par les présentes CGV sont ceux qui
                  figurent sur le Site du Vendeur. Ils sont proposés dans la
                  limite des stocks disponibles.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les produits sont décrits et présentés avec la plus grande
                  exactitude possible. Toutefois, si des erreurs ou omissions
                  ont pu se produire quant à cette présentation, la
                  responsabilité du Vendeur ne pourrait être engagée.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les photographies des produits ne sont pas contractuelles.
                  L’affichage des couleurs peut légèrement varier en fonction de
                  l’appareil utilisé et des réglages effectués.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>PRIX</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Le Vendeur se réserve le droit de modifier ses prix à tout
                  moment mais s&apos;engage à appliquer les tarifs en vigueur
                  indiqués au moment de la commande, sous réserve de
                  disponibilité à cette date.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les prix sont indiqués en euros. Ils ne tiennent pas compte
                  des frais de livraison, facturés en supplément, et indiqués
                  avant la validation de la commande. Les prix sont indiqués
                  toutes taxes comprises (TTC) sur la base de la TVA applicable
                  au jour de la commande et tout changement du taux applicable
                  sera automatiquement répercuté sur le prix des produits de la
                  boutique en ligne.
                </p>
                <p>&#xa0;</p>
                <p>
                  La totalité du prix doit être payé lors de la commande, À
                  aucun moment, les sommes versées ne pourront être considérées
                  comme des arrhes ou des acomptes.
                </p>
                <p>&#xa0;</p>
                <p>
                  Si une ou plusieurs taxes ou contributions, notamment
                  environnementales, venaient à être créées ou modifiées, en
                  hausse comme en baisse, ce changement pourra être répercuté
                  sur le prix de vente des produits.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les produits demeurent la propriété du Vendeur jusqu’au
                  complet paiement du prix.&#xa0;
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>MOYENS DE PAIEMENT</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Il s&apos;agit d&apos;une commande avec obligation de
                  paiement, ce qui signifie que la passation de la commande
                  implique un règlement de l&apos;Acheteur.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le moyen de paiement proposé sur le Site est la carte
                  bancaire.
                </p>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur garantit au Vendeur qu&apos;il dispose des
                  autorisations éventuellement nécessaires pour utiliser le mode
                  de paiement choisi par lui, lors de la validation de la
                  commande.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Il est précisé que lorsque l’Acheteur effectue un règlement
                  sur le Site afin de payer sa commande, ses coordonnées
                  bancaires ne sont pas conservées par le Vendeur.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le Vendeur se réserve le droit de suspendre toute gestion de
                  commande et toute livraison en cas de refus
                  d&apos;autorisation de paiement de la part des organismes
                  officiellement accrédités ou en cas de non-paiement. Le
                  Vendeur se réserve notamment le droit de refuser
                  d&apos;effectuer une livraison ou d&apos;honorer une commande
                  émanant d&apos;un Acheteur qui n&apos;aurait pas réglé
                  totalement ou partiellement une commande précédente ou avec
                  lequel un litige de paiement serait en cours
                  d&apos;administration.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Une procédure de vérification des commandes destinée à assurer
                  qu&apos;aucune personne n&apos;utilise les coordonnées
                  bancaires d&apos;une autre personne à son insu peut être mise
                  en place par le Vendeur.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>
                    DISPONIBILITE DES PRODUITS - REMBOURSEMENT - RÉSOLUTION
                  </strong>
                  <br />
                  <strong>&#xa0;</strong>
                </h2>
                <p>
                  En cas d&apos;indisponibilité du produit commandé,
                  l&apos;Acheteur en sera informé au plus tôt et aura la
                  possibilité d&apos;annuler sa commande. L&apos;Acheteur aura
                  alors le choix de demander soit le remboursement des sommes
                  versées dans les trente (30) jours au plus tard de leur
                  versement, soit l&apos;échange du produit.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>LIVRAISON</strong>
                </h2>

                <h2>
                  <strong>MODALITÉS ET FRAIS DE LIVRAISON</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Aux termes de l’article L. 216-1 du code de la consommation,
                  la livraison s&apos;entend du transfert au consommateur de la
                  possession physique ou du contrôle du bien. Elle n&apos;est
                  faite qu&apos;après confirmation du paiement par
                  l&apos;organisme bancaire du Vendeur.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les modalités et les frais de livraison sont indiquées dans le
                  cadre du parcours d’achat sur le Site.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Les produits sont livrés à l&apos;adresse indiquée par
                  l&apos;Acheteur lors de la commande, l&apos;Acheteur devra
                  veiller à son exactitude.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Tout colis renvoyé au Vendeur à cause d&apos;une adresse de
                  livraison erronée ou incomplète sera réexpédié aux frais de
                  l&apos;Acheteur. L&apos;Acheteur peut, à sa demande, obtenir
                  l&apos;envoi d&apos;une facture à l&apos;adresse de
                  facturation et non à l&apos;adresse de livraison, en validant
                  l&apos;option prévue à cet effet lors de la commande.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>ERREURS DE LIVRAISON</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  En cas de non-respect de la date ou du délai de livraison
                  convenu, l&apos;Acheteur devra, avant de résoudre le contrat,
                  enjoindre au Vendeur d&apos;exécuter celui-ci dans un délai
                  supplémentaire raisonnable.
                </p>
                <p>&#xa0;</p>
                <p>
                  A défaut d&apos;exécution à l&apos;expiration de ce nouveau
                  délai, l&apos;Acheteur pourra librement résoudre le contrat.
                </p>
                <p>
                  L&apos;Acheteur devra accomplir ces formalités successives par
                  lettre recommandée avec accusé de réception ou par un écrit
                  sur un autre support durable.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le contrat sera considéré comme résolu à la réception par le
                  Vendeur de la lettre ou de l&apos;écrit l&apos;informant de
                  cette résolution, sauf si le professionnel s&apos;est exécuté
                  entre-temps.
                </p>
                <p>&#xa0;</p>
                <p>
                  Dans ce cas, lorsque le contrat est résolu, le vendeur est
                  tenu de rembourser l&apos;acheteur de la totalité des sommes
                  versées, au plus tard dans les quatorze (14)&#xa0;jours
                  suivant la date à laquelle le contrat a été dénoncé.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>TRANSFERT DES RISQUES</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Le transfert des risques de perte et de détérioration des
                  produits est réalisé, à la charge de l&apos;Acheteur, dès
                  qu’il, ou un tiers désigné par lui, prend physiquement
                  possession de la chose vendue.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>GARANTIES DES PRODUITS</strong>
                </h2>

                <h2>
                  <strong>
                    GARANTIE LÉGALE DE CONFORMITÉ ET GARANTIE LÉGALE DES VICES
                    CACHÉS
                  </strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Tous les produits en vente sur le Site bénéficient de la
                  garantie légale de conformité prévue aux articles L. 217-4 et
                  suivants du code de la consommation et de la garantie contre
                  les vices cachés prévues aux articles 1641 et suivants du code
                  civil, reproduits à la fin du présent article.
                </p>
                <p>&#xa0;</p>
                <p>
                  L&apos;Acheteur pourra exercer ces garanties en adressant sa
                  demande par email à l’adresse suivante :&#xa0;
                  nilrio.info@gmail.com &#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas de mise en œuvre de la garantie légale de conformité,
                  il est rappelé que :
                </p>
                <p>
                  L’Acheteur bénéficie d&apos;un délai de deux (2) ans à compter
                  de la délivrance du bien pour agir ;
                </p>
                <p>
                  L’Acheteur peut choisir entre la réparation ou le remplacement
                  du bien, sous réserve des conditions de coût prévues par
                  l&apos;article L. 217-17 du code de la consommation ;
                </p>
                <p>
                  L’Acheteur est dispensé de rapporter la preuve de
                  l&apos;existence du défaut de conformité du bien durant les
                  vingt-quatre (24) mois suivant la délivrance du bien.
                </p>
                <p>&#xa0;</p>
                <p>
                  La garantie des vices cachés couvre l’Acheteur lorsque le
                  produit comporte un vice caché, c’est-à-dire un vice non
                  apparent au moment de la vente qui rend le produit impropre à
                  son usage ou qui diminue très fortement cet usage.
                </p>
                <p>&#xa0;</p>
                <p>En outre, il est rappelé que&#xa0;:</p>
                <p>
                  La garantie légale de conformité s&apos;applique
                  indépendamment de la garantie commerciale indiquée
                  ci-dessous&#xa0;;
                </p>
                <p>
                  L&apos;acheteur peut décider de mettre en œuvre la garantie
                  contre les défauts cachés de la chose vendue au sens de
                  l&apos;article 1641 du code civil. Dans cette hypothèse, il
                  peut choisir entre la résolution de la vente ou une réduction
                  du prix conformément à l&apos;article 1644 du code civil.
                </p>
                <p>&#xa0;</p>
                <p>
                  La garantie légale de conformité et la garantie des vices
                  cachés ne pourront être applicables en cas de mauvais usage
                  des produits ou de non-respect des conditions d’entretien
                  fournies sur les étiquettes des produits.
                </p>
                <p>&#xa0;</p>
                <p>Article L217-4 du code de la consommation&#xa0;:</p>
                <p>
                  Le vendeur livre un bien conforme au contrat et répond des
                  défauts de conformité existant lors de la délivrance.
                </p>
                <p>
                  Il répond également des défauts de conformité résultant de
                  l&apos;emballage, des instructions de montage ou de
                  l&apos;installation lorsque celle-ci a été mise à sa charge
                  par le contrat ou a été réalisée sous sa responsabilité.
                </p>
                <p>&#xa0;</p>
                <p>Article L217-5 du code de la consommation&#xa0;:</p>
                <p>&#xa0;</p>
                <p>Le bien est conforme au contrat&#xa0;:</p>
                <p>&#xa0;</p>
                <p>
                  1° S&apos;il est propre à l&apos;usage habituellement attendu
                  d&apos;un bien semblable et, le cas échéant :
                </p>
                <p>&#xa0;</p>
                <p>
                  - s&apos;il correspond à la description donnée par le vendeur
                  et possède les qualités que celui-ci a présentées à
                  l&apos;acheteur sous forme d&apos;échantillon ou de modèle ;
                </p>
                <p>&#xa0;</p>
                <p>
                  - s&apos;il présente les qualités qu&apos;un acheteur peut
                  légitimement attendre eu égard aux déclarations publiques
                  faites par le vendeur, par le producteur ou par son
                  représentant, notamment dans la publicité ou l&apos;étiquetage
                  ;
                </p>
                <p>&#xa0;</p>
                <p>
                  2° Ou s&apos;il présente les caractéristiques définies
                  d&apos;un commun accord par les parties ou est propre à tout
                  usage spécial recherché par l&apos;acheteur, porté à la
                  connaissance du vendeur et que ce dernier a accepté.
                </p>
                <p>&#xa0;</p>
                <p>Article L217-12 du code de la consommation&#xa0;:</p>
                <p>&#xa0;</p>
                <p>
                  L&apos;action résultant du défaut de conformité se prescrit
                  par deux ans à compter de la délivrance du bien.
                </p>
                <p>&#xa0;</p>
                <p>Article L217-16 du code de la consommation&#xa0;:</p>
                <p>&#xa0;</p>
                <p>
                  Lorsque l&apos;acheteur demande au vendeur, pendant le cours
                  de la garantie commerciale qui lui a été consentie lors de
                  l&apos;acquisition ou de la réparation d&apos;un bien meuble,
                  une remise en état couverte par la garantie, toute période
                  d&apos;immobilisation d&apos;au moins sept jours vient
                  s&apos;ajouter à la durée de la garantie qui restait à courir.
                </p>
                <p>&#xa0;</p>
                <p>
                  Cette période court à compter de la demande
                  d&apos;intervention de l&apos;acheteur ou de la mise à
                  disposition pour réparation du bien en cause, si cette mise à
                  disposition est postérieure à la demande d&apos;intervention.
                </p>
                <p>&#xa0;</p>
                <p>Article 1641 du code civil&#xa0;:</p>
                <p>&#xa0;</p>
                <p>
                  Le vendeur est tenu de la garantie à raison des défauts cachés
                  de la chose vendue qui la rendent impropre à l&apos;usage
                  auquel on la destine, ou qui diminuent tellement cet usage que
                  l&apos;acheteur ne l&apos;aurait pas acquise, ou n&apos;en
                  aurait donné qu&apos;un moindre prix, s&apos;il les avait
                  connus.
                </p>
                <p>&#xa0;</p>
                <p>Article 1648 du code civil&#xa0;:</p>
                <p>&#xa0;</p>
                <p>
                  L&apos;action résultant des vices rédhibitoires doit être
                  intentée par l&apos;acquéreur dans un délai de deux ans à
                  compter de la découverte du vice.
                </p>
                <p>&#xa0;</p>
                <p>
                  Dans le cas prévu par&#xa0;l&apos;article 1642-1,
                  l&apos;action doit être introduite, à peine de forclusion,
                  dans l&apos;année qui suit la date à laquelle le vendeur peut
                  être déchargé des vices ou des défauts de conformité
                  apparents.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>DROIT DE RÉTRACTATION</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Conformément à l’article L121-18 du code de la consommation,
                  l’Acheteur dispose d’un délai de quatorze (14) jours à compter
                  de la date de livraison de sa commande pour retourner tout
                  article qui ne lui convient pas et en demander l&apos;échange
                  ou le remboursement sans pénalité, à l’exception des frais de
                  retour qui restent à la charge de l&apos;Acheteur.
                </p>
                <p>&#xa0;</p>
                <p>
                  Pour se rétracter, l’Acheteur notifie au Vendeur sa décision
                  au moyen d’une déclaration dénuée d’ambiguïté, qui lui est
                  adressée par courrier postal à l’adresse suivante 6 rue de
                  Palestro,&#xa0;93500 Pantin ou par courrier électronique à
                  l’adresse&#xa0;nilrio.info@gmail.com
                </p>
                <p>&#xa0;</p>
                <p>
                  Le Client peut utiliser le formulaire de rétractation
                  ci-dessous&#xa0;:
                </p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>
                  <em>
                    À l&apos;attention d’ISPA, entreprise chargée de la vente
                  </em>
                  <em>&#xa0;</em>
                  <em>:</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>Nom du client :</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>Numéro de commande</em>
                  <em>&#xa0;</em>
                  <em>:</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>Adresse :</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>Email :</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>
                    Je vous notifie par la présente ma rétractation du contrat
                    portant sur l’achat des pièces (REFERENCE) commandées le
                    (DATE), facture correspondant numéro (NUMERO DE FACTURE)
                  </em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <strong>
                    <em>Date</em>
                  </strong>
                  <strong>
                    <em>&#xa0;</em>
                  </strong>
                  <strong>
                    <em>:</em>
                  </strong>
                  <strong>
                    <em>&#xa0;</em>
                  </strong>
                  <strong>
                    <em>Signature du client</em>
                  </strong>
                  <strong>
                    <em>&#xa0;</em>
                  </strong>
                  <strong>
                    <em>:</em>
                  </strong>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>
                  <em>&#xa0;</em>
                </p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>
                  Le(s) produit(s) doivent être dans leur emballage d’origine
                  sans aucune modification du contenu ou du contenant,
                  accompagné(s) de tous les accessoires et notices, et en
                  parfait état.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Le(s) produit(s) doivent être retournés au Vendeur dans les
                  quatorze (14) jours suivant la notification de rétractation.
                  Les frais de retour sont à la charge de l’Acheteur.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Le Vendeur remboursera l’Acheteur de la totalité des sommes
                  versées, y compris les frais de livraison, sans retard
                  injustifié et au plus tard quatorze (14) jours à compter de la
                  date à laquelle il est informé de la décision de l’Acheteur de
                  se rétracter. En cas de retour d’un produit, le Vendeur peut
                  différer le remboursement jusqu’au jour de réception du
                  produit retourné par l’Acheteur ou jusqu’à réception d’une
                  preuve de l’expédition du bien par l’Acheteur.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le remboursement est effectué par le Vendeur en utilisant le
                  même moyen de paiement que celui utilisé par l’Acheteur pour
                  régler sa commande.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Le droit de rétractation ne peut être exercé pour la vente de
                  produits nettement personnalisés. Ainsi, l’obligation pour le
                  Vendeur de commander à l’un de ses fournisseurs, pour répondre
                  à la demande d’un Acheteur, une pièce neuve selon des
                  spécifications particulières répondant à des exigences
                  techniques et esthétiques précises (notamment coloris,
                  matériaux, personnalisation) rend impossible l’exercice du
                  droit de rétraction par l’Acheteur.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>PROPRIÉTÉ INTELLECTUELLE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Le contenu du Site (marques, textes, images, visuels, etc.)
                  est la propriété exclusive du Vendeur. L’Acheteur
                  s&apos;engage à ne faire aucun usage de ce contenu.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Conformément aux articles L.111-1 et L.123-1 du code de la
                  propriété intellectuelle, toute reproduction, modification,
                  adaptation, traduction, utilisation commerciale, totale ou
                  partielle, publication, concession sous licence, transfert ou
                  vente, quel que soit le moyen, de tout ou partie du Site est
                  strictement interdit, sauf autorisation expresse, écrite et
                  préalable du Vendeur.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>DONNÉES PERSONNELLES</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur est informé que, lors du passage de sa commande en
                  ligne, des données à caractère personnel le concernant peuvent
                  être collectées.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Les données à caractère personnel ainsi recueillies font
                  l’objet d’un traitement réalisé par le Vendeur, qui agit en
                  tant que responsable de traitement. Ce traitement s’effectue
                  dans le strict respect des exigences du&#xa0;Règlement UE
                  2016/679 du Parlement européen et du Conseil du 27 avril 2016
                  relatif à la protection des données personnelles, de la
                  loin°78-17 du 6 janvier 1978 relative à l&apos;informatique,
                  aux fichiers et aux libertés et de la Commission Nationale de
                  l&apos;Informatique et des Libertés (CNIL).
                </p>
                <p>&#xa0;</p>
                <p>
                  Les données personnelles de l’Acheteur sont traitées notamment
                  pour la gestion et la livraison des commandes.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les données personnelles sont conservées par le Vendeur pour
                  la durée nécessaire à l&apos;accomplissement des finalités
                  pour lesquelles elles ont été collectées, sous réserve
                  toutefois des possibilités d&apos;archivage, des obligations
                  de conservation prévues par la loi et/ou la réglementation de
                  certaines données et/ou d&apos;anonymisation.
                </p>
                <p>&#xa0;</p>
                <p>
                  Conformément à la réglementation applicable, l&apos;Acheteur
                  dispose d&apos;un droit d&apos;accès, de rectification,
                  d&apos;effacement et d’opposition au traitement de ses
                  données, d’un droit à la limitation du traitement et à la
                  portabilité des données le concernant, du droit de retirer le
                  consentement au traitement de ses données, du droit de décider
                  du sort de ses données après son décès, ainsi que du droit
                  d’introduire une réclamation auprès de la CNIL.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur peut exercer ses droits auprès du Vendeur en
                  adressant une demande par e-mail à l&apos;adresse suivante
                  :&#xa0; nilrio.info@gmail.com , ou en envoyant un courrier à
                  l&apos;adresse suivante&#xa0;: 6 rue de Palestro,&#xa0;93500
                  Pantin.
                </p>
                <p>&#xa0;</p>
                <p>
                  Pour plus d’informations sur les opérations de traitement
                  effectuées par le Vendeur ainsi que les droits de l’Acheteur
                  sur ses données personnelles, l’Acheteur est invité à
                  consulter la Politique de confidentialité du Vendeur
                  disponible&#xa0;
                  <Link
                    href={"/privacy-policy/privacy"}
                    className="tw-text-blue-600"
                  >
                    <span>ici</span>
                  </Link>
                  &#xa0;.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le Site utilise des cookies afin d’en optimiser l’utilisation
                  et d’en mesurer l’audience. Pour plus d’informations sur
                  l’utilisation des cookies et la gestion du consentement des
                  utilisateurs, vous pouvez consulter la Politique cookies du
                  Vendeur disponible&#xa0;
                  <Link
                    href={"/privacy-policy/privacy"}
                    className="tw-text-blue-600"
                  >
                    <span>ici</span>
                  </Link>
                  .&#xa0;
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>DISPOSITIONS GÉNÉRALES</strong>
                </h2>

                <h2>
                  <strong>FORCE MAJEURE</strong>
                </h2>

                <p>
                  Toutes circonstances indépendantes de la volonté des parties,
                  empêchant l&apos;exécution dans des conditions normales de
                  leurs obligations, sont considérées comme des causes
                  d&apos;exonération des obligations des parties et entraînent
                  leur suspension.
                </p>
                <p>&#xa0;</p>
                <p>
                  La partie qui invoque les circonstances visées ci-dessus doit
                  avertir immédiatement l&apos;autre partie de leur survenance,
                  ainsi que de leur disparition.
                </p>
                <p>&#xa0;</p>
                <p>
                  Seront considérés comme cas de force majeure tous faits ou
                  circonstances irrésistibles, extérieurs aux parties,
                  imprévisibles, inévitables, indépendants de la volonté des
                  parties et qui ne pourront être empêchés par ces dernières,
                  malgré tous les efforts raisonnablement possibles. De façon
                  expresse, sont considérés comme cas de force majeure ou cas
                  fortuits, outre ceux habituellement retenus par la
                  jurisprudence des cours et des tribunaux français : le blocage
                  des moyens de transports ou d&apos;approvisionnements,
                  tremblements de terre, incendies, tempêtes, inondations,
                  foudre, l&apos;arrêt des réseaux de télécommunication ou
                  difficultés propres aux réseaux de télécommunication externes
                  aux clients.
                </p>
                <p>&#xa0;</p>
                <p>
                  Les parties se rapprocheront pour examiner l&apos;incidence de
                  l&apos;événement et convenir des conditions dans lesquelles
                  l&apos;exécution du contrat sera poursuivie. Si le cas de
                  force majeure a une durée supérieure à trois (3) mois, les
                  présentes CGV pourront être résiliées par la partie lésée.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>MODIFICATION DES CGV</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les présentes CGV s’appliquent à toutes les commandes passées
                  sur le Site.
                </p>
                <p>&#xa0;</p>
                <p>
                  Le Vendeur se réserve le droit de modifier, corriger et de
                  compléter les présentes CGV à tout moment.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas de modification des CGV, les CGV applicables à une
                  commande donnée sont celles en vigueur à la date de la
                  commande concernée.&#xa0;
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>NON-VALIDATION PARTIELLE</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Si une ou plusieurs stipulations des présentes conditions
                  générales sont tenues pour non valides ou déclarées comme
                  telles en application d&apos;une loi, d&apos;un règlement ou à
                  la suite d&apos;une décision définitive d&apos;une juridiction
                  compétente, les autres stipulations garderont toute leur force
                  et leur portée.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>NON-RENONCIATION</strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Le fait pour l&apos;une des parties de ne pas se prévaloir
                  d&apos;un manquement par l&apos;autre partie à l&apos;une
                  quelconque des obligations visées dans les présentes
                  conditions générales ne saurait être interprété pour
                  l&apos;avenir comme une renonciation à l&apos;obligation en
                  cause.
                </p>
                <p>&#xa0;</p>
                <h2>
                  <strong>
                    LANGAGE DU CONTRAT - LOI APPLICABLE - JURIDICTION COMPÉTENTE
                  </strong>
                </h2>
                <p>&#xa0;</p>
                <p>
                  Les présentes CGV sont rédigées en langue française. Elles
                  sont soumises à l&apos;application du droit français. Dans le
                  cas où elles seraient traduites en une ou plusieurs langues,
                  seul le texte français ferait foi en cas de litige.
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas de difficultés sur la formation, la validité,
                  l&apos;interprétation, l’exécution, l&apos;inexécution ou
                  l’extinction des présentes CGV les parties s&apos;efforceront
                  de résoudre leur différend à l&apos;amiable.
                </p>
                <p>&#xa0;</p>
                <p>
                  Tout différend persistant entre les parties sera soumis à la
                  compétence exclusive des tribunaux de Paris, sauf règles
                  impératives contraires.
                </p>
                <p>&#xa0;</p>
                <p>
                  Conformément à l’article L.612-1 du code de la
                  consommation&#xa0;: «&#xa0;Tout consommateur a le droit de
                  recourir gratuitement à un médiateur de la consommation en vue
                  de la résolution amiable du litige qui l’oppose à un
                  professionnel&#xa0;».&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Les litiges entrant dans le champ d’application de l’article
                  L.612-1 du code de la consommation sont les litiges définis à
                  l’article L.611-1 du Code de la consommation, à savoir les
                  litiges de nature contractuelle, portant sur l’exécution d’un
                  contrat de vente ou de fourniture de services, opposant un
                  consommateur à un professionnel. Le texte couvre les litiges
                  nationaux et les litiges transfrontaliers.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Le consommateur ne peut toutefois saisir le médiateur qu’à
                  la&#xa0;condition d’avoir préalablement fait une démarche
                  écrite directement auprès du professionnel&#xa0;concerné ou de
                  son service client, pour tenter de résoudre le litige les
                  opposant. Si cette démarche n’est pas effectuée, la demande de
                  médiation sera irrecevable.
                </p>
                <p>&#xa0;</p>
                <p>
                  En cas de difficulté, l’Acheteur est donc invité à contacter
                  préalablement&#xa0;le service client du Vendeur :
                </p>
                <p>&#xa0;</p>
                <p>Service Client NILRIO</p>
                <p>&#xa0;</p>
                <p>6 rue de Palestro</p>
                <p>&#xa0;</p>
                <p>93500 Pantin</p>
                <p>&#xa0;</p>
                <p>nilrio.info@gmail.com</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>
                  Dans l’année suivant le contact de l’Acheteur auprès du
                  Service Client du Vendeur, l’Acheteur pourra faire examiner sa
                  demande par un médiateur de la consommation, dont les
                  coordonnées sont reproduites ci-dessous&#xa0;:
                </p>
                <p>&#xa0;</p>
                <p>AME Conso</p>
                <p>&#xa0;</p>
                <p>11 place Dauphine</p>
                <p>&#xa0;</p>
                <p>75001 Paris</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>
                  <a
                    href="https://www.mediationconso-ame.com/"
                    className="tw-text-blue-600"
                  >
                    <span>https://www.mediationconso-ame.com/</span>
                  </a>
                  &#xa0;
                </p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>&#xa0;</p>
                <p>
                  En tout état de cause, l’Acheteur peut également présenter ses
                  réclamations éventuelles sur la plateforme de résolution des
                  litiges mise en ligne par la Commission Européenne en
                  cliquant&#xa0;
                  <Link
                    href={"/privacy-policy/privacy"}
                    className="tw-text-blue-600"
                  >
                    <span>ici</span>
                  </Link>
                  .
                </p>
                <p>&#xa0;</p>
                <p>
                  La Commission Européenne transférera la réclamation de
                  l’Acheteur aux médiateurs nationaux compétents notifiés.
                </p>
                <p>&#xa0;</p>
                <p>
                  L’Acheteur peut, s’il le souhaite et à ses frais, se faire
                  assister par un conseil.&#xa0;
                </p>
                <p>&#xa0;</p>
                <p>
                  Toute difficulté persistante relative à l’interprétation,
                  l’exécution ou l’expiration des présentes CGV sera soumise, à
                  défaut d’accord amiable entre les parties, aux tribunaux de
                  Paris, auxquels les parties attribuent expressément compétence
                  territoriale, et ceci nonobstant pluralité de défendeurs ou
                  appel en garantie, et même pour les procédures d&apos;urgence
                  ou pour les procédures conservatoires, en référé ou par
                  requête.
                </p>
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
