import { LoginService } from "/src/modules/Login/services/LoginService";

const LoginCalls = {
  signIn: ({ action, payload }) => {
    const snakePayload = convertKeysSnakeToCamel(payload);
    LoginService.signIn(snakePayload)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
};

export { LoginCalls };
