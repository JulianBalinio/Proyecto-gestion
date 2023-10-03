import React, { useEffect, useState } from "react";
import { Modal, Paper, Typography, TextField, Button } from "@mui/material/";
import styles from "./index.module.scss";

export default function AttributesModal({
  title,
  open = false,
  fields = [],
  defaultValues,
  onClose,
  handleSave,
}) {
  const [attributes, setAttributes] = useState();

  useEffect(() => {
    setAttributes(defaultValues);
  }, [defaultValues]);

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <Paper className={styles.box}>
            <Typography
              className={styles.title}
              variant="h5"
              textAlign="center"
            >
              Agregar {title}
            </Typography>
            {attributes &&
              fields.map((field, key) => {
                return (
                  <TextField
                    key={key}
                    label={field.label}
                    className={field.className}
                    value={attributes[field.name]}
                    required={field.required}
                    name={field.name}
                    fullWidth={field.fullWidth}
                    onChange={(e) =>
                      setAttributes((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                  />
                );
              })}

            <Button
              color="primary"
              onClick={() => handleSave(attributes)}
              variant="contained"
              className={styles.button}
              // disabled={!category}
            >
              Agregar
            </Button>
          </Paper>
        </Modal>
      )}
    </>
  );
}
