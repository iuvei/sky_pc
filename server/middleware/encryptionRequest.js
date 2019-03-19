const qs = require('qs');
const encryption = require('../util/encryption');
module.exports = {
  decode: function() {
    return (req, res, next) => {
      if (req.body.p) {
        let str = req.body.p.replace('DEX', '');
        str = str.substring(0, str.length - 32);
        // req.body = qs.parse(decode(str).replace(/\+/g, "~"));
        let body = qs.parse(encryption.decode(str).replace(/\+/g, '~'));
        if (body.data && Array.isArray(body.data)) {
          body.data = body.data.map(
            x => (typeof x === 'string' ? x.replace(/~/g, '+') : x)
          );
        }
        req.body = body;
        // console.log("decodeRequest", req.body);
      }
      return next();
    };
  }
};
