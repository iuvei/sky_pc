const { Nuxt, Builder } = require('nuxt');
const qs = require('qs');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStrore = require('connect-redis')(session);
const app = require('express')();
const request = require('request');
const proxy = require('../config/proxy');
const mcache = require('memory-cache');
const cacheApis = require('../config/cacheExpired');
const encryption = require('./util/encryption');
const md5 = require('js-md5');
const key = 'bx20180701';
const cookieName = 'BXVIP-CONNECTION-SID';

var interceptor = function(req, res, session, _resBody) {
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
    //彩种频率   //自定义缓存
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
    session.destroy(err => {});
    session.authUser = null;
  }
};

var remoteUrl =
  process.env.API || (proxy.proxy_target || 'http://client.sg04.com/request'); //代理域名
var api = '/' + proxy.api;

// 自定义请求缓存
var cache = function() {
  return (req, res, next) => {
    // console.log("body1", req.body);
    const _body = req.body;
    if (
      _body.hasOwnProperty('ac') &&
      Object.keys(cacheApis).includes(_body.ac)
    ) {
      // console.log("body2", req.body);
      let key = '__express__' + _body.ac;
      if (_body.ac === 'getSysInfo') {
        key += _body.enom;
      }
      let cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
        return;
        // next();
      } else {
        res.sendResponse = res.send;
        res.send = resBody => {
          if (_body.hasOwnProperty('ac')) {
            console.log(_body);
            if (_body.ac === 'getSysInfo') {
              key += _body.enom;
            }
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
};
// 解密方法
const decode = (str, key = 'bx20180701') => {
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
// 解密请求
var decodeRequest = function() {
  return (req, res, next) => {
    if (req.method === 'GET') {
      req.body = '';
      res.body = '';
      return next();
    } else if (!req.body || !Object.keys(req.body).length || !'p' in req.body) {
      req.body = '';
      res.body = '';
      return '';
    }
    if (req.body.p) {
      let str = req.body.p.replace('DEX', '');
      str = str.substring(0, str.length - 32);
      // req.body = qs.parse(decode(str).replace(/\+/g, "~"));
      let body = qs.parse(decode(str).replace(/\+/g, '~'));
      if (body.ac === 'UploadUserHeadIconByBase64') {
        body.img = body.img.replace(/~/g, '+');
      }
      if (body.data && Array.isArray(body.data)) {
        body.data = body.data.map(x =>
          typeof x === 'string' ? x.replace(/~/g, '+') : x
        );
      }
      req.body = body;
    }
    return next();
  };
};

// 错误处理
function errorHandle(reqBody, error, response, resBody, req, next) {
  const sysErr = mcache.get('system_error');
  let msg = '',
    sys_err = '';
  if (
    response &&
    response.hasOwnProperty('statusCode') &&
    response.statusCode !== 200
  ) {
    console.log('response.statusCode', response.statusCode, response.body);
    msg = '网络请求错误，错误码' + response.statusCode;
    return false;
  }
  if (error) {
    msg = '网络请求错误';
  } else if (!response || !resBody) {
    msg = '请求未响应';
  } else if (resBody && resBody.hasOwnProperty('msg') && resBody.msg !== 0) {
    if (resBody.msg === 45000) msg = '系统维护中';
    else if (resBody.msg === 40020) {
      msg = resBody.param;
    }
    if ([45000, 40020].includes(resBody.msg)) {
      if (!sysErr) mcache.put('system_error', resBody, 1000 * 60);
      sys_err = resBody.param;
    }
  }
  if (msg.length) {
    // 不是系统接口错误才写入日志，如果是接口错误，则直接去下个处理
    if (sys_err) {
      // next(msg);
      return true;
    } else {
      console.error({ msg, reqBody, error, response, resBody });
    }
    return false;
  }
  return true;
}
//请求头处理
function processHeader(req) {
  let headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'bxvip-ua': 'web',
    accept: 'application/json, text/plain, */*'
  };

  if (req.headers.hasOwnProperty('x-forwarded-for')) {
    headers = Object.assign(req.headers, headers);
  } else if (req.body.hasOwnProperty('ip')) {
    headers['x-forwarded-for'] = req.body.ip;
    headers['x-real-ip'] = req.body.ip;
  }
  return headers;
}
// 超时设置
let sessionExpired = 1000 * 60 * 60;

if (process.env.SessionExpired && !isNaN(process.env.SessionExpired)) {
  sessionExpired = parseInt(process.env.SessionExpired);
}

const sessionStore = {
  host: process.env.REDIS_HOST, //|| '127.0.0.1',
  port: process.env.REDIS_PORT, //|| '6379',
  db: 1,
  ttl: 1800,
  logErrors: true
};
if (process.env.REDIS_PASSWORD) {
  sessionStore.pass = process.env.REDIS_PASSWORD;
}
const sessionConfig = {
  secret: key,
  name: cookieName,
  resave: false,
  saveUninitialized: false,
  // store: new RedisStrore(sessionStore)
  cookie: { maxAge: sessionExpired } //开发环境超时时间设置为一天，上线后根据需要修改
};

if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  sessionConfig.store = new RedisStrore(sessionStore);
}
// 反向代理设置
app.set('trust proxy', 1);

app.use(session(sessionConfig));

// 处理url encode
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

// 专门处理wap同名路由跳转和推广链接
app.use('/home', function(req, res) {
  if (req.url) res.redirect(req.url);
  else res.redirect('/');
  return;
});

// 接口请求
app.use(api, decodeRequest(), function(req, res, next) {
  if (req.method === 'GET') return next();
  const headers = processHeader(req);
  var url = remoteUrl + req.url;
  let _body = req.body;
  if (
    req.body.hasOwnProperty('ac') //&&
  ) {
    let betData = req.body.data;
    // 老子自己拼参数！
    if (req.body.ac === 'userSubmitTouzhu') {
      isBetting = true;
      if (betData) {
        delete req.body.data;
      }
    }
    let __body = qs.stringify(req.body);
    if (req.body.ac === 'userSubmitTouzhu') {
      let str = betData.replace(/~/g, '+');
      __body =
        'data=' +
        str
          .replace(/\[/g, '%5B')
          .replace(/\]/g, '%5D')
          .replace(/\"/g, '%22')
          .replace(/\#/g, '%23')
          .replace(/\+/g, '%2B')
          .replace(/\|/g, '%7C') +
        '&' +
        __body;
    }
    req.body =
      'p=' +
      `DEX${encryption.encode(__body, key)}${md5(
        decodeURIComponent(__body) + '&encode=' + key
      )}`.toUpperCase();
  }

  if (process.env.NODE_ENV === 'deployment') {
    headers.Host = req.headers.host || process.env.HOST_NAME || '';
  }

  headers['content-length'] = req.body.length;

  var reqObj = {
    uri: url,
    method: 'POST',
    headers: headers,
    body: req.body,
    json: true
  };

  request(reqObj, function(_err, _res, _resBody) {
    const result = errorHandle(req.body, _err, _res, _resBody, req, next);
    if (!result) return;
    interceptor({ body: _body }, res, req.session, _resBody);
    res.json(_resBody);
  });
});

const isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV', process.env.NODE_ENV);
let config = require('../nuxt.config.js');
const nuxt = new Nuxt(Object.assign(config, { dev: !isProd }));
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt);
  // builder.build().catch(error => {
  //   console.error(error);
  //   process.exit(1);
  // });
  builder.build();
}
app.use(nuxt.render);
app.listen(process.env.PORT, process.env.HOST);
console.log('Server listening on ' + process.env.HOST + ':' + process.env.PORT);
