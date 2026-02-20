import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useState } from 'react';

const CartPage = () => {
    const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        if (!isAuthenticated) return navigate('/login');

        setLoading(true);
        setError(null);
        try {
            const orderData = {
                table_number: 1, // Mock table number
                notes: "Pedido desde la web",
                items: items.map(i => ({
                    menu_item: i.id,
                    quantity: i.quantity,
                    notes: ""
                }))
            };

            await api.post('/orders/', orderData);
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError("No se pudo procesar el pedido. Intenta de nuevo.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-slate-800 p-8 rounded-full mb-6">
                <ShoppingBag size={64} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-text-secondary mb-8 max-w-sm">
                Parece que aún no has añadido nada delicioso a tu pedido.
            </p>
            <Link to="/" className="btn-primary">Ver Menú</Link>
        </div>
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-black mb-8">Resumen de Pedido</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="glass p-6 rounded-2xl flex items-center gap-6">
                            <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-amber-500 font-medium">${parseFloat(item.price).toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:text-amber-500 transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:text-amber-500 transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="glass p-8 rounded-3xl sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Total</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-text-secondary">
                                <span>Subtotal</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-text-secondary">
                                <span>Servicio (5%)</span>
                                <span>${(total * 0.05).toLocaleString()}</span>
                            </div>
                            <div className="border-t border-slate-700 pt-4 flex justify-between text-2xl font-black">
                                <span>Total</span>
                                <span className="text-amber-500">${(total * 1.05).toLocaleString()}</span>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg"
                        >
                            {loading ? "Procesando..." : (
                                <>
                                    Confirmar Pedido <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        {!isAuthenticated && (
                            <p className="text-center text-xs text-text-secondary mt-4">
                                Necesitas iniciar sesión para completar el pedido.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
