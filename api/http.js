import axios from "axios";
import qs from "qs";
import md5 from "js-md5";
import encode from "../plugins/App/Utils/encode";

const proxy = require("../config/proxy");
const whiteList = [41012]; //白名单错误代码
const version = "v1.0.0";
const key = "bx20180701";

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";
axios.defaults.headers.post["BXVIP-UA"] = "web";

// 定义默认参数
if (process.server) {
  let protaol;
  axios.defaults.baseURL = `${process.env.PROTOCOL || "http"}://${
    process.env.HOST
  }${process.env.PORT ? ":" + process.env.PORT : ""}`;
} else {
  axios.defaults.baseURL = `${window.location.origin}`;
}

// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data =
        typeof config.data === "object"
          ? qs.stringify(config.data)
          : config.data;
      if (process.browser && process.env.NODE_ENV !== "production") {
        console.log(config.data);
      }
      if (process.browser) {
        config.data =
          "p=" +
          `DEX${encode(config.data, key)}${md5(
            decodeURIComponent(config.data) + "&encode=" + key
          )}`.toUpperCase();
      }
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

export default function http(params, url = `/${proxy.api}`) {
  if (process.browser) {
    params.loading && window.$nuxt.$Spin.show();
  }
  params.client_type = 0;
  params.edition = version;
  if (process.browser) {
    const user = window.$nuxt.$store.state.userinfo.accountInfo;
    if (user.uid) {
      params.token = user.token;
      params.uid = params.uid || user.uid;
      params.sessionkey = user.session_key;
    }
  }
  let msg = "";
  //为了防止服务端内存泄漏，返回的new Promise 有可能造成一直被引用无法回收的情况，就不返回new Promise了
  return axios
    .post(url, params)
    .then(res => {
      if (process.browser) {
        window.$nuxt.$Spin.hide();
      }
      let data = res.data;
      if (data.msg === 0) {
        return Promise.resolve(data.data);
      } else {
        if (data.msg === 40000) {
          msg = "登录超时，请重新登录";
          if (process.browser) {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userIndex");
            localStorage.removeItem("expire");
            window.$nuxt.$store.commit("userinfo/logout");
            if (window.$nuxt.$route.name !== "login") {
              window.$nuxt.$router.push("/login");
            }
          }
        }
        process.browser && window.$nuxt.$Message.warning(msg || data.param);
        return Promise.reject(data.param);
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
