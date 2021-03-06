import AppConsts from "../utils/appconst";
import { Modal } from "antd";
import axios from "axios";
import utils from "../utils/utils";
import Exception from "../scenes/Exception";

const qs = require("qs");

const http = axios.create({
  baseURL: AppConsts.appBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config) {
    if (utils.getCookie("access_token")) {
      config.headers.common["Authorization"] =
        "Bearer " + utils.getCookie("access_token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 400) {
      Modal.error({
        title: error.response.statusText,
        content: error.response.data.message[0].messages[0].message,
      });
      return { data: new Exception(error) };
    } else if (
      error.response?.status === 500 &&
      error.response.config.url === "api/TokenAuth/Authenticate"
    ) {
      Modal.error({
        title:
          error.response.data.error.message === "Login failed"
            ? "Uh-Oh"
            : error.response.data.error.message,
        content:
          error.response.data.error.message === "Login failed!"
            ? "It seems that you have entered an incorrect user name, email, or password. Please try again."
            : error.response.data.error.details,
      });
    } else if (error.response.status === 500) {
      alert("Your session has timed out. Please login again.");
      window.location.href = "/user/login";
    } else if (!error.response) {
      if (axios.isCancel(error)) {
      } else {
        Modal.error({ content: "UnknownError" });
      }
    }
    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  },
);

export default http;
