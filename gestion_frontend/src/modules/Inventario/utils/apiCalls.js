import { InventoryService } from "../services/InventoryService";
import { convertKeysSnakeToCamel } from "/src/services/ApiService";

const InventoryCalls = {
  getInventory: ({ action, params = {} }) => {
    InventoryService.getInventory(params)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  getCategories: ({ action, params = {} }) => {
    InventoryService.getCategories(params)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  getOptions: ({ action, params = {} }) => {
    InventoryService.getOptions(params)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  createCategory: ({ action, data }) => {
    InventoryService.createCategory(data)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  createProduct: ({ action, data }) => {
    InventoryService.createProduct(convertKeysSnakeToCamel(data))
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
