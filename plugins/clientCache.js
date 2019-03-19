import cacheExpried from '../config/cacheExpired';

import encode from './App/Utils/encode';
import decode from './App/Utils/decode';

const keys = Object.keys(cacheExpried);
const cacheObj = {};

if (process.browser && process.env.static) {
  if (!window.___cacheObj) {
    keys.forEach(key => {
      const _key = encode(key);
      let obj = localStorage.getItem(_key);
      if (obj) {
        cacheObj[_key] = JSON.parse(obj);
      }
    });
    window.___cacheObj = cacheObj;
  }
}

const dataIsExpried = key => {
  const _key = encode(key);
  const obj = cacheObj[_key];
  if (!obj) return true;
  else return new Date().getTime() > obj.expried;
};

const getDataByKey = key => {
  const obj = cacheObj[encode(key)];
  if (obj) {
    return obj.data;
  }
  return null;
};

const hasKey = key => {
  return cacheObj.hasOwnProperty(encode(key));
};

const setItem = (key, data) => {
  if (!keys.includes(key)) return;
  const _key = encode(key);
  if (dataIsExpried(key)) {
    localStorage.setItem(
      _key,
      JSON.stringify({
        expried: new Date().getTime() + cacheExpried[key] * 1000,
        data: data
      })
    );
  }
};

export default { dataIsExpried, getDataByKey, setItem, hasKey };
