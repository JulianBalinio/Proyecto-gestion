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
  getHeaders: (isLogin = false) => {
    const token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (!isLogin) {
      headers.Authorization = token && `Bearer ${token}`;
    }
    return headers;
  },
  fetch: async (url, method = "GET", data = null, isLogin = false) => {
    const headers = Api.getHeaders(isLogin);
    const body =
      data && method !== "GET" ? { body: JSON.stringify(data) } : null;

    const info = {
      method,
      headers,
      ...body,
    };

    return fetch(url, info).then(async (resp) => {
      const response = {
        status: resp.status,
        data: null,
      };

      if (resp.status === 204) {
        return response;
      }

      try {
        response.data = await resp.json();
      } catch (error) {
        console.error("Error al analizar la respuesta JSON:", error);
      }

      return response;
    });
  },
};

export { Api, convertKeysSnakeToCamel };
