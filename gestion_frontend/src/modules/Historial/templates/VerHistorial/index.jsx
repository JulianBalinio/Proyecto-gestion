import React from "react";
import Header from "/src/components/Header";
import Heading from "/src/components/Heading";
import DataTable from "/src/components/DataTable";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";

export default function VerHistorialTemplate({ rows, columns, total }) {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Heading title={"Detalle de Orden"} />

        <section className={styles.dataTable}>
          <DataTable rows={rows} columns={columns} />

          <footer className={styles.footer}>
            <h1>Total:</h1>
            <Typography variant="h4">{`$${total}`}</Typography>
          </footer>
        </section>
      </main>
    </>
  );
}
