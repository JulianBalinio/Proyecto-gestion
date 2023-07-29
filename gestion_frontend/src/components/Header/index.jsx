import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./index.module.scss";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            FácilGestor
          </Typography>

          <div className={styles.linkContainer}>
            <Link to="/">Inventario</Link>
            <Link to="/ventas">Ventas</Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
