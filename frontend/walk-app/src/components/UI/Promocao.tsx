import { Gift, Truck, Ticket } from "lucide-react";

const PromoSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-6 bg-white py-8 px-6">
      <div className="flex items-center gap-3 bg-gray-200 text-black px-6 py-4 rounded-xl w-full md:w-auto">
        <Gift />
        <span>Confira as ofertas especiais em kits</span>
      </div>
      <div className="flex items-center gap-3 bg-gray-200 text-black px-6 py-4 rounded-xl w-full md:w-auto">
        <Truck />
        <span>Frete grátis nas compras acima de R$100,00</span>
      </div>
      <div className="flex items-center gap-3 bg-gray-200 text-black px-6 py-4 rounded-xl w-full md:w-auto">
        <Ticket />
        <span>Confira todos os cupons ativos</span>
      </div>
    </section>
  );
};

export default PromoSection;