import { MenuItem, Typography } from "@mui/material";
import { getFields, validate } from "../../data";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import styles from "./index.module.scss";

export default function ChangesModalTemplate({
  producto,
  options,
  open,
  onClose,
  edit,
  handleChange,
  handleDelete,
  handleSave,
}) {
  const fields = getFields(producto, options, styles);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "25%" } }}
    >
      <div className={styles.drawerContainer}>
        <List className={styles.list}>
          <ListItem>
            <Typography className={styles.title}>
              {edit ? "Editar" : "Agregar"} Producto
            </Typography>
          </ListItem>

          <ListItem className={styles.form}>
            {fields.map((field, key) => {
              return (
                <TextField
                  key={key}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  required={field.required}
                  fullWidth={true}
                  autoFocus={field.autoFocus}
                  className={field.className}
                  select={field.select}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(e)}
                >
                  {field.select &&
                    field.options.map((option, key) => {
                      return (
                        <MenuItem key={key} value={option.id}>
                          {option.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              );
            })}
          </ListItem>

          <ListItem>
            {edit && (
              <Button
                color="error"
                fullWidth={true}
                onClick={handleDelete}
                sx={{ margin: 2 }}
                variant="contained"
              >
                Eliminar
              </Button>
            )}
          </ListItem>
          <ListItem>
            <Button
              color="primary"
              fullWidth={true}
              onClick={handleSave}
              sx={{ margin: 2 }}
              variant="contained"
              disabled={validate(fields)}
            >
              {edit ? "Actualizar" : "Guardar"}
            </Button>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
