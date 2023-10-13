import { Api } from "/src/services/ApiService";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const InventoryService = {
  getInventory: async (params) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/productos/`,
      "GET"
    );
    return result;
  },
  getCategories: async (params) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/categories/`,
      "GET"
    );
    return result;
  },
  getOptions: async (params) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/productos/options/`,
      "GET"
    );
    return result;
  },
  createCategory: async (payload) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/categories/`,
      "POST",
      payload
    );
    return result;
  },
  createBrand: async (payload) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/brands/`,
      "POST",
      payload
    );
    return result;
  },
  createSupplier: async (payload) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/suppliers/`,
      "POST",
      payload
    );
    return result;
  },
  createProduct: async (payload) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/productos/`,
      "POST",
      payload
    );
    return result;
  },
  updatePrices: async (payload) => {
    try {
      const result = await Api.fetch(
        `${VITE_API_URL}/inventario/productos/update_prices/`,
        "PUT",
        payload
      );
      return result;
    } catch (error) {
      console.error("Error en updatePrices:", error);
      throw error; // Asegúrate de lanzar el error nuevamente para que pueda ser manejado en el catch del llamador
    }
  },
  updateProduct: async (payload, productId) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/productos/${productId}/`,
      "PUT",
      payload
    );
    return result;
  },
  deleteProduct: async (productId) => {
    const result = await Api.fetch(
      `${VITE_API_URL}/inventario/productos/${productId}/`,
      "DELETE"
    );
    return result;
  },
};
