import ChangesModal from "../ChangesModal";
import { useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { getColumns } from "./data";
const { localeText } = esES.components.MuiDataGrid.defaultProps;

function DataTable({ searchTerm, rows, fetchInventory }) {
  const [open, setOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const filteredRows = rows.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm.toString()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = getColumns({ setItemToEdit, setOpen });

  return (
    <>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        localeText={localeText}
      />
      {itemToEdit && (
        <ChangesModal
          open={open}
          onClose={() => setOpen(false)}
          item={itemToEdit}
          edit={true}
          fetchInventory={fetchInventory}
        />
      )}
    </>
  );
}

export default DataTable;
