import { useEffect, useState } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import { defaultValues } from "./data";
import ChangesModalTemplate from "./templates/ChangesModal";

export default function ChangesModal({
  open,
  onClose,
  item,
  edit,
  fetchInventory,
}) {
  const [producto, setProducto] = useState(defaultValues);
  const [options, setOptions] = useState({
    brands: [],
    categories: [],
    suppliers: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => {
      return { ...prevProducto, [name]: value };
    });
  };

  const handleSave = () => {
    if (edit) {
      const { category, ...payload } = producto;
      InventoryCalls.updateProduct({
        action: () => {
          fetchInventory();
          onClose();
        },
        data: {
          ...payload,
          categoryId: category,
        },
        productId: item.id,
      });
    } else {
      const { category, ...payload } = producto;
      InventoryCalls.createProduct({
        action: () => {
          fetchInventory();
          onClose();
        },
        data: {
          ...payload,
          categoryId: category,
        },
      });
    }
  };

  const handleDelete = () => {
    InventoryCalls.deleteProduct({
      action: () => {
        fetchInventory();
        onClose();
      },
      productId: producto.id,
    });
  };

  useEffect(() => {
    const initializeItem = () => {
      setProducto((prevProducto) => {
        return { ...prevProducto, ...item, category: item.category.id };
      });
    };

    item && initializeItem();
  }, [item]);

  useEffect(() => {
    InventoryCalls.getOptions({ action: setOptions });
  }, []);

  return (
    <ChangesModalTemplate
      producto={producto}
      options={options}
      open={open}
      onClose={onClose}
      edit={edit}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSave={handleSave}
    />
  );
}
