import Header from './Header';
// import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// import ScrollToTop from "./ScrollToTop";


export default function Layout() {
    return (
        <>
            {/*<ScrollToTop />*/}
            <Header />
            <main className="flex-grow max-w-6xl mx-auto px-6 pt-56 md:pt-24">
                <Outlet />
            </main>
            {/*<Footer />*/}
        </>
    );
}
