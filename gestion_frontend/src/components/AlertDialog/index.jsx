import React from "react";
import { Typography } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import AlertFooter from "/src/components/AlertFooter";
import AlertIcon from "/src/components/AlertIcon";
// import classes from "./styles";

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
  console.log(title);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // BackdropProps={{ classes: { root: classes.backdropBg } }}
    >
      <div>
        <div>
          <CancelOutlined
            handleClose={handleClose}
            color={"primary"}
            fontSize={"inherit"}
          />
        </div>
        <div>
          <AlertIcon action={alertType} />
          <div>
            <Typography variant="h2" color="inherit">
              {title}
            </Typography>
            <Typography variant="h5" color={"textSecondary"}>
              {description}
            </Typography>
          </div>
        </div>

        <div>
          <AlertFooter
            alertType={alertType}
            handleAccept={actionAccept}
            handleClose={handleClose}
            showCheckbox={showCheckbox}
            showCancel={showCancel}
            extraButton={extraButton}
            confirmButtonLabel={confirmButtonLabel}
            buttonsDisabled={buttonsDisabled}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
