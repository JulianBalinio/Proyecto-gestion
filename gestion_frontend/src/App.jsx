import { Route, Routes } from "react-router-dom";
import routes from "./routes/index";

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}

export default App;
