import { useEffect } from "react";
import { useCart } from "../context/CartContext";

interface InitAppProps {
  children: React.ReactNode;
}

const InitApp = ({ children }: InitAppProps) => {
  const { loadCart } = useCart();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadCart();
    }
  }, [loadCart]);

  return <>{children}</>;
};
export default InitApp;