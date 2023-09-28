import React from "react";
import Header from "/src/components/Header";
import Heading from "/src/components/Heading";
import SearchBar from "/src/components/SearchBar";
import DataTable from "/src/components/DataTable";
import styles from "./index.module.scss";
import ActualOrder from "../components/ActualOrder";
import { Divider } from "@mui/material";

export default function VentasTemplate({
  search,
  handleSearch,
  handleClick,
  rows,
  columns,
  order,
  setOrder,
  fetchInventory,
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.grid}>
          <header>
            <Heading title={"Ventas"} />
          </header>

          <section className={styles.searchBar}>
            <SearchBar value={search} onChange={handleSearch} />
          </section>

          <section className={styles.dataTable}>
            <DataTable
              searchTerm={search}
              rows={rows}
              columns={columns}
              fetchInventory={fetchInventory}
            />
          </section>
        </article>

        <Divider orientation="vertical" />

        <aside className={styles.order}>
          <ActualOrder order={order} setOrder={setOrder} handleClick={handleClick} />
        </aside>
      </main>
    </>
  );
}
