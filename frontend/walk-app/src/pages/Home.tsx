import Navbar from "../components/UI/Navbar";
import PromoSection from "../components/UI/Promocao";
import ProductGrid from "../components/UI/Produto";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PromoSection />
      <ProductGrid />
    </div>
  );
};

export default Home;