const Navbar = () => {
  return (
    <header className="w-full bg-[#1E1E1E] text-white flex flex-col items-center">
      <div className="flex items-center px-8 py-5 text-sm">
        <span>Roupas Sustentáveis e com melhor qualidade!</span>
      </div>

      <nav className="w-full bg-white text-black flex flex-col md:flex-row md:items-center md:justify-between px-10 py-4 shadow">
        <div className="flex items-center gap-2">
          <div className="font-bold text-2xl">
            <img src="assets/walk-logo.jpeg"
            className="w-12 h-12 rounded-full shadow-lg hover:opacity-90"/>
          </div>
          <input
            type="text"
            placeholder="Buscar na Walk"
            className="border border-gray-300 px-3 py-1 rounded-md text-sm ml-4"
          />
        </div>

        <ul className="flex gap-6 mt-4 md:mt-0 text-sm">
          <li className="text-red-500 cursor-pointer">Promoções</li>
          <li className="cursor-pointer">Feminino</li>
          <li className="cursor-pointer">Masculino</li>
          <li className="cursor-pointer">Kids</li>
          <li className="cursor-pointer">Tecidos</li>
          <li className="cursor-pointer">Acessórios</li>
          <li className="cursor-pointer">Calçados</li>
          <li className="cursor-pointer">Novidades</li>
        </ul>

         <div className="flex gap-4">
          <button className="bg-gray-800 text-white px-4 py-1 rounded-full">
            Colabore
          </button>
          <button className="bg-gray-800 text-white px-4 py-1 rounded-full">
            Entrar
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;