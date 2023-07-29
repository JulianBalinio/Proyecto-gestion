import React from "react";
import Link from "next/link";

const SalesList = ({ ventas }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {ventas.map((venta) => (
        <li
          key={venta.id}
          className="py-4 flex flex-wrap items-center justify-between"
        >
          <Link href={`/ventas/${venta.id}`} className="w-full">
            <div className="flex items-center p-2">
              <p className="text-lg font-medium text-gray-900">{venta.fecha}</p>
              <p className="text-base text-gray-500 ml-auto">${venta.total}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SalesList;
