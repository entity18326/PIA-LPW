import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetail from './pages/ReviewDetail';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import ComparePage from './pages/ComparePage';
import SearchPage from './pages/SearchPage';
import BrandPage from './pages/BrandPage';
import LoginPage from './pages/LoginPage';
import ProductosPage from './pages/ProductosPage';
import DashboardPage from './pages/DashboardPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando la ruta cambia, hacer scroll al inicio
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/reviews/:id" element={<ReviewDetail />} />
              <Route path="/noticias" element={<NewsPage />} />
              <Route path="/noticias/:id" element={<NewsDetail />} />
              <Route path="/comparar" element={<ComparePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/marcas/:brand" element={<BrandPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;