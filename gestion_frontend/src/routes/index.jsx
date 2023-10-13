import Login from "/src/modules/Login/pages/Login";
import Home from "/src/modules/Inventario/pages/Inventario"
import Ventas from "/src/modules/Ventas/pages/Ventas"
import Historial from "/src/modules/Historial/pages/Historial";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/inventario",
    element: <Home />,
  },
  {
    path: "/ventas",
    element: <Ventas />,
  },
  {
    path: "/historial",
    element: <Historial />
  },
  {
    path: "/historial/verHistorial",
    element: <Home />
  },

];

export default routes;
