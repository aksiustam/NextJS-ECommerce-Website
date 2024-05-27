"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminHome = (props) => {
  const { Products, Siparis } = props;
  const router = useRouter();
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          <div className="vendor_top_box">
            <h2 className="tw-text-4xl">{Products?.length}</h2>
            <h4>Toplam Ürünler</h4>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          <div className="vendor_top_box">
            <h2 className="tw-text-4xl">{Siparis?.length}</h2>
            <h4>Toplam Satışlar</h4>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          <div className="vendor_top_box">
            <h2 className="tw-text-4xl">
              {Siparis?.filter((item) => item?.status === "paid")?.length}
            </h2>
            <h4>Bekleyen Satışlar</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <h4>En Çok Satanlar</h4>
            <table className="table pending_table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Resim</th>
                  <th scope="col">Ad</th>
                  <th scope="col">Fiyat</th>
                  <th scope="col">Satış Miktarı</th>
                </tr>
              </thead>
              <tbody>
                {Products?.slice(0, 5).map((data) => (
                  <tr key={data?.id}>
                    <td>
                      <Link href={`/admin/product/${data.id}`}>
                        <Image
                          src={data?.ProductColorSize[0]?.images[0]?.imageurl}
                          alt="image"
                          width={70}
                          height={70}
                          loading="eager"
                          className="tw-object-contain"
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/admin/product/${data?.id}`}>
                        {data?.name}
                      </Link>
                    </td>
                    <td>{data?.indirim ? data?.inprice : data?.price}€</td>
                    <td>{data?.sells || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <h4>Son Satışlar</h4>
            <table className="table pending_table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Satış Id</th>
                  <th scope="col">Ürün Detayı</th>
                  <th scope="col">Durum</th>
                </tr>
              </thead>
              <tbody>
                {Siparis?.map((data) => (
                  <tr
                    key={data?.id}
                    className="hover:tw-bg-slate-100 tw-cursor-pointer"
                    onClick={() => router.push(`/admin/order/${data?.id}`)}
                  >
                    <td>
                      <Link
                        href={`/admin/order/${data?.id}`}
                        className="text-primary"
                      >
                        #{data?.id}
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/admin/order/${data?.id}`}
                        className="text-primary"
                      >
                        {data?.basket[0]?.name}
                      </Link>
                    </td>
                    <td>
                      {data?.status === "paid" && (
                        <span className="badge badge-info">Ödendi</span>
                      )}
                      {data?.status === "send" && (
                        <span className="badge badge-success">Gönderildi</span>
                      )}
                      {data?.status === "error" && (
                        <span className="badge badge-danger">Hata Oluştu</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
