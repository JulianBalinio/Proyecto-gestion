import { Button } from "@mui/material";

//CAMELIZAR PRODUCTOS
export const getColumns = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "date", headerName: "Fecha y hora", flex: 3 },
    { field: "products", headerName: "Productos", flex: 10 },
    {
      field: "total",
      headerName: "Total",
      flex: 4,
      //   renderCell: (params) => {
      //     return `${params.row?.category_label || "-"}`;
      //   },
    },
  ];

  return columns;
};
