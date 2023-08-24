import { useEffect, useState } from "react";
import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";
import { defaultValues, getFields } from "./data";
import ChangesModalTemplate from "./templates/ChangesModal";

export default function ChangesModal({
  open,
  onClose,
  item,
  edit,
  fetchInventory,
}) {
  const [product, setProduct] = useState(defaultValues);
  const [attributesObject, setAttributesObject] = useState();
  const [options, setOptions] = useState({
    brand: [],
    category: [],
    supplier: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };

  const handleSave = () => {
    const { category, ...payload } = product;
    if (edit) {
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
      InventoryCalls.createProduct({
        action: () => {
          fetchInventory();
          onClose();
        },
        data: {
          ...product,
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
      productId: product.id,
    });
  };

  useEffect(() => {
    const initializeItem = () => {
      setProduct((prev) => {
        return { ...prev, ...item };
      });
    };

    item && initializeItem();
  }, [item]);

  useEffect(() => {
    InventoryCalls.getOptions({ action: setOptions });
  }, []);

  const fields = getFields({
    product,
    options,
    setOptions,
    setAttributesObject,
  });

  return (
    <ChangesModalTemplate
      open={open}
      fields={fields}
      attributesObject={attributesObject}
      onClose={onClose}
      edit={edit}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSave={handleSave}
    />
  );
}
