const defaultValues = {
  code: "",
  name: "",
  stock: "",
  price: "",
  category: "",
  brand: "",
  supplier: "",
};

const validate = (fields) => {
  return fields.some((field) => field.required && field.value === "");
};

const getFields = (product, options, styles) => {
  return [
    {
      label: "Código",
      type: "number",
      name: "code",
      value: product.code,
      required: true,
      autoFocus: true,
      className: styles.inputCode,
    },
    {
      label: "Categoría",
      required: true,
      select: true,
      options: options.categories,
      name: "category",
      value: product.category,
    },
    {
      label: "Marca",
      select: true,
      name: "brand",
      options: options.brands,
      value: product.brand,
    },
    {
      label: "Proveedor",
      select: true,
      name: "supplier",
      options: options.suppliers,
      value: product.supplier,
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
