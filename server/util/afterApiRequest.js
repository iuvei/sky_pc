const mcache = require('memory-cache');
module.exports = {
  interceptor: function(req, res, session, _resBody) {
    if (_resBody.hasOwnProperty('msg') && _resBody.msg === 0) {
      //登录
      let isLoginRequest =
        req.body &&
        req.body.ac &&
        (req.body.ac === 'userLogin' || req.body.ac === 'encodeLogin');
      if (isLoginRequest && _resBody.data && _resBody.data.uid) {
        session.authUser = _resBody.data;
      }
      //登出
      let isLogoutRequest =
        req.body && req.body.ac && req.body.ac === 'userLogout';
      if (isLogoutRequest && session) {
        session.destroy(err => {});
        session.authUser = null;
      }
      isLoginRequest = isLogoutRequest = null;
      //彩种频率
      if (req.body.ac === 'getKjCpLog') {
        let qishu = mcache.get('__GamesQishu__');
        if (
          !qishu &&
          _resBody &&
          _resBody.data &&
          Array.isArray(_resBody.data) &&
          _resBody.data.length &&
          _resBody.data[0].qishu
        ) {
          let qishus = _resBody.data.map(x => {
            return {
              gameid: x.gameid,
              js_tag: x.js_tag,
              tag: x.tag,
              qishu: x.qishu,
              pinlv: x.pinlv
            };
          });
          mcache.put('__GamesQishu__', qishus, 1000 * 60 * 60 * 2);
          qishus = qishu = null;
        }
      }
      //刷新金额
      if (req.body.ac === 'flushPrice' && session.authUser) {
        if (_resBody.data && _resBody.data.price) {
          session.authUser.price = _resBody.data.price;
        }
      }
    } else if (_resBody.hasOwnProperty('msg') && _resBody.msg === 40000) {
      // 超时处理
      session.destroy(err => {});
      session.authUser = null;
    }
  }
};
