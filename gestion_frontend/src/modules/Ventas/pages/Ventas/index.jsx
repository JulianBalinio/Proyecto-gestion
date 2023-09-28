import { useState, useEffect } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import VentasTemplate from "/src/modules/Ventas/templates";
import { getColumns } from "/src/modules/Inventario/data/data";
import { SalesCalls } from "../../utils/apiCalls";

const Ventas = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState([]);

  console.log(order)

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const onSubmit = () => {
    const orderBack = order.map(prod => ({ product: prod.id, quantity: prod.quantity }))
    SalesCalls.createOrder({
      action: (response) => { console.log(response) },
      data: { order: orderBack }
    })
  }

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
      handleClick={onSubmit}
      rows={rows}
      order={order}
      setOrder={setOrder}
      columns={getColumns({ module: "Ventas", setOrder })}
      fetchInventory={fetchInventory}
    />
  );
};

export default Ventas;
