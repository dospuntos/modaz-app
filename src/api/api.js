import axios from "axios";
const baseUrl = process.env.REACT_APP_API2_URL;

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const access_token = getToken()?.access_token;
    if (access_token) {
      config.headers["Authorization"] = access_token;
    }
    config.headers["Content-Type"] = "application/json";
    console.log(
      "Tried to add access token - " +
        access_token +
        ", and added 'application/json' header"
    );
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refresh_token = getToken()?.refresh_token;
    let session_id = getToken()?.session_id;
    if (
      refresh_token &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .patch(`${baseUrl}/sessions/${session_id}`, {
          refresh_token,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.data));
            console.log("Access token and refresh token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
//functions to make api calls

const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/users`, body);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/sessions`, body);
  },
  refreshToken: () => {
    let session_id = getToken().session_id;
    let refresh_token = getToken().refresh_token;
    return axios.patch(`${baseUrl}/sessions/${session_id}`, {
      refresh_token,
    });
  },
  logout: () => {
    console.log("Logging out");
    let session_id = getToken().session_id;
    console.log("Session ID: ", session_id);
    return axios.delete(`${baseUrl}/sessions/${session_id}`);
  },
  clearSessions: () => {
    return axios.delete(`${baseUrl}/sessions/0`);
  },
  getProducts: () => {
    console.log("Getting products from API v2");
    return axios.get(`${baseUrl}/products`);
  },
  getProtected: () => {
    return axios.get(`${baseUrl}/products/121`);
  },
  getProduct: (id) => {
    return axios.get(`${baseUrl}/products/${id}`);
  },
};
export default api;
