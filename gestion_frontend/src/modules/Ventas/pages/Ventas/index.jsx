import { useState, useEffect } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import { getColumns } from "/src/modules/Inventario/data/data";
import { SalesCalls } from "../../utils/apiCalls";
import { useAlert } from "/src/common/hooks/useAlert";
import VentasTemplate from "/src/modules/Ventas/templates";

const Ventas = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState([]);
  const { showSuccessAlert, showErrorAlert, alertDialog, closeAlert } =
    useAlert();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const onSubmit = () => {
    const orderBack = order.map((prod) => ({
      product: prod.id,
      quantity: prod.quantity,
    }));
    SalesCalls.createOrder({
      action: (response) => {
        response.status === 201 &&
          showSuccessAlert({
            handleAccept: () => {
              setOrder([]);
              closeAlert();
            },
            handleClose: () => {
              setOrder([]);
              closeAlert();
            },
          });
      },
      data: { order: orderBack },
      dealWithError: (error) => {
        alert(error);
        showErrorAlert({
          description: error,
        });
      },
    });
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
      alertDialogObject={alertDialog}
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
