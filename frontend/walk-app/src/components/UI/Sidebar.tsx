import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User, ShoppingBag, Settings, Menu, Store } from "lucide-react";
import icon from "../../assets/icon.png";

export default function Sidebar() {
  const [openAccount, setOpenAccount] = useState(true);
  const [openPurchases, setOpenPurchases] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ⭐ sidebar mobile

  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path: string) => {
    const isActive = currentPath === path;
    return `block py-1.5 text-sm transition-colors ${
      isActive
        ? "text-blue-700 font-bold"
        : "text-gray-600 font-medium hover:text-gray-900"
    }`;
  };

  return (
    <>
      {/* BOTÃO - MOBILE */}
      <button
        className="lg:hidden fixed top-16 left-4 z-50 p-2 bg-white shadow-md rounded-md"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* MOBILE */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static
          top-0 lg:top-[110px]
          left-0
          h-full lg:h-auto
          w-64
          bg-white lg:bg-transparent
          shadow-md lg:shadow-none
          transform lg:transform-none
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-50
          overflow-y-auto
          pb-6 px-6
        `}
      >
        {/* PERFIL */}
        <div className="flex items-center gap-1 mb-3 pl-1 pt-4 lg:pt-1">
          <img
            src={icon}
            alt="Foto de perfil"
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
          />

          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 text-sm leading-tight whitespace-nowrap">
              Usuário
            </span>
          </div>
        </div>

        {/* LISTAS */}
        <div className="flex flex-col gap-2 mt-2">
          {/* MINHA CONTA */}
          <div>
            <button
              onClick={() => setOpenAccount(!openAccount)}
              className="flex items-center justify-between w-full py-2 select-none"
            >
              <div className="flex items-center gap-3 text-gray-900">
                <User size={18} className="stroke-[2.5]" />
                <span className="font-bold text-sm">Minha conta</span>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  openAccount ? "rotate-180" : ""
                }`}
              />
            </button>

            {openAccount && (
              <ul className="pl-10 mt-1 flex flex-col gap-0.5">
                <li>
                  <Link to="/config" className={getLinkClass("/perfil")}>
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/cartoes" className={getLinkClass("/cartoes")}>
                    Meus cartões
                  </Link>
                </li>
                <li>
                  <Link to="/enderecos" className={getLinkClass("/enderecos")}>
                    Endereços
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* MINHAS COMPRAS */}
          <div className="mt-2">
            <button
              onClick={() => setOpenPurchases(!openPurchases)}
              className="flex items-center justify-between w-full py-2 select-none"
            >
              <div className="flex items-center gap-3 text-gray-900">
                <ShoppingBag size={18} className="stroke-[2.5]" />
                <span className="font-bold text-sm">Minhas compras</span>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  openPurchases ? "rotate-180" : ""
                }`}
              />
            </button>

            {openPurchases && (
              <ul className="pl-10 mt-1 flex flex-col gap-0.5">
                <li>
                  <Link to="/entregas" className={getLinkClass("/entregas")}>
                    Entregas
                  </Link>
                </li>
                <li>
                  <Link to="/carrinho" className={getLinkClass("/carrinho")}>
                    Meu carrinho
                  </Link>
                </li>
                <li>
                  <Link to="/favoritos" className={getLinkClass("/favoritos")}>
                    Favoritos
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* MINHA LOJA */}
          <div className="mt-2">
            <Link
              to="/loja"
              className="flex items-center gap-3 text-gray-900 py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Store size={18} className="stroke-[2.5]" />
              <span className="font-bold text-sm">Minha Loja</span>
            </Link>
          </div>

          {/* CONFIGURAÇÕES */}
          <div className="mt-2">
            <Link
              to="/config"
              className="flex items-center gap-3 text-gray-900 py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Settings size={18} className="stroke-[2.5]" />
              <span className="font-bold text-sm">Configurações</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
