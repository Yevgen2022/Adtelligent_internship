import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
// import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      {/*<ScrollToTop />*/}
      <Header />
      <main className="flex-grow mx-auto px-6 py-14 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
