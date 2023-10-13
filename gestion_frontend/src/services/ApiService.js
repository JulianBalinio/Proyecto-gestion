function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

function convertKeysCamelToSnake(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysCamelToSnake(item));
  }

  const convertedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = camelToSnake(key);
      const value = obj[key];
      convertedObj[camelCaseKey] =
        typeof value === "object" && value !== null
          ? convertKeysCamelToSnake(value)
          : value;
    }
  }
  return convertedObj;
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
      const camelCaseKey = snakeToCamel(key);
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

    return fetch(url, info)
      .then(async (resp) => {
        const response = {
          status: resp.status,
          data: null,
        };

        if (resp.status === 204) {
          return response;
        }

        if (resp.status === 400) {
          try {
            response.data = await resp.json();
            console.error(response.data);
          } catch (error) {
            console.error("Error al analizar la respuesta JSON:", error);
          }
          return response;
        }

        try {
          response.data = await resp.json();
        } catch (error) {
          console.error("Error al analizar la respuesta JSON:", error);
        }

        return response;
      })
      .catch((error) => {
        console.error("Error en la llamada a fetch:", error);
        // Puedes lanzar el error nuevamente si quieres que sea manejado en el código que llama a esta función
        throw error;
      });
  },
};

export { Api, convertKeysCamelToSnake, convertKeysSnakeToCamel };
