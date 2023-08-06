import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { defaultValues, getFields } from "../../modules/Login/data";
import TextField from "@mui/material/TextField";
import styles from "./index.module.scss";

export default function LoginForm({ isLogin, setIsLogin, onSubmit }) {
  const [user, setUser] = useState(defaultValues);

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

  const fields = getFields(user, isLogin);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <Typography variant="h4">{isLogin ? "Login" : "Registro"}</Typography>
        {fields.map((field, key) => {
          return (
            <TextField
              key={key}
              label={field.label}
              type={field.type}
              name={field.name}
              shrink={field.shrink}
              value={field.value}
              required={field.required}
              fullWidth={true}
              autoFocus={field.autoFocus}
              className={field.className}
              select={field.select}
              onChange={(e) => handleChange(e)}
            />
          );
        })}
        <br />
        <div className={styles.actionButtons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Crear cuenta" : "Ya tengo cuenta"}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </Button>
        </div>
      </form>
    </div>
  );
}
