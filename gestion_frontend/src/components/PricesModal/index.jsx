import React, { useState } from "react";
import { Modal, Paper, Typography, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material/";
import styles from "./index.module.scss";

export default function PricesModal({ open = true, onClose }) {
  const [category, setCategory] = useState("");

  const handleSave = () => {
   
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={styles.box}>
        <Typography className={styles.title} variant="h4" textAlign="center">
          Actualizar precios
        </Typography>
        <TextField
          label="Categoria"
          className={styles.categoryInput}
          value={category}
          required
          name="category"
          fullWidth={true}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Marca"
          className={styles.categoryInput}
          value={category}
          required
          name="category"
          fullWidth={true}
          onChange={(e) => handleChange(e)}
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="percentage" control={<Radio />} label="Porcentaje" />
            <FormControlLabel value="price" control={<Radio />} label="Precio" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Porcentaje/Precio"
          className={styles.categoryInput}
          value={category}
          required
          name="price"
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
