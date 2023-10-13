import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./index.module.scss";

export default function Header({ isLogin = false }) {
  return (
    <Box className={styles.box}>
      <AppBar>
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            FácilGestor
          </Typography>

          {!isLogin && (
            <div className={styles.linkContainer}>
              <Link to="/">Inventario</Link>
              <Link to="/ventas">Ventas</Link>
              <Link to="/historial">Historial</Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
