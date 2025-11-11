// import {Navigate} from 'react-router-dom'

// export default function PrivateRouter({children}) {
//     const userDate = localStorage.getItem('user');

//     // Se não houver usuario, redireciona para login
//     if(!userDate){
//         return <Navigate to="/login" replace />
//     }
//     // Se tiver usuario, renderizar a pagina normalmente
//     return children;

// }

import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
