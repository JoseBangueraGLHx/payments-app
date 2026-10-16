// Guardar en memoria el token de la API para evitar múltiples llamadas a la API intermedia

const createauthToken = () => {
  let token = null;

  return {
    setToken: (newToken) => {
      token = newToken;
    },
    getToken: () => token,
    clearToken: () => {
      token = null;
    },
  };
};

const authTokenManager = createauthToken();

export default authTokenManager;
