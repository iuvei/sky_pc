import http from "~/api/http";
import to from "~/api/await-to";
import mcache from "memory-cache";
// var cookie = require('cookie');
import cookie from "cookie";

function getFromCache(
  { commit, dispatch },
  key,
  mutationType,
  action,
  actionParam
) {
  let obj = mcache.get(key);
  if (obj) {
    obj = typeof obj === "string" ? JSON.parse(obj) : obj;
    obj.data && commit(mutationType, obj.data);
    obj = null;
  } else {
    dispatch(action, actionParam);
  }
}

export const state = () => ({});

export const mutations = {
  // [types.SET_USER_FLAG](state, flag) {
  //    // 红包
  //    state.userFlag.redGift = 1 & flag ? 1 : 0
  // }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, res }) {
    // if (req.session && req.session.authUser) {
    //   commit("userinfo/setUserInfo", req.session.authUser);
    // } else {
    //   commit("userinfo/setLogout");
    //   commit("userinfo/logout");
    // }
    // if (req.session.authUser) {
    //   dispatch("userinfo/encodeLogin", req.session.authUser);
    // }
    // const cookies = req.cookies;

    if (req.headers.cookie) {
      const _cookie = cookie.parse(req.headers.cookie);
      // console.log("_cookie", _cookie);
      if (_cookie.vuex) {
        if (typeof _cookie.vuex === "string") {
          const vuex = JSON.parse(_cookie.vuex);
          // console.log("vuex", vuex);
          if (vuex) {
            const userEncode = vuex.Login.userEncode;
            // console.log("userEncode", userEncode);
            if (
              userEncode &&
              userEncode.session_key &&
              userEncode.token &&
              req.session.authUser
            ) {
              // console.log("_cookie.userEncode1", userEncode);
              req.session.authUser.sessionKey = userEncode.session_key;
              req.session.authUser.session_key = userEncode.session_key;
              req.session.authUser.token = userEncode.token;
              res.cookie("vuex", "");
            } else if (
              userEncode &&
              userEncode.session_key &&
              userEncode.token &&
              !req.session.authUser
            ) {
              // console.log("_cookie.userEncode2", userEncode);
              let [err, result] = await to(
                dispatch("userinfo/encodeLogin", userEncode)
              );
              res.cookie("vuex", "");
            }
          }
        }
      }
    }
    commit("userinfo/setUserInfo", req.session.authUser);
    getFromCache(
      { commit, dispatch },
      "__express__getSysInfo",
      "sysinfo/setSysInfo",
      "sysinfo/getSysinfo",
      req.headers.host
    );

    getFromCache(
      { commit, dispatch },
      "__express__getGameListAtin",
      "game/setGameList",
      "game/getGameListAtin"
    );

    if (req.session && req.session.inviteCode) {
      // console.log("session.inviteCode", req.session.inviteCode);
      commit("sysinfo/autoFillCode", req.session.inviteCode);
      delete req.session.inviteCode;
    }
  }
};
