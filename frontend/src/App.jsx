import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./components/Login";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import RecuperacaoSenha from "./components/PasswordRecocery";
import ResetSenha from "./components/RecoveryUser";
// import PrivateRoute from "./components/PrivateRouter"; // <-- importa aqui
import Usuarios from "./components/Usuarios";
import EditarUsuario from "./components/EditarUsuario"
function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/" element={<LoginUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/recupera-senha" element={<RecuperacaoSenha />} />
        <Route path="/reset-senha" element={<ResetSenha />} />
        <Route path="/users" element={<Usuarios />} />
        <Route path="/users/:id/editar" element={<EditarUsuario />} />

        {/* Rotas privadas */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/users" element={<Usuarios />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;



