// src/components/UI/Navbar.tsx (atualizado com contadores)
import { User, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '../../context/useCart';
import { useFavorites } from '../../context/useFavorites';

export default function Navbar() {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const cartCount = cart.reduce((sum, item) => sum + item.quantidade, 0);
  const favCount = favorites.length;

  return (
    <header className="w-full">
      {/* NAVBAR PRETA */}
      <div className="bg-black text-white text-center text-sm py-2">
        Roupas Sustentáveis e com melhor qualidade!
      </div>

      <div className="flex flex-wrap justify-between items-center px-8 py-4 gap-6">
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="/assets/walk-logo.jpeg"
            alt="Logo"
            className="w-12 h-12 object-contain flex rounded-full"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/48x48/1E1E1E/FFF?text=W")}
          />
        </Link>

        {/* PESQUISA */}
        <div className="flex items-center flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full border text-black border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 flex items-center justify-center"
          />
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          <Link to="/" title="Entrar">
            <User className="cursor-pointer hover:text-green-600 w-6 h-6" />
          </Link>
          
          <Link to="/favoritos" title="Favoritos" className="relative">
            <Heart className="cursor-pointer hover:text-green-600 w-6 h-6" />
            {favCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{favCount}</span>}
          </Link>
          
          <Link to="/carrinho" title="Carrinho" className="relative">
            <ShoppingCart className="cursor-pointer hover:text-green-600 w-6 h-6" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>}
          </Link>

          <Link to="/" className="text-gray-700 hover:text-gray-600 font-medium">
            Entrar
          </Link>
        </div>
      </div>

      {/* CATEGORIAS */}
      <ul className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm py-3 text-gray-800 border-t border-gray-200">
        <li className="text-red-500 font-medium cursor-pointer hover:underline">
          Promoções
        </li>
        <li className="cursor-pointer hover:text-gray-600">Feminino</li>
        <li className="cursor-pointer hover:text-gray-600">Masculino</li>
        <li className="cursor-pointer hover:text-gray-600">Kids</li>
        <li className="cursor-pointer hover:text-gray-600">Tecidos</li>
        <li className="cursor-pointer hover:text-gray-600">Acessórios</li>
        <li className="cursor-pointer hover:text-gray-600">Calçados</li>
        <li className="cursor-pointer hover:text-gray-600">Novidades</li>
      </ul>
    </header>
  );
}