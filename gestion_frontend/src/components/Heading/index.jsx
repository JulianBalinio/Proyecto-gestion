import React from "react";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";

const Heading = ({ title }) => {
  return (
    <Typography className={styles.heading} variant="h4" fontWeight={400}>
      {title}
    </Typography>
  );
};

export default Heading;
