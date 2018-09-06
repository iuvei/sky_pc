const { Nuxt, Builder } = require("nuxt");
const qs = require("qs");
const queryString = require("query-string");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = require("express")();
const request = require("request");
const proxy = require("../config/proxy");
const mcache = require("memory-cache");
const cacheApis = require("../config/cacheExpired");
const encodeStr = require("../plugins/app/Utils/node_encode");
const md5 = require("js-md5");
const key = "bx20180701";

var interceptor = function(req, session, _resBody) {
  if (_resBody.hasOwnProperty("msg") && _resBody.msg === 0) {
    //登录
    let isLoginRequest =
      req.body &&
      req.body.ac &&
      (req.body.ac === "userLogin" || req.body.ac === "encodeLogin");
    if (isLoginRequest && _resBody.data && _resBody.data.uid) {
      session.authUser = _resBody.data;
    }
    //登出
    let isLogoutRequest =
      req.body && req.body.ac && req.body.ac === "userLogout";
    if (isLogoutRequest) {
      session.authUser = null;
    }
    isLoginRequest = isLogoutRequest = null;
    //彩种频率   //自定义缓存
    if (req.body.ac === "getKjCpLog") {
      let qishu = mcache.get("__GamesQishu__");
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
        mcache.put("__GamesQishu__", qishus, 1000 * 60 * 60 * 2);
        qishus = qishu = null;
      }
    }
    //刷新金额
    if (req.body.ac === "flushPrice" && session.authUser) {
      if (_resBody.data && _resBody.data.price) {
        session.authUser.price = _resBody.data.price;
      }
    }
  } else if (_resBody.hasOwnProperty("msg") && _resBody.msg === 40000) {
    session.authUser = null;
  }
};

var remoteUrl =
  process.env.API || (proxy.proxy_target || "http://client.sg04.com/request"); //代理域名
var api = "/" + proxy.api;

// 自定义请求缓存
var cache = function() {
  return (req, res, next) => {
    // console.log("body1", req.body);
    let _body = req.body;
    if (
      req.body.hasOwnProperty("ac") &&
      Object.keys(cacheApis).includes(req.body.ac)
    ) {
      // console.log("body2", req.body);
      let key = "__express__" + req.body.ac;
      if (_body.ac === "getSysInfo") {
        key += _body.enom;
      }
      let cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
        return;
        // next();
      } else {
        res.sendResponse = res.send;
        res.send = body => {
          // console.log("body3", req.body, _body);
          if (_body.hasOwnProperty("ac")) {
            // console.log(_body);
            if (_body.ac === "getSysInfo") {
              key += _body.enom;
            }
            mcache.put(key, body, cacheApis[_body.ac] * 1000);

            res.sendResponse(body);
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
const decode = (str, key = "bx20180701") => {
  const isEncode = /^[0-9a-zA-Z]+$/.test(str);
  // console.log(isEncode)
  if (isEncode) {
    const valArr = str.split(""),
      keyArr = key.split(""); // 固定‘0’
    if (valArr.length % 2 !== 0) {
      return "";
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
    return decodeURIComponent(escape(final.join("")));
  } else {
    return str;
  }
};
// 解密请求
var decodeRequest = function() {
  return (req, res, next) => {
    if (req.body.p) {
      let str = req.body.p.replace("DEX", "");
      str = str.substring(0, str.length - 32);
      // req.body = qs.parse(decode(str).replace(/\+/g, "~"));
      let body = qs.parse(decode(str).replace(/\+/g, "~"));
      if (body.data && Array.isArray(body.data)) {
        body.data = body.data.map(
          x => (typeof x === "string" ? x.replace(/~/g, "+") : x)
        );
      }
      req.body = body;
      // console.log("decodeRequest", req.body);
    }
    return next();
  };
};

// 错误处理
function errorHandle(reqBody, error, response, resBody) {
  var msg = "";
  if (
    response &&
    response.hasOwnProperty("statusCode") &&
    response.statusCode !== 200
  ) {
    console.log("response.statusCode", response.statusCode, response.body);
    msg = "网络请求错误，错误码" + response.statusCode;
    return false;
  }
  if (error) {
    msg = "网络请求错误";
  } else if (!response || !resBody) {
    msg = "请求未响应";
  } else if (
    resBody &&
    resBody.hasOwnProperty("msg") &&
    resBody.msg === 45000
  ) {
    msg = "系统维护中";
  }
  if (msg.length) {
    console.error({ msg, reqBody, error, response, resBody });
    return false;
  }
  return true;
}

// 超时设置
let sessionExpired = 1000 * 60 * 60;

if (process.env.SessionExpired && !isNaN(process.env.SessionExpired)) {
  sessionExpired = parseInt(process.env.SessionExpired);
}

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: sessionExpired } //开发环境超时时间设置为一天，上线后根据需要修改
  })
);
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(api, decodeRequest(), cache(), function(req, res) {
  // console.log("first_req.body", req.body);
  // console.log("");
  var url = remoteUrl + req.url;
  // 获取系统信息添加域名
  // if (req.body.ac === "getSysInfo") {
  //   // req.body.enom = req.get("host"); //"3345a.com"; //req.get("host");
  //   console.log("enom", req.body);
  // }
  let _body = req.body;
  if (
    req.body.hasOwnProperty("ac") //&&
  ) {
    let betData = req.body.data;
    // console.log("betData", betData);
    // 老子自己拼参数！
    if (req.body.ac === "userSubmitTouzhu") {
      if (betData) {
        delete req.body.data;
      }
    }
    let __body = qs.stringify(req.body);
    if (req.body.ac === "userSubmitTouzhu") {
      let str = "";
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
      str = str.substring(0, str.length - 1);
      __body +=
        "&data=" +
        `[${str}]`
          .replace(/\[/g, "%5B")
          .replace(/\]/g, "%5D")
          .replace(/\"/g, "%22")
          .replace(/\#/g, "%23")
          .replace(/\+/g, "%2B")
          .replace(/\|/g, "%7C");
    }
    // if (req.body.ac === "UploadUserHeadIconByBase64") {
    //   __body = __body.replace(/\~/g, "+");
    //   console.log("beforeRequest__body", __body, req.body);
    // }
    __body = __body.replace(/\~/g, "+");
    req.body =
      "p=" +
      `DEX${encodeStr(__body, key)}${md5(
        decodeURIComponent(__body) + "&encode=" + key
      )}`.toUpperCase();
  }

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "BXVIP-UA": "web",
    Accept: "application/json, text/plain, */*"
  };

  if (process.env.NODE_ENV === "deployment") {
    headers.Host = req.headers.host || process.env.HOST_NAME || "";
  }

  request(
    {
      uri: url,
      method: "POST",
      headers: headers,
      body: req.body,
      json: true
    },
    function(_err, _res, _resBody) {
      // console.log("process.env.HOST_NAME", process.env.HOST_NAME);
      // console.log(req.hostname);
      const result = errorHandle(req.body, _err, _res, _resBody);
      if (!result) return;
      interceptor({ body: _body }, req.session, _resBody);
      res.json(_resBody);
    }
  );
});

const isProd = process.env.NODE_ENV === "production";
console.log("NODE_ENV", process.env.NODE_ENV);
let config = require("../nuxt.config.js");
const nuxt = new Nuxt(Object.assign(config, { dev: !isProd }));
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt);
  builder.build().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
app.use(nuxt.render);
app.listen(process.env.PORT, process.env.HOST);
console.log("Server listening on " + process.env.HOST + ":" + process.env.PORT);
