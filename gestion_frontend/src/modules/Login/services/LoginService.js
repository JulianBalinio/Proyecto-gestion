import { Api } from "/src/services/ApiService";

export const LoginService = {
  signIn: async (data) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/user/sign_in/",
      "POST",
      data
    );
    return result;
  },
  signUp: async (params) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/user/sign_up/",
      "GET"
    );
    return result;
  },
  logOut: async (data) => {
    const result = await Api.fetch(
      "http://127.0.0.1:8000/user/logout/",
      "POST",
      data
    );
    return result;
  },
};
