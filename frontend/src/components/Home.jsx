// import RecoveryPassword from "./PasswordRecocery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecoveryPassword from "./PasswordRecocery";
import { RecoveryUser } from "./RecoveryUser";
// import Formulario from "./Formulario";
import Formulario from "./Formulario";
import { LoginUser } from "./Login";

function Home(){
    return(
        <>

        <Router>
            <Routes>
                <Route path="/" element={<Formulario />} />
                <Route path="login" element={ <LoginUser/> } />
                <Route path="recupera-senha" element={<RecoveryPassword />} />
                <Route path="recupera-user" element={ <RecoveryUser /> } />
            </Routes>
        </Router>
        </>
    )
}

export default Home