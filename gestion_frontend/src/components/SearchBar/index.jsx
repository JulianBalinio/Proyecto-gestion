import React from "react";
import { TextField } from "@mui/material";
import styles from "./index.module.scss";

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchBarContainer}>
      <TextField
        className={styles.searchBar}
        label="Buscar producto..."
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
      />
    </div>
  );
}

export default SearchBar;
