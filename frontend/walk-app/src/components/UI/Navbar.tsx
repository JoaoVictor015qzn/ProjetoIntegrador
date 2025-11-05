import { Search, Heart, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#1E1E1E] text-white text-center py-2 text-sm">
        Roupas Sustentáveis e com melhor qualidade!
      </div>

      {/* Main nav */}
      <div className="flex justify-between items-center px-8 py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold">WALK</h1>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 ml-4">
            <input
              type="text"
              placeholder="Buscar na Walk"
              className="outline-none text-sm"
            />
            <Search size={18} className="text-gray-500 ml-2" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
          <button className="bg-gray-200 text-black px-4 py-1 rounded-full">
            Colabore
          </button>
          <button className="bg-black text-white px-4 py-1 rounded-full">
            Entrar
          </button>
        </div>
      </div>

      {/* Categories */}
      <nav className="flex justify-center gap-8 border-t border-gray-200 py-2 text-sm">
        <span className="text-red-500 font-semibold cursor-pointer">
          Promoções
        </span>
        <span className="cursor-pointer">Feminino</span>
        <span className="cursor-pointer">Masculino</span>
        <span className="cursor-pointer">Kids</span>
        <span className="cursor-pointer">Tecidos</span>
        <span className="cursor-pointer">Acessórios</span>
        <span className="cursor-pointer">Calçados</span>
        <span className="cursor-pointer">Novidades</span>
      </nav>
    </header>
  );
};

export default Navbar;