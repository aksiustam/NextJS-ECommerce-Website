"use client";
import MyUser from "./MyUser";
import NewsMail from "./NewsMail";
import StockMail from "./StockMail";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import cronJobUser from "../../../actions/User/cronJobUser";
import Swal from "sweetalert2";
const UserClient = (props) => {
  const { users, stockmail, newsmail } = props;

  const cronJob = async () => {
    const res = await cronJobUser();
    if (res === true)
      await Swal.fire({
        icon: "success",
        title: "Bellek Boşaltıldı!",
        showConfirmButton: false,
        timer: 700,
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="product_details_tabs !tw-pt-0">
            <div className="tw-flex tw-gap-5">
              <div className="tw-my-4">
                <Link
                  href="/admin/user/mail"
                  data-toggle="tab"
                  className="theme-btn-one bg-black btn_sm "
                >
                  Mail Gönder
                </Link>
              </div>
              <div className="tw-my-4">
                <Link
                  href="/admin/user/allmail"
                  data-toggle="tab"
                  className="theme-btn-one bg-black btn_sm "
                >
                  Toplu Mail gönder
                </Link>
              </div>
              <div className="tw-my-4">
                <button
                  className="theme-btn-one bg-black btn_sm "
                  onClick={() => cronJob()}
                >
                  Kullanıcı Bellek Boşalt
                </button>
              </div>
            </div>
            <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
              <Tab eventKey="user" title="Kullanıcılar">
                <MyUser users={users} />
              </Tab>
              <Tab eventKey="stock" title="Stock">
                <StockMail stockmail={stockmail} />
              </Tab>
              <Tab eventKey="news" title="Haberler">
                <NewsMail newsmail={newsmail} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserClient;
