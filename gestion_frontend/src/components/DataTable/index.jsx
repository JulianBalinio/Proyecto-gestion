import { DataGrid, esES } from "@mui/x-data-grid";
const { localeText } = esES.components.MuiDataGrid.defaultProps;

function DataTable({ rows, columns }) {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        showCellVerticalBorder
        pageSizeOptions={[25, 50, 100]}
        localeText={localeText}
      />
    </>
  );
}

export default DataTable;
