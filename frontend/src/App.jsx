import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-primary">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/orders" element={<div className="container mx-auto p-12 text-center text-text-secondary">Página de pedidos en construcción... ¡Tu pedido fue enviado!</div>} />
              </Routes>
            </main>
            <footer className="border-t border-slate-800 py-12 text-center text-sm text-text-secondary">
              <p>&copy; 2024 Restaurante Premium. Todos los derechos reservados.</p>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
