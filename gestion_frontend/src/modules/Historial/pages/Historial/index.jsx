import React, { useEffect, useState } from "react";
import HistorialTemplate from "/src/modules/Historial/templates/Historial";
import { HistorialCalls } from "../../utils/apiCalls";
import { getColumns } from "/src/modules/Historial/data/data";

export default function Historial() {
  const [searchTerm, setSearchTerm] = useState();
  const [rows, setRows] = useState([])
  const columns = getColumns()

  useEffect(() => {
    HistorialCalls.getHistory({
      action: (data) => setRows(data)
    })
  }, [])


  return (
    <HistorialTemplate
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      rows={rows}
      columns={columns}
    />
  );
}
