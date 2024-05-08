import SideBar from "./SideBar";
import { getCurrentUser } from "../../actions/getCurrentUser";
const Layout = async (props) => {
  const User = await getCurrentUser();
  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <>
        <section id="vendor_area" className="tw-mt-12">
          <div className="container-fluid">
            <div className="row">
              <SideBar />
              <div className="col-sm-12 col-md-12 col-lg-10 col_xl_10">
                <div className="tab-content dashboard_content">
                  <div className="tab-pane fade show active">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <div>Siteye Girme Yetkiniz Yoktur...</div>;
  }
};

export default Layout;
