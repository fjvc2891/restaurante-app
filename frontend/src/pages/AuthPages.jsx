import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="glass p-10 rounded-3xl w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="bg-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-black">
                        <LogIn size={32} />
                    </div>
                    <h1 className="text-3xl font-black">Bienvenido</h1>
                    <p className="text-text-secondary mt-2">Ingresa a tu cuenta para pedir</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 text-lg font-bold"
                    >
                        {loading ? 'Entrando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-secondary">
                    ¿No tienes cuenta? <Link to="/register" className="text-amber-500 hover:underline">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // In a real app we'd use a register service. Using simplified logic here.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { default: api } = await import('../services/api');
            await api.post('/auth/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.password || 'Error al registrarse. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-6">
            <div className="glass p-10 rounded-3xl w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black">Crea tu Cuenta</h1>
                    <p className="text-text-secondary mt-2">Únete a nuestra experiencia gastronómica</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Usuario</label>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nombre</label>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Apellido</label>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Repetir Contraseña</label>
                        <input
                            type="password"
                            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            required
                        />
                    </div>

                    {error && <p className="md:col-span-2 text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 btn-primary py-4 text-lg font-bold"
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-secondary text-sm">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-amber-500 hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};
