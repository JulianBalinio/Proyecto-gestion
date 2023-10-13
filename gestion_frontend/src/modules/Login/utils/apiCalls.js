import { convertKeysSnakeToCamel } from "../../../services/ApiService";
import { LoginService } from "../services/LoginService";

const LoginCalls = {
  signIn: ({ action, payload }) => {
    const snakePayload = convertKeysSnakeToCamel(payload);
    LoginService.signIn(snakePayload)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  signUp: ({action, payload}) => {
    const snakePayload = convertKeysSnakeToCamel(payload);
    LoginService.signUp(snakePayload)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
  verifyToken: ({action}) => {
    LoginService.verifyToken()
      .then((data) => action(data))
      .catch((err) => console.error(err));
  }
};

export { LoginCalls };
