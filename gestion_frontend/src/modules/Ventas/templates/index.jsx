import React from "react";
import Header from "/src/components/Header";
import Heading from "/src/components/Heading";
import SearchBar from "/src/components/SearchBar";
import DataTable from "/src/components/DataTable";
import styles from "./index.module.scss";

export default function VentasTemplate({
  search,
  handleSearch,
  rows,
  fetchInventory,
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Heading title={"Ventas"} />

        <section className={styles.searchBar}>
          <SearchBar value={search} onChange={handleSearch} />
        </section>
        <section className={styles.dataTable}>
          <DataTable
            searchTerm={search}
            rows={rows}
            fetchInventory={fetchInventory}
          />
        </section>
      </main>
    </>
  );
}
