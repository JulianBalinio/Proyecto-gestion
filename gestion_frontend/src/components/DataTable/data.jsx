import { Button } from "@mui/material";

export const getColumns = ({ setItemToEdit, setOpen }) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "code", headerName: "Código", flex: 2 },
    { field: "name", headerName: "Nombre", flex: 10 },
    {
      field: "category",
      headerName: "Categoría",
      flex: 4,
      renderCell: (params) => {
        return `${params.value.name}`;
      },
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 2,
      renderCell: (params) => {
        return `$${params.value}`;
      },
    },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "edit",
      headerName: "Accion",
      flex: 0,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setItemToEdit(params.row);
          setOpen(true);
        };

        return <Button onClick={onClick}>Editar</Button>;
      },
    },
  ];
  return columns;
};
