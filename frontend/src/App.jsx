import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./components/Login";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import RecuperacaoSenha from "./components/PasswordRecocery";
import ResetSenha from "./components/RecoveryUser";
import Usuarios from "./components/Usuarios";
import EditarUsuario from "./components/EditarUsuario";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<LoginUser />} />
            <Route path="/" element={<LoginUser />} />
            <Route path="/home" element={<Home />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/recupera-senha" element={<RecuperacaoSenha />} />
            <Route path="/reset-senha" element={<ResetSenha />} />
            <Route path="/users" element={<Usuarios />} />
            {/* <Route path="/user/update" element={<EditarUsuario />} /> */}
            <Route path="/users/:id/editar" element={<EditarUsuario />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
