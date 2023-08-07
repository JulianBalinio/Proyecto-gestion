import { AuthProvider } from "./services/AuthContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Login from "./modules/Login/pages/Login";
import Inventario from "./modules/Inventario/pages/Inventario";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Inventario />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
