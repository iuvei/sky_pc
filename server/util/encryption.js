// const qs = require('qs');
// const md5 = require('js-md5');
// const key = 'bx20180701';

// 加密
const encodeStr = (str, key) => {
  const strArr = unescape(str).split(''),
    keyArr = key.split('');

  for (let i = 0; i < strArr.length; i++) {
    for (let j = 0; j < keyArr.length; j++) {
      strArr[i] =
        ((strArr[i].charCodeAt && strArr[i].charCodeAt()) || strArr[i]) ^
        keyArr[j].charCodeAt();
    }
  }
  let result = '';
  for (let i = 0; i < strArr.length; i++) {
    const c = strArr[i];
    result += c.toString(16).padStart(2, '0');
  }
  return result.toUpperCase();
};

// 解密
const decodeStr = (str, key = 'bx20180701') => {
  const isEncode = /^[0-9a-zA-Z]+$/.test(str);
  // console.log(isEncode)
  if (isEncode) {
    const valArr = str.split(''),
      keyArr = key.split(''); // 固定‘0’
    if (valArr.length % 2 !== 0) {
      return '';
    }
    const tempArr = valArr.map(item => parseInt(item, 16));
    const resArr = [];
    for (let i = 0; i < tempArr.length; i += 2) {
      resArr.push((tempArr[i] << 4) | tempArr[i + 1]);
    }
    for (let i = 0; i < resArr.length; i++) {
      for (let j = keyArr.length - 1; j >= 0; j--) {
        resArr[i] = resArr[i] ^ keyArr[j].charCodeAt();
      }
    }
    const final = resArr.map(item => String.fromCharCode(item));
    return decodeURIComponent(escape(final.join('')));
  } else {
    return str;
  }
};

module.exports = {
  encode: encodeStr,
  decode: decodeStr
};
