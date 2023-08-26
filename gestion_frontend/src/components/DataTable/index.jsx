import { DataGrid, esES } from "@mui/x-data-grid";
const { localeText } = esES.components.MuiDataGrid.defaultProps;

function DataTable({ searchTerm, rows, columns }) {
  const filteredRows = rows.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm.toString()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        showCellVerticalBorder
        rowsPerPageOptions={[5]}
        localeText={localeText}
      />
    </>
  );
}

export default DataTable;
