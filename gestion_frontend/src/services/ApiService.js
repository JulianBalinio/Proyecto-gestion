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
      const value = obj[key];
      convertedObj[camelCaseKey] =
        typeof value === "object" && value !== null
          ? convertKeysSnakeToCamel(value)
          : value;
    }
  }
  return convertedObj;
}

const Api = {
  getHeaders: () => {
    const headers = {
      "Content-Type": "application/json",
    };
    return headers;
  },
  fetch: async (url, method = "GET", data = null) => {
    const headers = Api.getHeaders();
    const body =
      data && method !== "GET" ? { body: JSON.stringify(data) } : null;

    const info = {
      method,
      headers,
      ...body,
    };

    return fetch(url, info).then((resp) => {
      if (resp.status === 204) {
        return null;
      }
      return resp.json();
    });
  },
};

export { Api, convertKeysSnakeToCamel };
