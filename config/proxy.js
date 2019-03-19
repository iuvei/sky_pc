const staticConfig = require('./staticConfig.json')
module.exports = {
  // proxy_target: 'http://app.zjgguolong.com/request',
  proxy_target: 'http://www.pyhongxing.com/request',
  // proxy_target: 'http://client.sg04.com/request',
  // proxy_target: 'http://qaclient.sg04.com/request', // 电子&棋牌&捕鱼
  // proxy_target: 'http://qat-web.bxvip.co/request',
  // proxy_target: "http://699679.com/request",
  // proxy_target: 'https://qcw108.com//request',
  // proxy_target: 'https://dada000.cc/request',

  api: staticConfig.static ? 'request' : 'api'
}
// 注意如果接入业主域名时请确认业主域名是否有https
