const mcache = require('memory-cache');
const cacheApis = require('../../config/cacheExpired');
// 自定义请求缓存
module.exports = {
  cache: function() {
    return (req, res, next) => {
      const _body = req.body;
      if (
        _body.hasOwnProperty('ac') &&
        Object.keys(cacheApis).includes(_body.ac)
      ) {
        let key = '__express__' + _body.ac;
        if (_body.ac === 'getSysInfo') {
          key += _body.enom;
        }
        let cachedBody = mcache.get(key);
        if (cachedBody) {
          res.send(cachedBody);
          return;
        } else {
          res.sendResponse = res.send;
          res.send = resBody => {
            if (_body.hasOwnProperty('ac')) {
              mcache.put(key, resBody, cacheApis[_body.ac] * 1000);

              res.sendResponse(resBody);
            } else return next();
          };
          return next();
        }
      } else {
        return next();
      }
    };
  }
};
