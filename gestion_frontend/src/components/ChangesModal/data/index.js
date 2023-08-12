import { InventoryCalls } from "/src/modules/Inventario/utils/apiCalls";

const defaultValues = {
  code: "",
  name: "",
  stock: "",
  price: "",
  category: "",
  brand: "",
  supplier: "",
};

const defaultAttributeValues = {
  name: "",
};

const defaultSupplierValues = {
  name: "",
  address: "",
  phone: "",
};

const productAttributeFields = [
  {
    label: "Nombre",
    name: "name",
    required: true,
    autoFocus: true,
  },
];

const supplierFields = [
  {
    label: "Nombre",
    name: "name",
    required: true,
  },
  {
    label: "Dirección",
    name: "address",
    required: true,
  },
  {
    label: "Teléfono",
    type: "number",
    name: "phone",
    required: true,
  },
];

const validate = (fields) => {
  return fields.some((field) => field.required && field.value === "");
};

const getFields = ({ product, options, setOptions, setAttributesObject }) => {
  return [
    {
      label: "Código",
      type: "number",
      name: "code",
      value: product.code,
      required: true,
    },
    {
      label: "Categoría",
      select: true,
      options: options.categories,
      name: "category",
      value: product.category,
      onClick: () => {
        setAttributesObject(() => {
          return {
            title: "Categoría",
            open: true,
            defaultValues: defaultAttributeValues,
            fields: productAttributeFields,
            onClose: () => {
              setAttributesObject((prev) => ({ ...prev, open: false }));
            },
            handleSave: (data) => {
              InventoryCalls.createCategory({
                action: () => {
                  setAttributesObject((prev) => ({ ...prev, open: false }));
                  InventoryCalls.getOptions({ action: setOptions });
                },
                data: { name: data.name },
              });
            },
          };
        });
      },
    },
    {
      label: "Marca",
      select: true,
      name: "brand",
      options: options.brands,
      value: product.brand,
      onClick: () => {
        setAttributesObject(() => {
          return {
            title: "Marca",
            open: true,
            defaultValues: defaultAttributeValues,
            fields: productAttributeFields,
            onClose: () => {
              setAttributesObject((prev) => ({ ...prev, open: false }));
            },
            handleSave: (data) => {
              InventoryCalls.createBrand({
                action: () => {
                  setAttributesObject((prev) => ({ ...prev, open: false }));
                  InventoryCalls.getOptions({ action: setOptions });
                },
                data: { name: data.name },
              });
            },
          };
        });
      },
    },
    {
      label: "Proveedor",
      select: true,
      name: "supplier",
      options: options.suppliers,
      value: product.supplier,
      onClick: () => {
        setAttributesObject(() => {
          return {
            title: "Proveedor",
            open: true,
            defaultValues: defaultSupplierValues,
            fields: supplierFields,
            onClose: () => {
              setAttributesObject((prev) => ({ ...prev, open: false }));
            },
            handleSave: (data) => {
              InventoryCalls.createSupplier({
                action: () => {
                  setAttributesObject((prev) => ({ ...prev, open: false }));
                  InventoryCalls.getOptions({ action: setOptions });
                },
                data: { ...data },
              });
            },
          };
        });
      },
    },
    {
      label: "Nombre",
      name: "name",
      required: true,
      value: product.name,
    },
    {
      label: "Stock",
      type: "number",
      name: "stock",
      required: true,
      value: product.stock,
    },
    {
      label: "Precio",
      type: "number",
      name: "price",
      required: true,
      value: product.price,
    },
  ];
};

export { defaultValues, getFields, validate };
