import { Button } from "@mui/material";

//CAMELIZAR PRODUCTOS
export const getColumns = ({
  module,
  setItemToEdit,
  setOpenModal,
  setOrder,
}) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "code", headerName: "Código", flex: 3 },
    { field: "name", headerName: "Nombre", flex: 10 },
    {
      field: "category",
      headerName: "Categoría",
      flex: 4,
      renderCell: (params) => {
        return `${params.row?.category_label || "-"}`;
      },
    },
    {
      field: "brand",
      headerName: "Marca",
      flex: 4,
      renderCell: (params) => {
        return `${params.row?.brand_label || "-"}`;
      },
    },
    {
      field: "supplier",
      headerName: "Proveedor",
      flex: 4,
      renderCell: (params) => {
        return `${params.row?.supplier_label || "-"}`;
      },
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 3,
      renderCell: (params) => {
        return `$${params.value}`;
      },
    },
    { field: "stock", headerName: "Stock", flex: 3 },
  ];

  if (module === "Inventario") {
    const editField = {
      field: "edit",
      headerName: "Accion",
      flex: 0,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setItemToEdit(params.row);
          setOpenModal((prev) => ({ ...prev, add: true }));
        };

        return <Button onClick={onClick}>Editar</Button>;
      },
    };
    columns.push(editField);
  }

  if (module === "Ventas") {
    const addField = {
      field: "add",
      headerName: "Accion",
      flex: 0,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setOrder((prev) => {
            const existingProduct = prev.find(
              (prod) => prod.id === params.row.id
            );

            if (!existingProduct) {
              return [...prev, { ...params.row, quantity: 1 }];
            }

            return prev
          });
        };

        return <Button onClick={onClick}>Agregar</Button>;
      },
    };
    columns.push(addField);
  }

  return columns;
};
