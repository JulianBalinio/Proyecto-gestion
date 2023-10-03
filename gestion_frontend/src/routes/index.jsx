import Login from "/src/modules/Login/pages/Login";
import Home from "/src/modules/Inventario/pages/Inventario"
import Ventas from "/src/modules/Ventas/pages/Ventas"

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
];

export default routes;
