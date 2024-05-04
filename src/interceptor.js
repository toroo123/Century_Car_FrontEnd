import axios from 'axios';

const setupInterceptors = () => {
  const { token } = JSON.parse(localStorage.getItem('token')) || {};

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
