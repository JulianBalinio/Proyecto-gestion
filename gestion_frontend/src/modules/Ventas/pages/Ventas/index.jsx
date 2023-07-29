import { useState, useEffect } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import Header from "/src/components/Header";
import Heading from "/src/components/Heading";
import SearchBar from "/src/components/SearchBar";
import DataTable from "/src/components/DataTable";
import styles from "./index.module.scss";

const Ventas = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);

  const handleSearch = (e) => {
    const { value } = e.target;
  };

  const fetchInventory = () => {
    InventoryCalls.getInventory({ action: setRows });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Heading title={"Ventas"} />

        <SearchBar value={search} onChange={handleSearch} />

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
};

export default Ventas;
