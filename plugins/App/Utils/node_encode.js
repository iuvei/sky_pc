const qs = require("qs");
const md5 = require("js-md5");
const key = "bx20180701";

const encodeStr = (str, key) => {
  const strArr = unescape(str).split(""),
    keyArr = key.split("");

  for (let i = 0; i < strArr.length; i++) {
    for (let j = 0; j < keyArr.length; j++) {
      strArr[i] =
        ((strArr[i].charCodeAt && strArr[i].charCodeAt()) || strArr[i]) ^
        keyArr[j].charCodeAt();
    }
  }
  let result = "";
  for (let i = 0; i < strArr.length; i++) {
    const c = strArr[i];
    result += c.toString(16).padStart(2, "0");
  }
  return result.toUpperCase();
};

// module.exports = dataObj => {
//   "p=" +
//     `DEX${encodeStr(qs.stringify(dataObj), key)}${md5(
//       decodeURIComponent(dataObj) + "&encode=" + key
//     )}`.toUpperCase();
// };

module.exports = encodeStr;
