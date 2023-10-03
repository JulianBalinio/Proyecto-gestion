import { InventoryService } from "../services/InventoryService";
import { convertKeysSnakeToCamel } from "/src/services/ApiService";

const InventoryCalls = {
  getInventory: ({ action, params = {} }) => {
    InventoryService.getInventory(params)
      .then((response) => action(response.data))
      .catch((err) => console.error(err));
  },
  getCategories: ({ action, params = {} }) => {
    InventoryService.getCategories(params)
      .then((response) => action(response.data))
      .catch((err) => console.error(err));
  },
  getOptions: ({ action, params = {} }) => {
    InventoryService.getOptions(params)
      .then((response) => action(response.data))
      .catch((err) => console.error(err));
  },
  createCategory: ({ action, data }) => {
    InventoryService.createCategory(data)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  createBrand: ({ action, data }) => {
    InventoryService.createBrand(data)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  createSupplier: ({ action, data }) => {
    InventoryService.createSupplier(data)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  createProduct: ({ action, data }) => {
    InventoryService.createProduct(convertKeysSnakeToCamel(data))
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  updatePrices: ({ action, data }) => {
    InventoryService.updatePrices(convertKeysSnakeToCamel(data))
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  updateProduct: ({ action, data, productId }) => {
    InventoryService.updateProduct(convertKeysSnakeToCamel(data), productId)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  deleteProduct: ({ action, productId }) => {
    InventoryService.deleteProduct(productId)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
};

export { InventoryCalls };
