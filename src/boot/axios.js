import {
  boot
} from "quasar/wrappers";
import axios from "axios";
import {
  io
} from "socket.io-client";
const api = axios.create({
  baseURL: process.env.API_URL
});
const socket = null;

export default boot(({
  app
}) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$io = io;
  app.config.globalProperties.$socket = socket;

});

export {
  api,
  io,
  socket,
};
