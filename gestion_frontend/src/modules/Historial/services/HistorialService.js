import { Api } from "/src/services/ApiService";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const HistorialService = {
  getHistory: async () => {
    const result = await Api.fetch(`${VITE_API_URL}/ventas/orders/`, "GET");
    return result;
  },
  getHistoryDetails: async (historyId) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/ventas/order_details/${historyId}`,
      "GET"
    );
    return result;
  },
  //   createProduct: async (payload) => {
  //     const result = await Api.fetch(
  //       `${VITE_API_URL}/inventario/productos/`,
  //       "POST",
  //       payload
  //     );
  //     return result;
  //   },
  //   updateProduct: async (payload, productId) => {
  //     const result = await Api.fetch(
  //       `${VITE_API_URL}/inventario/productos/${productId}/`,
  //       "PUT",
  //       payload
  //     );
  //     return result;
  //   },
  //   deleteProduct: async (productId) => {
  //     const result = await Api.fetch(
  //       `${VITE_API_URL}/inventario/productos/${productId}/`,
  //       "DELETE"
  //     );
  //     return result;
  //   },
};
