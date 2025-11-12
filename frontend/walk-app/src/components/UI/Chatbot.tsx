import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Opções do chatbot baseadas no Figma
  const options = [
    "Promoções especiais",
    "Lista de roupas semi-novas",
    "Contato para suporte",
    "Modelos mais vendidos",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botão principal com logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white w-12 h-12 rounded-full shadow-lg hover:opacity-90 flex items-center justify-center transition"
        title="Abrir Chatbot"
      >
        <img
          src="assets/walk-logo.jpeg"
          alt="Logo Walk"
          className="w-12 h-12 rounded-full"
        />
      </button>

      {/* Popup do Chatbot */}
      {isOpen && (
        <div className="bg-gray-100 text-black p-4 rounded-lg shadow-xl mt-3 w-80 border border-gray-200 transform transition-all duration-300 origin-bottom-right">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-sm">Selecione uma opção para ajuda</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black text-xs"
            >
              X
            </button>
          </div>

          {/* Lista de opções */}
          <ul className="space-y-2 mb-4">
            {options.map((option, index) => (
              <li key={index}>
                <button className="w-full text-left bg-white px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition shadow-sm">
                  {option}
                </button>
              </li>
            ))}
          </ul>

          {/* Campo de input */}
          <input
            type="text"
            placeholder="Pergunte..."
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;