import { useState, useEffect } from 'react';
import api from '../services/api';
import MenuCard from '../components/MenuCard';
import { ChefHat, Utensils, Coffee, IceCream } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, itemRes] = await Promise.all([
                    api.get('/menu/categories/'),
                    api.get('/menu/items/')
                ]);
                setCategories(catRes.data.results || catRes.data);
                setItems(itemRes.data.results || itemRes.data);
            } catch (err) {
                console.error("Error fetching menu:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredItems = selectedCategory === 'all'
        ? items
        : items.filter(item => item.category_name.toLowerCase() === selectedCategory.toLowerCase());

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-4">Nuestra Carta</h1>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    Descubre los sabores de nuestra cocina tradicional con un toque premium.
                    Ingredientes frescos y preparaciones artesanales.
                </p>
            </header>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'all' ? 'bg-amber-500 text-black' : 'bg-slate-800 hover:bg-slate-700'}`}
                >
                    Todos
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.name ? 'bg-amber-500 text-black' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {filteredItems.map(item => (
                    <MenuCard key={item.id} product={item} />
                ))}
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-text-secondary">
                    No hay platos disponibles en esta categoría por el momento.
                </div>
            )}
        </div>
    );
};

export default MenuPage;
