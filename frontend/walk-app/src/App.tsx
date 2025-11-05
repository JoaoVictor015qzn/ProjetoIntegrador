import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/recover-password" element={<RecoverPassword />}/>
      </Routes>
    </Router>
  );
}

export default App;