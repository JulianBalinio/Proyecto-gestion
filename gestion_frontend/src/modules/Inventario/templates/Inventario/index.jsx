import { AddCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import Header from "/src/components/Header";
import SearchBar from "/src/components/SearchBar";
import DataTable from "/src/components/DataTable";
import Heading from "/src/components/Heading";
import ChangesModal from "/src/components/ChangesModal";
import CategoryModal from "/src/components/CategoryModal";
import PricesModal from "/src/components/PricesModal";
import styles from "./index.module.scss";

const InventarioTemplate = ({
  searchTerm,
  setSearchTerm,
  openModal,
  rows,
  fetchInventory,
  buttons,
  changesModalObject,
  categoryModalObject,
  pricesModalObject,
}) => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Heading title={"Inventario"} />

        <section className={styles.searchBar}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {buttons.map((button, key) => {
            return (
              <Button
                startIcon={<AddCircleOutline />}
                variant={"contained"}
                size={"small"}
                color={button.color}
                onClick={button.onClick}
                key={key}
              >
                {button.text}
              </Button>
            );
          })}
        </section>

        <section className={styles.dataTable}>
          <DataTable
            searchTerm={searchTerm}
            rows={rows}
            fetchInventory={fetchInventory}
          />
        </section>

        {openModal.add && <ChangesModal {...changesModalObject} />}
        {openModal.category && <CategoryModal {...categoryModalObject} />}
        {openModal.prices && <PricesModal {...pricesModalObject} />}
      </main>
    </>
  );
};

export default InventarioTemplate;
