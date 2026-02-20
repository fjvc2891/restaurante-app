import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { count } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                RESTAURANTE PREMIUM
            </Link>

            <div className="flex items-center gap-8">
                <Link to="/" className="hover:text-amber-500 transition-colors hidden md:block">Menu</Link>
                <Link to="/orders" className="hover:text-amber-500 transition-colors hidden md:block">Mis Pedidos</Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative p-2 hover:bg-slate-700/50 rounded-full transition-colors"
                    >
                        <ShoppingCart size={24} />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {count}
                            </span>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium hidden sm:block">Hola, {user.first_name || user.username}</span>
                            <button
                                onClick={logout}
                                className="p-2 hover:text-red-400 transition-colors"
                                title="Cerrar Sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary py-2 px-4 text-sm">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
