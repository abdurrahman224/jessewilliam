import { Outlet } from 'react-router-dom';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';
import ScrollToTop from '../../components/common/ScrollToTop';

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <header className="sticky top-0 z-50">
        <NavbarLayout />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </>
  );
};

export default RootLayout;
