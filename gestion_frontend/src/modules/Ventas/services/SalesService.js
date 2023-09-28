import { Api } from "/src/services/ApiService";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const SalesService = {
    createOrder: async (payload) => {
        const result = await Api.fetch(
            `${VITE_API_URL}/ventas/orders/`,
            "POST",
            payload
        );
        return result;
    },
}