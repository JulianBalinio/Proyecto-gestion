import { useState } from "react";

export const useAlert = () => {
  const initialState = { open: false };
  const [alertDialog, setAlertDialog] = useState(initialState);
  const [open, setOpen] = useState(false);

  const closeAlert = (oldState) => {
    const prevState = oldState || alertDialog;
    setAlertDialog(Object.assign(prevState, { open: false }));
    setOpen(false);
  };

  const showAlert = ({
    alertType = "success",
    title = "",
    description = "",
    handleAccept,
    handleClose,
    showCancel = false,
    extraButton,
    buttonsDisabled = false,
    confirmButtonLabel,
  }) => {
    const config = {
      alertType,
      title,
      description,
      handleAccept,
      handleClose,
      showCancel,
      open: true,
      extraButton,
      buttonsDisabled,
      confirmButtonLabel,
    };
    Object.assign(config, {
      actionAccept: handleAccept || (() => closeAlert(config)),
      handleClose: handleClose || (() => closeAlert(config)),
    });
    setAlertDialog(config);
    setOpen(true);
  };

  const showErrorAlert = ({
    title = "Error",
    description = "Hubo un error en el sistema.",
    handleAccept,
    handleClose,
    showCancel = false,
    showCheckbox,
    extraButton,
  }) =>
    showAlert({
      alertType: "error",
      title: title,
      description,
      handleAccept,
      handleClose,
      showCancel,
      showCheckbox,
      extraButton,
    });

  const showSuccessAlert = ({
    title = "Operación exitosa",
    description = "Los cambios se realizaron con éxito.",
    handleAccept,
    handleClose,
    showCancel = false,
    showCheckbox,
    extraButton,
  }) =>
    showAlert({
      alertType: "success",
      title: title,
      description,
      handleAccept,
      handleClose,
      showCancel,
      showCheckbox,
      extraButton,
    });

  return {
    alertDialog,
    showAlert,
    showSuccessAlert,
    showErrorAlert,
    closeAlert,
  };
};
