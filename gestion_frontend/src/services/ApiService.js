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

export { Api };
