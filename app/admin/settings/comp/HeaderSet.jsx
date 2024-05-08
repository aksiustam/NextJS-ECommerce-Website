import HeaderOne from "./Headers/HeaderOne";
import HeaderTwo from "./Headers/HeaderTwo";
import HeaderThree from "./Headers/HeaderThree";
import HeaderFour from "./Headers/HeaderFour";
import HeaderFive from "./Headers/HeaderFive";
import HeaderSix from "./Headers/HeaderSix";

const HeaderSet = (props) => {
  const { category } = props;

  return (
    <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-6 tw-flex-wrap">
      <div>
        <div>
          Kategorilenecek Çeşitler{" "}
          <span style={{ color: "#9C27B0" }}>
            &quot;nouveautes&quot; = &quot;yeni gelenler&quot;
          </span>{" "}
          ,
          <span style={{ color: "#FF5722" }}>
            &quot;bio&quot; = &quot;bio ürünler&quot;
          </span>{" "}
          ,
          <span style={{ color: "#03A9F4" }}>
            &quot;tendances&quot; = &quot;ilk/trend gösterenler&quot;
          </span>{" "}
          ,
          <span style={{ color: "#4CAF50 " }}>
            &quot;topventes&quot; = &quot;En çok satılanlar&quot;
          </span>
          ,
          <span style={{ color: "#CCC107" }}>
            &quot;promotions&quot; = &quot;indirimli ürünler&quot;
          </span>{" "}
          ,
          <span style={{ color: "#795548" }}>
            &quot;originefrancegarantie&quot; = &quot;France Ürünler&quot;
          </span>{" "}
          ,
        </div>
        <div>
          Eğer sadece giysiler istiyorsan sonuna ?type=vetements aksesuarlar
          istiyorsan ?type=accessoires ekle sonuna
        </div>

        <div>
          Örnek Url yazımı{" "}
          <span style={{ color: "#FFA500" }}>
            &quot;/boutique/nouveautes &quot;
          </span>{" "}
          VEYA
          <span style={{ color: "#FFA500" }}>
            &quot;/boutique?type=vetements &quot;
          </span>
        </div>
      </div>
      <div className="tw-flex tw-gap-3 tw-flex-wrap">
        <HeaderOne cat={category} />
        <HeaderTwo cat={category} />
        <HeaderThree cat={category} />
        <HeaderFour cat={category} />
        <HeaderFive cat={category} />
        <HeaderSix cat={category} />
      </div>
    </div>
  );
};

export default HeaderSet;
