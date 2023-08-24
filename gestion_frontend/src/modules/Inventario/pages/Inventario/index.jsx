import { useState, useEffect } from "react";
import { InventoryCalls } from "../../utils/apiCalls";
import { getButtons, getModalObject } from "/src/modules/Inventario/utils";
import InventarioTemplate from "/src/modules/Inventario/templates/Inventario";

const Inventario = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  });

  const pricesModalObject = getModalObject({
    open: openModal,
    action: setOpenModal,
    key: "prices",
    fetchInventory,
  });

  const buttons = getButtons({ action: setOpenModal });

  useEffect(() => {
    InventoryCalls.getInventory({ action: setRows });
  }, []);

  return (
    <InventarioTemplate
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      openModal={openModal}
      rows={rows}
      buttons={buttons}
      changesModalObject={changesModalObject}
      pricesModalObject={pricesModalObject}
      fetchInventory={fetchInventory}
    />
  );
};

export default Inventario;
