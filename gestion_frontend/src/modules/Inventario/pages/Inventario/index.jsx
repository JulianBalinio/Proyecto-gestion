import { useState, useEffect } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import { getButtons, getModalObject } from "/src/modules/Inventario/utils";
import InventarioTemplate from "/src/modules/Inventario/templates/Inventario";
import { getColumns } from "/src/modules/Inventario/data/data";

const Inventario = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemToEdit, setItemToEdit] = useState();
  const [openModal, setOpenModal] = useState({
    category: false,
    update: false,
    add: false,
  });

  const fetchInventory = () => {
    return InventoryCalls.getInventory({ action: setRows });
  };

  const changesModalObject = getModalObject({
    open: openModal,
    action: setOpenModal,
    key: "add",
    fetchInventory,
    item: itemToEdit,
  });

  const pricesModalObject = getModalObject({
    open: openModal,
    action: setOpenModal,
    key: "prices",
    fetchInventory,
  });

  const buttons = getButtons({ action: setOpenModal });
  const columns = getColumns({ setItemToEdit, setOpenModal });

  useEffect(() => {
    const allValuesAreFalse = Object.values(openModal).every(
      (value) => value === false
    );

    if (allValuesAreFalse) {
      setItemToEdit(null);
    }
  }, [openModal]);

  useEffect(() => {
    InventoryCalls.getInventory({ action: setRows });
  }, []);

  return (
    <InventarioTemplate
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      openModal={openModal}
      rows={rows}
      columns={columns}
      buttons={buttons}
      changesModalObject={changesModalObject}
      pricesModalObject={pricesModalObject}
      fetchInventory={fetchInventory}
    />
  );
};

export default Inventario;
