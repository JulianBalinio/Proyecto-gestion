import React from "react";
import {
  CheckCircleOutline as SuccessIcon,
  ErrorOutline as ErrorIcon,
  ReportProblemOutlined as WarningIcon,
} from "@mui/icons-material";
import classes from "./index.module.scss";

const AlertIcon = ({ action }) => {
  return action === "error" ? (
    <ErrorIcon
      className={`${classes.errorIcon} ${classes.icon}`}
      sx={{ fontSize: "5rem" }}
    />
  ) : action === "warning" ? (
    <WarningIcon
      className={`${classes.warningIcon} ${classes.icon}`}
      sx={{ fontSize: "5rem" }}
    />
  ) : action === "success" ? (
    <SuccessIcon
      className={`${classes.successIcon} ${classes.icon}`}
      sx={{ fontSize: "5rem" }}
    />
  ) : (
    false
  );
};

export default AlertIcon;
