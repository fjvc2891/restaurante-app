import { Plus, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const MenuCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass overflow-hidden rounded-2xl group"
        >
            <div className="h-48 bg-slate-800 relative overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image_url || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <span className="text-4xl">🍽️</span>
                    </div>
                )}
                {product.featured && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Recomendado
                    </span>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <span className="text-amber-500 font-bold">${parseFloat(product.price).toLocaleString()}</span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10">
                    {product.description}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 btn-primary flex items-center justify-center gap-2 py-2"
                    >
                        <Plus size={18} /> Añadir
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuCard;
