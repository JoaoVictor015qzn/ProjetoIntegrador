import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User, ShoppingBag, Settings } from "lucide-react";
import icon from "../../assets/icon.png";

export default function Sidebar() {
  const [openAccount, setOpenAccount] = useState(true);
  const [openPurchases, setOpenPurchases] = useState(false);
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
    <aside
      className="
        w-64 sticky left-0 
        top-[110px]   
        bottom-0    
        flex flex-col overflow-y-auto
        pb-6 px-6 
        z-40 
      "
    >
      <div className="flex items-center gap-1 mb-3 pl-1 pt-1">
        <img
          src={icon}
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full object-cover border border-gray-200"
        />

        <div className="flex flex-col">
          <span className="font-extrabold text-gray-900 text-sm leading-tight whitespace-nowrap">
            Gustavo Senna
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* MINHA CONTA */}
        <div>
          <button
            onClick={() => setOpenAccount(!openAccount)}
            className="flex items-center justify-between w-full py-2 group select-none"
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
            className="flex items-center justify-between w-full py-2 group select-none"
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

        {/* CONFIGURAÇÕES */}
        <div className="mt-2">
          <Link
            to="/config"
            className="flex items-center gap-3 text-gray-900 py-2 hover:bg-gray-50 rounded-md transition-colors pl-0"
          >
            <Settings size={18} className="stroke-[2.5]" />
            <span className="font-bold text-sm">Configurações</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
