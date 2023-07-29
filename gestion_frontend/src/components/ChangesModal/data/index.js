const defaultValues = {
  id: "",
  code: "",
  name: "",
  stock: "",
  price: "",
  category: "",
};

const validate = (obj) => {
  return Object.values(obj).some((value) => value === "");
};

const getFields = (producto, styles) => {
  return [
    {
      label: "Código",
      type: "number",
      name: "code",
      value: producto.code,
      required: true,
      autoFocus: true,
      className: styles.inputCode,
    },
    {
      label: "Categoría",
      placeholder: "Categoria",
      required: true,
      select: true,
      name: "category",
      value: producto.category,
    },
    {
      label: "Nombre",
      name: "name",
      required: true,
      value: producto.name,
    },
    {
      label: "Stock",
      type: "number",
      name: "stock",
      required: true,
      value: producto.stock,
    },
    {
      label: "Precio",
      type: "number",
      name: "price",
      required: true,
      value: producto.price,
    },
  ];
};

export { defaultValues, getFields, validate };
