import React from "react";
import styles from "./index.module.scss";

const Heading = ({ title }) => {
  return <h1 className={styles.heading}>{title}</h1>;
};

export default Heading;
