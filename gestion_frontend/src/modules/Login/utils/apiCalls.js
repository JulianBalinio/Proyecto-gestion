import { LoginService } from "/src/modules/Login/services/LoginService";

function snakeToCamelCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function convertKeysSnakeToCamel(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysSnakeToCamel(item));
  }

  const convertedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = snakeToCamelCase(key);
      console.log(camelCaseKey);
      const value = obj[key];
      convertedObj[camelCaseKey] =
        typeof value === "object" && value !== null
          ? convertKeysSnakeToCamel(value)
          : value;
    }
  }
  return convertedObj;
}

const LoginCalls = {
  signIn: ({ action, payload }) => {
    const snakePayload = convertKeysSnakeToCamel(payload);
    LoginService.signIn(snakePayload)
      .then((data) => action(data))
      .catch((err) => console.error(err));
  },
};

export { LoginCalls };
