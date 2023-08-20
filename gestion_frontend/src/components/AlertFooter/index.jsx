import React from "react";
import { Typography } from "@mui/material";
import ButtonMUI from "@mui/material/Button";
// import Checkbox from "components/atoms/Checkbox";
// import classes from "./index.module.scss";

const AlertFooter = ({
  alertType,
  handleClose,
  handleAccept,
  showCancel = true,
  confirmButtonLabel,
  buttonsDisabled,
  //   extraButton,
  //   showCheckbox = false,
}) => {
  const getConfirmButtonLabel = (alertType, confirmButtonLabel) => {
    if (confirmButtonLabel) {
      return confirmButtonLabel;
    } else {
      if (alertType === "info") {
        return "OK";
      } else if (alertType === "warning") {
        return "Continuar";
      } else {
        return "Aceptar";
      }
    }
  };

  return (
    <>
      <div>
        {/* {showCancel && (
          <div>
            <ButtonMUI
              color={
                !["success", "warning"].includes(color) ? color : "inherit"
              }
              variant={variant}
              onClick={handleClose}
              size={size === "xs" ? "small" : size}
              fullWidth={fullWidth}
              disabled={disabled}
              disableRipple={true}
            >
              {label}
            </ButtonMUI>
          </div>
        )} */}

        <ButtonMUI
          handleClick={handleAccept}
          size="small"
          color={"primary"}
          variant={"contained"}
          label={getConfirmButtonLabel(alertType, confirmButtonLabel)}
          disabled={buttonsDisabled}
        />
      </div>
    </>
  );
};

export default AlertFooter;
{
  /* {extraButton && (
          <div className={classes.footerButtonSpace}>
            <Button
              handleClick={extraButton.handleClick}
              variant={extraButton.variant || "outlined"}
              color={extraButton.color || "secondary"}
              label={extraButton.label || "Salir"}
              size="small"
              disabled={buttonsDisabled}
            />
          </div>
        )} */
}
// {showCheckbox && (
//   <div>
//     <div>
//       {/* <Checkbox name={"alert-checkbox"} /> */}
//       <Typography color={"textSecondary"}>No mostrar de nuevo</Typography>
//     </div>
//   </div>
// )}
