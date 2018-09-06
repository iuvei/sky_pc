import axios from "axios";
import qs from "qs";
// import { host } from "../config/proxy";
// import config from "../config/proxy";
const config = require("../config/proxy");

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
  axios.defaults.headers.post["BXVIP-UA"] =
  "web";
// axios.defaults.baseURL = "http://client.sg04.com/request";

// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回状态判断
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

axios.defaults.baseUrl = config.host;

export default function http(params, url = "/PhoneApi") {
  return new Promise((resolve, reject) => {
    axios
      //.post(axios.baseUrl + url, params)
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
