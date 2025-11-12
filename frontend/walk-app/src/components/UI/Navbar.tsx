import { Search, Heart, ShoppingCart, Phone } from "lucide-react";
// Supondo que você esteja usando react-router-dom
// Se não estiver, remova esta linha
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full flex flex-col">
      {/* Top bar preta */}
      <div className="bg-[#1E1E1E] text-white text-center text-sm py-1 z-20 relative">
        Roupas Sustentáveis e com melhor qualidade!
      </div>

      {/* Nav principal */}
      <nav className="w-full bg-white flex items-center justify-between px-10 py-4 shadow-md z-10 relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="../../../public/assets/walk-logo.jpeg"
            alt="Walk Logo"
            className="w-12 h-12 rounded-full"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/48x48/1E1E1E/FFF?text=W")}
          />
        </div>

        {/* Barra de busca */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-1 w-[400px] bg-white">
          <input
            type="text"
            placeholder="Buscar na Walk"
            className="flex-1 text-sm outline-none bg-transparent"
          />
          <Search size={18} className="text-gray-600" />
        </div>

        {/* Ícones e botões */}
        <div className="flex items-center gap-5">
          <Phone className="text-gray-700 cursor-pointer" />
          <Heart className="text-gray-700 cursor-pointer" />
          <ShoppingCart className="text-gray-700 cursor-pointer" />

          {/* Envolvendo o botão Entrar com o Link */}
          <Link to="/">
            <button className="bg-[#1E1E1E] text-white px-5 py-1 rounded-full text-sm hover:bg-black transition">
              Entrar
            </button>
          </Link>
        </div>
      </nav>

      {/* Menu de categorias — CORRIGIDO
        Adicionado 'px-4' para espaçamento lateral em telas pequenas.
      */}
      <div className="bg-white border-t border-gray-200 shadow-sm mt-[2px] px-4">
        {/* CORREÇÃO: 
          1. Adicionado 'flex-wrap' para que os itens quebrem a linha em telas menores.
          2. Alterado 'gap-8' para 'gap-x-8' (horizontal) e 'gap-y-2' (vertical) para controlar o espaçamento quando a linha quebrar.
        */}
        <ul className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm py-3 text-gray-800">
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
          {/* Você pode adicionar mais categorias e elas quebrarão a linha automaticamente */}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;