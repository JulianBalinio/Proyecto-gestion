import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const getColumns = () => {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "date", headerName: "Fecha y hora", flex: 5 },
    { field: "totalQuantity", headerName: "Cantidad de Productos", flex: 5 },
    {
      field: "totalPrice",
      headerName: "Total",
      flex: 2,
      renderCell: (params) => `$${params.row?.totalPrice}`,
    },
    {
      field: "actions",
      headerName: "Accion",
      flex: 1,
      renderCell: (params) => {
        const onClick = () => {
          // Esto deberia redireccionar a /historial/verHistorial
          // history.pushState({}, "verHistorial", "/historial/verHistorial");
          navigate("/historial/verHistorial", {
            state: { historyId: params?.row?.id },
          });
        };

        return <Button onClick={onClick}>Ver</Button>;
      },
    },
  ];

  return columns;
};

export const getColumnsVer = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "product", headerName: "Producto", flex: 1 },
    { field: "quantity", headerName: "Cantidad", flex: 1 },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      renderCell: (params) => {
        return `$${params.value}`;
      },
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: (params) => {
        return `$${params.value}`;
      },
    },
  ];

  return columns;
};
