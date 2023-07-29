import React, { useState } from "react";
import { Modal, Paper, Typography, TextField, Button } from "@mui/material/";
import { InventoryCalls } from "/src/modules/inventario/utils/apiCalls";
import styles from "./index.module.scss";

export default function CategoryModal({ open = true, onClose }) {
  const [category, setCategory] = useState("");

  const handleSave = () => {
    InventoryCalls.createCategory({
      action: () => {
        onClose();
      },
      data: { name: category },
    });
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={styles.box}>
        <Typography className={styles.title} variant="h4" textAlign="center">
          Agregar categoría
        </Typography>
        <TextField
          label="Nombre"
          className={styles.categoryInput}
          value={category}
          required
          name="category"
          fullWidth={true}
          onChange={(e) => handleChange(e)}
        />
        <Button
          color="primary"
          onClick={handleSave}
          variant="contained"
          className={styles.button}
          disabled={!category}
        >
          Guardar
        </Button>
      </Paper>
    </Modal>
  );
}
