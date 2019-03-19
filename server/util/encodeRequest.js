const qs = require('qs');
const encryption = require('./encryption');
const md5 = require('js-md5');
const key = 'bx20180701';
module.exports = {
  encode: function(req) {
    if (
      req.body.hasOwnProperty('ac') // 如果是未加密的
    ) {
      let betData = req.body.data;
      // console.log("betData", betData);
      // 老子自己拼参数！
      if (req.body.ac === 'userSubmitTouzhu') {
        // console.log('投注参数', req.body, '序列化参数', qs.stringify(req.body));
        if (betData) {
          delete req.body.data;
        }
      }
      let __body = qs.stringify(req.body);

      if (req.body.ac === 'userSubmitTouzhu') {
        // 判断如果是投注接口
        let str = '';
        // 如果是对象，转为数组
        if (!Array.isArray(betData)) {
          let _arr = [],
            _keys = Object.keys(betData);
          _keys.forEach(x => _arr.push(betData[x]));
          betData = _arr;
          // console.log("betData2", betData);
        }
        betData.forEach((x, index) => {
          str += `"${x}",`;
        });
        str = str.substring(0, str.length - 1); // 去掉末尾逗号
        // 处理投注加密数据
        __body +=
          '&data=' +
          `[${str}]`
            .replace(/\[/g, '%5B')
            .replace(/\]/g, '%5D')
            .replace(/\"/g, '%22')
            .replace(/\#/g, '%23')
            .replace(/\+/g, '%2B')
            .replace(/\|/g, '%7C');
      }

      __body = __body.replace(/\~/g, '+'); // 由于qs序列化将会过滤 + 号，因此必须把之前的 ~ 变成 + 号
      req.body.ac === 'userSubmitTouzhu' && console.log('加密前', __body);
      const encryptionStr =
        'p=' +
        `DEX${encryption.encode(__body, key)}${md5(
          decodeURIComponent(__body) + '&encode=' + key
        )}`.toUpperCase();
      req.body.ac === 'userSubmitTouzhu' &&
        console.log('加密后', encryptionStr);
      return encryptionStr;
    }
    return null;
  }
};
