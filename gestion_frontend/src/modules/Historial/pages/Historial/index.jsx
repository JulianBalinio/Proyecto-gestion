import React, { useState } from "react";
import HistorialTemplate from "../../templates/Historial";
import { getColumns } from "/src/modules/Historial/data/data";

export default function Historial() {
  const [searchTerm, setSearchTerm] = useState();

  const columns = getColumns()


  return (
    <HistorialTemplate
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      rows={[]}
      columns={columns}
    />
  );
}
