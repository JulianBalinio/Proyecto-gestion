import { SalesService } from "../services/SalesService";
import { convertKeysSnakeToCamel } from "/src/services/ApiService";

const SalesCalls = {
    createOrder: ({ action, data }) => {
        SalesService.createOrder(convertKeysSnakeToCamel(data))
            .then((data) => action(data))
            .catch((err) => console.error(err));
    },
}

export { SalesCalls }