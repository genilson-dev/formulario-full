
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecoveryPassword from "./PasswordRecocery";
import RecoveryUser from "./RecoveryUser";
import Formulario from "./Formulario";
import LoginUser from "./Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formulario" element={<Formulario />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/recupera-senha" element={<RecoveryPassword />} />
      <Route path="/recupera-user" element={<RecoveryUser />} />
    </Routes>
  );
}
