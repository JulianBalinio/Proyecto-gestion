import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material/";
import styles from "./index.module.scss";
import { useAlert } from "/src/common/hooks/useAlert";
import AlertDialog from "/src/components/AlertDialog";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";

export default function PricesModal({ open = true, onClose, fetchInventory }) {
  const [options, setOptions] = useState({
    brand: [],
    category: [],
    supplier: [],
  });
  const [inventoryRadioOption, setInventoryRadioOption] = useState("category");
  const [updateOption, setUpdateOption] = useState("percentage");
  const [selectedOption, setSelectedOption] = useState("");
  const [updateValue, setUpdateValue] = useState();
  const { showSuccessAlert, showErrorAlert, alertDialog, closeAlert } =
    useAlert();

  const handleSave = () => {
    InventoryCalls.updatePrices({
      action: (response) => {
        console.log(response, "response en el action");
        showSuccessAlert({
          handleAccept: () => {
            fetchInventory();
            closeAlert();
            onClose();
          },
          handleClose: () => {
            fetchInventory();
            closeAlert();
            onClose();
          },
        });
      },
      data: {
        [inventoryRadioOption]: selectedOption,
        priceUpdate: {
          updateType: updateOption,
          [updateOption]: updateValue,
        },
      },
      dealWithError: (error) => {
        showErrorAlert();
        console.log(error);
        console.log("aca");
      },
    });
  };

  const handleChange = (e) => {
    setSelectedOption("");
    setInventoryRadioOption(e.target.value);
  };

  const mapInventoryLabels = ({ update = false }) => {
    const labels = {
      categories: "Categoría",
      brands: "Marca",
      suppliers: "Proveedor",
      percentage: "Porcentaje",
      price: "Precio",
    };

    if (update) {
      return labels[updateOption];
    }

    return labels[inventoryRadioOption];
  };

  const inputEndIcon = {
    endAdornment: (
      <InputAdornment position="end">
        {updateOption === "percentage" ? "%" : "$"}
      </InputAdornment>
    ),
  };

  useEffect(() => {
    InventoryCalls.getOptions({
      action: (data) => setOptions(data),
    });
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={styles.box}>
        <Typography className={styles.title} variant="h4" textAlign="center">
          Actualizar precios
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            value={inventoryRadioOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value="category"
              name="category"
              control={<Radio />}
              label="Categoria"
            />
            <FormControlLabel
              value="brand"
              name="brand"
              control={<Radio />}
              label="Marca"
            />
            <FormControlLabel
              value="supplier"
              name="supplier"
              control={<Radio />}
              label="Proveedor"
            />
          </RadioGroup>
        </FormControl>

        <Select
          className={styles.categoryInput}
          displayEmpty
          aria-label="visible"
          value={selectedOption}
          required
          name="inventoryOptions"
          fullWidth={true}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <MenuItem value="">Seleccione</MenuItem>
          {options[inventoryRadioOption].map((option, key) => {
            return (
              <MenuItem key={key} value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            value={updateOption}
            onChange={(e) => setUpdateOption(e.target.value)}
          >
            <FormControlLabel
              value="percentage"
              label="Porcentaje"
              control={<Radio />}
            />
            <FormControlLabel
              value="price"
              label="Precio"
              control={<Radio />}
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label={mapInventoryLabels({ update: true })}
          className={styles.categoryInput}
          value={updateValue}
          InputProps={inputEndIcon}
          required
          name="price"
          fullWidth={true}
          onChange={(e) => setUpdateValue(e.target.value)}
        />
        <Button
          color="primary"
          onClick={handleSave}
          variant="contained"
          className={styles.button}
          disabled={!(selectedOption && updateValue)}
        >
          Confirmar
        </Button>
        <AlertDialog {...alertDialog} />
      </Paper>
    </Modal>
  );
}
