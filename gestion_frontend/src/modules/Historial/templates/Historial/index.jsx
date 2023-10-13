import React from "react";
import Header from "/src/components/Header";
import Heading from "/src/components/Heading";
import SearchBar from "/src/components/SearchBar";
import DataTable from "/src/components/DataTable";
import styles from "./index.module.scss";

export default function HistorialTemplate({
  searchTerm,
  setSearchTerm,
  rows,
  columns,
}) {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Heading title={"Historial"} />

        <section className={styles.searchBar}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        <section className={styles.dataTable}>
          <DataTable rows={rows} columns={columns} />
        </section>
      </main>
    </>
  );
}
