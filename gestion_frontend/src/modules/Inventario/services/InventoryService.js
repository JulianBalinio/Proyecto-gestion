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
      "http://127.0.0.1:8000/inventario/productos/options/",
      "GET"
    );
    return result;
  },
  createCategory: async (payload) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/categories/",
      "POST",
      payload
    );
    return result;
  },
  createBrand: async (payload) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/brands/",
      "POST",
      payload
    );
    return result;
  },
  createSupplier: async (payload) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/suppliers/",
      "POST",
      payload
    );
    return result;
  },
  createProduct: async (payload) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/inventario/productos/",
      "POST",
      payload
    );
    return result;
  },
  updateProduct: async (payload, productId) => {
    const result = await Api.fetch(
      `http://127.0.0.1:8000/inventario/productos/${productId}/`,
      "PUT",
      payload
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
