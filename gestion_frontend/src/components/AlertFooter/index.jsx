import React, { useMemo } from "react";
import { Button } from "@mui/material";
import classes from "./index.module.scss";

const AlertFooter = ({
  alertType,
  handleClose,
  handleAccept,
  showCancel = true,
  confirmButtonLabel,
  buttonsDisabled,
}) => {
  const getConfirmButtonLabel = useMemo(() => {
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
  }, [alertType, confirmButtonLabel]);

  return (
    <>
      <div>
        {showCancel && (
          <div>
            {/* <ButtonMUI
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
            </ButtonMUI> */}
          </div>
        )}

        <Button
          onClick={handleAccept}
          className={classes.button}
          color={"primary"}
          size="large"
          variant="contained"
          label={"Aceptar"}
          disabled={buttonsDisabled}
        >
          {getConfirmButtonLabel}
        </Button>
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
