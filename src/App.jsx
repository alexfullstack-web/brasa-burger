import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';

const MenuPage = lazy(() => import('./pages/MenuPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Suspense fallback={<div className="page-loader" aria-label="Carregando" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<MenuPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
      <Toast />
    </>
  );
}
