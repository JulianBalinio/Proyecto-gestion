import { AuthProvider } from "./services/AuthContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Login from "./modules/Login/pages/Login";
import Inventario from "./modules/Inventario/pages/Inventario";
import Ventas from "./modules/Ventas/pages/Ventas";
import Historial from "./modules/Historial/pages/Historial";
import VerHistorial from "./modules/Historial/pages/VerHistorial";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Inventario />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/historial/verHistorial" element={<VerHistorial />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
