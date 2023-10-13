import React, { useEffect, useState } from "react";
import VerHistorialTemplate from "../../templates/VerHistorial";
import { getColumnsVer } from "../../data/data";
import { useLocation } from "react-router-dom";
import { HistorialCalls } from "../../utils/apiCalls";

export default function VerHistorial() {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const columns = getColumnsVer();

  const getTotal = () => {
    return rows
      .reduce((acc, curr) => parseFloat(curr.total) + acc, 0)
      .toFixed(2);
  };

  useEffect(() => {
    HistorialCalls.getHistoryDetails({
      action: (data) => setRows(data),
      historyId: location.state.historyId,
    });
  }, []);

  return (
    <VerHistorialTemplate rows={rows} columns={columns} total={getTotal()} />
  );
}
