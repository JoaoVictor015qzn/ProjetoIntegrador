import Navbar from "../components/UI/Navbar";
import PromoSection from "../components/UI/Promocao";
import ProductGrid from "../components/UI/Produto";
import './Home.css'
import Chatbot from "../components/UI/Chatbot";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PromoSection />
      <ProductGrid />
      <Chatbot />
    </div>
  );
};

export default Home;