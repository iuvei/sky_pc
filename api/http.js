import axios from 'axios';
import qs from 'qs';
import md5 from 'js-md5';
import encode from '../plugins/App/Utils/encode';
import cache from '../plugins/clientCache';
import cacheExpired from '../config/cacheExpired';

import getLocalUser from '../plugins/getLocalUser';
const cachedKeys = Object.keys(cacheExpired);

const proxy = require('../config/proxy');
const whiteList = [41012]; //白名单错误代码
const version = 'v1.0.0';
const key = 'bx20180701';
const isBrowser = process.browser;

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.post['BXVIP-UA'] = 'web';

// 定义默认参数
if (process.server) {
  let protaol;
  axios.defaults.baseURL = `${process.env.PROTOCOL || 'http'}://${
    process.env.HOST
  }${process.env.PORT ? ':' + process.env.PORT : ''}`;
} else {
  axios.defaults.baseURL = `${window.location.origin}`;
}

// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      const isObj = typeof config.data === 'object';
      config.data = isObj ? qs.stringify(config.data) : config.data;
      // console.warn('requst', config.data);
      if (process.browser) {
        config.data =
          'p=' +
          `DEX${encode(config.data, key)}${md5(
            decodeURIComponent(config.data) + '&encode=' + key
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
  let hasKey = false;
  if (process.browser) {
    if (params.hasOwnProperty('ac') && cachedKeys.includes(params.ac)) {
      hasKey = true;
    }
    params.loading && window.$nuxt.$Spin.show();
    let cachedData = null;

    if (process.env.static) {
      if (hasKey) cachedData = cache.getDataByKey(params.ac);
      if (cachedData && !cache.dataIsExpried(params.ac)) {
        window.$nuxt.$Spin.hide();
        // return cache.getDataByKey(params.ac);
        // console.log('getfrom cache', params.ac);
        return Promise.resolve(cachedData);
      }
    }
  }
  params.client_type = 0;
  params.edition = version;
  if (process.browser) {
    let user = window.$nuxt.$store.state.userinfo.accountInfo;
    if (!user || !user.uid) {
      user = getLocalUser();
    }
    if (user && user.uid) {
      params.token = user.token;
      params.uid = params.uid || user.uid;
      params.sessionkey = user.session_key;
    }
  }
  let msg = '';

  //为了防止服务端内存泄漏，返回的new Promise 有可能造成一直被引用无法回收的情况，就不返回new Promise了
  return axios
    .post(url, params)
    .then(res => {
      if (process.browser) {
        window.$nuxt.$Spin.hide();
      }
      let data = res.data;
      if (data.msg === 0) {
        if (process.env.static && hasKey) {
          cache.setItem(params.ac, data.data);
        }
        return Promise.resolve(data.data);
      }
      if (data.msg === 60020) {
        // 防抖 @click.stop.prevent没有作用
        return Promise.reject(data.param);
      } else {
        if (data.msg === 40000) {
          msg = '登录超时，请重新登录';
          if (process.browser) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userIndex');
            localStorage.removeItem('expire');
            window.$nuxt.$store.commit('userinfo/logout');
            if (window.$nuxt.$route.name !== 'login') {
              window.location.href = '/login';
            }
          }
        } else if (process.env.static && data.msg === 40020) {
          window.$nuxt.$store.dispatch('sysinfo/setSysError', data);
          window.$nuxt.$router.push({
            name: 'ipforbidden',
            params: data
          });
        } else if (whiteList.includes(data.msg)) {
          return Promise.resolve(0)
        }
        process.browser && window.$nuxt.$Message.warning(msg || data.param);
        return Promise.reject(data.param);
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
