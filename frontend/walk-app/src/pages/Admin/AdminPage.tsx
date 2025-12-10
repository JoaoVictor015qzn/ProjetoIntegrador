import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import Chatbot from "../../components/UI/Chatbot";
import ProductGrid from "../../components/UI/Produto";
import { Star, MapPin, Package, TrendingUp, Search } from "lucide-react";
import "./admin.css";


const StoreHome = () => {
  const seller = {
    name: "EcoWalk Store",
    avatar: "/assets/walk-logo.jpeg",
    rating: 4.9,
    reviews: 127,
    location: "São Paulo, SP",
    joinedYear: "2023",
    productsForSale: 86,
    totalSold: 458,
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />

      <div className="store-hero">
        <div className="hero-content">
          <h1>Bem-vindo à {seller.name}</h1>
          <p>Roupas sustentáveis com estilo e consciência</p>
        </div>
      </div>

      <div className="seller-profile-section">
        <div className="seller-card">
          <img src={seller.avatar} alt={seller.name} className="seller-avatar" />
          
          <div className="seller-info">
            <h2>{seller.name}</h2>
            <div className="rating">
              <Star fill="#FFD700" strokeWidth={0} size={20} />
              <span>{seller.rating} ({seller.reviews} avaliações)</span>
            </div>
            <p className="location">
              <MapPin size={16} /> {seller.location} • No Walk desde {seller.joinedYear}
            </p>
          </div>

          <div className="seller-stats">
            <div className="stat">
              <Package size={28} />
              <div>
                <strong>{seller.productsForSale}</strong>
                <p>à venda</p>
              </div>
            </div>
            <div className="stat">
              <TrendingUp size={28} />
              <div>
                <strong>{seller.totalSold}</strong>
                <p>vendidos</p>
              </div>
            </div>
          </div>

          <button className="follow-store-btn">Seguir loja</button>
        </div>
      </div>

      <div className="store-search-bar">
        <div className="search-input-wrapper">
          <Search size={24} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar nesta loja..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="store-filters">
        <select><option>Mais relevantes</option></select>
        <select><option>Todas as categorias</option></select>
        <select><option>Tamanho</option></select>
        <select><option>Condição</option></select>
        <button className="clear-filters">Limpar filtros</button>
      </div>

      <div className="store-products">
        <ProductGrid />
      </div>

      <Chatbot />
    </>
  );
};

export default StoreHome;
