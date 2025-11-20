// src/components/UI/Navbar.tsx
import { User, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/use.Search";  // <-- CORRETO

export default function Navbar() {
  const { setSearchTerm } = useSearch();

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full">
      <div className="bg-black text-white text-center text-sm py-2">
        Roupas Sustentáveis e com melhor qualidade!
      </div>

      <div className="flex flex-wrap justify-between items-center px-8 py-4 gap-6">
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="/assets/walk-logo.jpeg"
            alt="Logo"
            className="w-12 h-12 object-contain flex rounded-full"
          />
        </Link>

        <div className="flex items-center flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Buscar produtos..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="w-full border text-black border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          <Link to="/" title="Entrar">
            <User className="cursor-pointer hover:text-green-600 w-6 h-6" />
          </Link>

          <Link to="/favoritos" title="Favoritos">
            <Heart className="cursor-pointer hover:text-green-600 w-6 h-6" />
          </Link>

          <Link to="/carrinho" title="Carrinho">
            <ShoppingCart className="cursor-pointer hover:text-green-600 w-6 h-6" />
          </Link>

          <Link to="/" className="text-gray-700 hover:text-gray-600 font-medium">
            Entrar
          </Link>
        </div>
      </div>

      <ul className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm py-3 text-gray-800 border-t border-gray-200">
        <li onClick={() => handleScrollToSection("promocoes")} className="text-red-500 font-medium cursor-pointer hover:underline">
          Promoções
        </li>
        <li onClick={() => handleScrollToSection("feminino")} className="cursor-pointer hover:text-gray-600">
          Feminino
        </li>
        <li onClick={() => handleScrollToSection("masculino")} className="cursor-pointer hover:text-gray-600">
          Masculino
        </li>
        <li onClick={() => handleScrollToSection("kids")} className="cursor-pointer hover:text-gray-600">
          Kids
        </li>
        <li onClick={() => handleScrollToSection("tecidos")} className="cursor-pointer hover:text-gray-600">
          Tecidos
        </li>
        <li onClick={() => handleScrollToSection("acessorios")} className="cursor-pointer hover:text-gray-600">
          Acessórios
        </li>
        <li onClick={() => handleScrollToSection("calcados")} className="cursor-pointer hover:text-gray-600">
          Calçados
        </li>
        <li onClick={() => handleScrollToSection("novidades")} className="cursor-pointer hover:text-gray-600">
          Novidades
        </li>
      </ul>
    </header>
  );
}