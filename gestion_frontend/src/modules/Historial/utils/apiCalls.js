import { HistorialService } from "/src/modules/Historial/services/HistorialService";
import { convertKeysSnakeToCamel } from "/src/services/ApiService";

const HistorialCalls = {
  getHistory: ({ action }) => {
    HistorialService.getHistory()
      .then((response) => {
        const camelized = convertKeysSnakeToCamel(response.data);
        return action(camelized);
      })
      .catch((err) => console.error(err));
  },
  getHistoryDetails: ({ action, historyId }) => {
    HistorialService.getHistoryDetails(historyId)
      .then((response) => {
        const camelized = convertKeysSnakeToCamel(response.data);
        return action(camelized);
      })
      .catch((err) => console.error(err));
  },

  //   createProduct: ({ action, data }) => {
  //     InventoryService.createProduct(convertKeysSnakeToCamel(data))
  //       .then((data) => action(data))
  //       .catch((err) => console.error(err));
  //   },
  //   updatePrices: ({ action, data }) => {
  //     InventoryService.updatePrices(convertKeysSnakeToCamel(data))
  //       .then((data) => action(data))
  //       .catch((err) => console.error(err));
  //   },
  //   deleteProduct: ({ action, productId }) => {
  //     InventoryService.deleteProduct(productId)
  //       .then((data) => action(data))
  //       .catch((err) => console.error(err));
  //   },
};

export { HistorialCalls };
