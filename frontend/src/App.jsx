import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./AppRoutes";
import AppRoutes from "./components/AppRouter";

function App() {
  return (
    <div className="container">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}
export default App;
