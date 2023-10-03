import React from "react";
import { Typography } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import AlertFooter from "/src/components/AlertFooter";
import AlertIcon from "/src/components/AlertIcon";
import classes from "./index.module.scss";

/**
 * @function AlertDialog
 * @param {boolean} open - State para abrir/cerrar la Alerta
 * @param {function} handleClose - Función para cerrar la Alerta
 * @param {string} title - Titulo de la Alerta
 * @param {string} description - Descripción de la Alerta
 * @param {function} actionAccept - Función que se ejecuta clickear el botón de aceptar
 * @param {"warning","error","success","info"} alertType - Tipo de alerta
 * @param {object} extraButton - Botón extra a mostrar en la alerta(opcional)
 * @param  {boolean} buttonsDisabled - Deshabilita los botones. Útil cuando se espera respuesta de algún servicio
 */
const AlertDialog = ({
  open,
  handleClose,
  title,
  description,
  actionAccept,
  alertType,
  extraButton,
  confirmButtonLabel,
  showCheckbox = false,
  showCancel = true,
  buttonsDisabled = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // BackdropProps={{ classes: { root: classes.backdropBg } }}
    >
      <div className={classes.root}>
        <div className={classes.closeIcon}>
          <CancelOutlined
            color={"primary"}
            onClick={handleClose}
            fontSize={"large"}
          />
        </div>

        <div className={classes.body}>
          <AlertIcon action={alertType} />
          <div>
            <Typography variant="h5" color="inherit">
              {title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {description}
            </Typography>
          </div>
        </div>

        <div className={classes.footer}>
          <AlertFooter
            alertType={alertType}
            handleClose={handleClose}
            handleAccept={actionAccept}
            showCancel={showCancel}
            confirmButtonLabel={confirmButtonLabel}
            buttonsDisabled={buttonsDisabled}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
