import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./components/Login";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import RecuperacaoSenha from "./components/PasswordRecocery";
import ResetSenha from "./components/RecoveryUser";
import Usuarios from "./components/Usuarios";
import EditarUsuario from "./components/EditarUsuario";
import Sidebar from "./components/Sidebar";
import CreateMusicForm from "./components/CreateMusicForm";
import PrivateRoute from "./components/PrivateRouter";
import ListAllMusicos from "./components/ListAllMusicos";
import EditMusic from "./components/EditarMusico";
function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>

            {/* ROTAS PÚBLICAS */}
            <Route path="/login" element={<LoginUser />} />
            <Route path="/" element={<LoginUser />} />
            <Route path="/recupera-senha" element={<RecuperacaoSenha />} />
            <Route path="/reset-senha" element={<ResetSenha />} />

            {/* ROTAS PRIVADAS */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/formulario"
              element={
                <PrivateRoute>
                  <Formulario />
                </PrivateRoute>
              }
            />

            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Usuarios />
                </PrivateRoute>
              }
            />

            <Route
              path="/users/:id/editar"
              element={
                <PrivateRoute>
                  <EditarUsuario />
                </PrivateRoute>
              }
            />

            <Route
              path="/create-music"
              element={
                <PrivateRoute>
                  <CreateMusicForm />
                </PrivateRoute>
              }
            />

            <Route
              path="/musicos"
              element={
                <PrivateRoute>
                  <ListAllMusicos />
                </PrivateRoute>
              }
            />
            <Route
  path="musicos/editar/:id"
  element={
    <PrivateRoute>
      <EditMusic />
    </PrivateRoute>
  }
/>


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
