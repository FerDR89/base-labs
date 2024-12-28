import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-screen max-w-screen-xl">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
