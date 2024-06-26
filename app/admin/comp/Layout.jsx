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
            <SideBar />

            <div className="tw-relative md:tw-ml-64 tw-mt-12">
              <main className="tw-px-4 md:tw-px-10 tw-mx-auto tw-w-full">
                {props.children}
              </main>
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
