import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./components/Login";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import RecuperacaoSenha from "./components/PasswordRecocery";
import ResetSenha from "./components/RecoveryUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/recupera-senha" element={<RecuperacaoSenha />} />
        <Route path="/reset-senha" element={<ResetSenha />} />
        {/* rota padrão */}
        <Route path="/" element={<LoginUser />} />
      </Routes>
    </Router>
  );
}

export default App;
