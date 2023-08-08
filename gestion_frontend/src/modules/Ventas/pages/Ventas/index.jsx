import { useState, useEffect } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import VentasTemplate from "../../templates";

const Ventas = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const fetchInventory = () => {
    InventoryCalls.getInventory({ action: setRows });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <VentasTemplate
      search={search}
      handleSearch={handleSearch}
      rows={rows}
      fetchInventory={fetchInventory}
    />
  );
};

export default Ventas;
