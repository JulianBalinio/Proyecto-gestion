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
    showCheckbox = false,
    showCancel = false,
    extraButton,
    buttonsDisabled = false,
    confirmButtonLabel,
  }) => {
    const config = {
      alertType: alertType,
      title: title,
      description: description,
      //   showCheckbox,
      //   showCancel,
      open: true,
      //   extraButton,
      //   buttonsDisabled,
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
    description = "Error descripcion",
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

  return {
    alertDialog,
    showAlert,
    showErrorAlert,
    closeAlert,
  };
};
