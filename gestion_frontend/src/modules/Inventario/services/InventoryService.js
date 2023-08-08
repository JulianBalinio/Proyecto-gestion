import { Api } from "/src/services/ApiService";

export const InventoryService = {
  getInventory: async (params) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/productos/",
      "GET"
    );
    return result;
  },
  getCategories: async (params) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/categories/",
      "GET"
    );
    return result;
  },
  getOptions: async (params) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/productos/options",
      "GET"
    );
    return result;
  },
  createCategory: async (data) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/categories/",
      "POST",
      data
    );
    return result;
  },
  createProduct: async (data) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/productos/",
      "POST",
      data
    );
    return result;
  },
  updateProduct: async (data, productId) => {
    const result = await Api.fetch(
      `http://127.0.0.1:8000/inventario/productos/${productId}/`,
      "PUT",
      data
    );
    return result;
  },
  deleteProduct: async (productId) => {
    const result = await Api.fetch(
      `http://127.0.0.1:8000/inventario/productos/${productId}/`,
      "DELETE"
    );
    return result;
  },
};
