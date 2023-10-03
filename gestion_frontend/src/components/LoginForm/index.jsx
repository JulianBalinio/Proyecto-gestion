import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { getFields } from "../../modules/Login/data";
import TextField from "@mui/material/TextField";
import styles from "./index.module.scss";

export default function LoginForm({ onSubmit, error }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  const fields = getFields(user);

  const validateSubmit = (fields) => {
    return fields.some((field) => field.required && field.value === "");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <Typography variant="h5">Iniciar sesión</Typography>
        {fields.map((field, key) => {
          return (
            <TextField
              key={key}
              label={field.label}
              type={field.type}
              name={field.name}
              shrink={field.shrink}
              value={field.value}
              InputLabelProps={field.inputLabelProps}
              required={field.required}
              fullWidth={true}
              autoFocus={field.autoFocus}
              className={field.className}
              placeholder={field.placeholder}
              select={field.select}
              onChange={(e) => handleChange(e)}
            />
          );
        })}

        <div className={styles.errorContainer}>
          <Typography color={"#d32f2f"}>{error}</Typography>
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={validateSubmit(fields)}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
