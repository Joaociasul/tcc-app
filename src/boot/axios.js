import {
  boot
} from "quasar/wrappers";
import axios from "axios";
import {
  io
} from "socket.io-client";
const url_api = process.env.API_URL
const api = axios.create({
  baseURL: url_api
});
const socket = null;



export default boot(({
  app
}) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$io = io;
  app.config.globalProperties.$socket = socket;
  app.config.globalProperties.$url_api = url_api;
});

export {
  api,
  io,
  socket,
  url_api
};
