import http from '~/api/http';
import to from '~/api/await-to';
import mcache from 'memory-cache';

import cookie from 'cookie';

function getFromCache(
  { commit, dispatch },
  key,
  mutationType,
  action,
  actionParam
) {
  // console.log(key);
  // console.time('getFromCache');
  let obj = mcache.get(key);
  if (key.includes('getSysInfo')) {
    const _key = mcache.keys().find(x => x.includes('getSysInfo'));
    if (_key) obj = mcache.get(_key);
  }
  if (obj) {
    obj = typeof obj === 'string' ? JSON.parse(obj) : obj;
    obj.data && commit(mutationType, obj.data);
    obj = null;
  } else {
    dispatch(action, actionParam);
  }
}

export const state = () => ({});

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit, dispatch, state }, { req, res }) {
    if (process.env.static) return;
    const sys_error = mcache.get('system_error');
    if (
      state.sysinfo.error &&
      Object.keys(state.sysinfo.error).length === 0 &&
      sys_error
    ) {
      await dispatch('sysinfo/setSysError', sys_error);
    }
    if (req.headers.cookie) {
      const _cookie = cookie.parse(req.headers.cookie);
      // console.log("_cookie", _cookie);
      if (_cookie.vuex) {
        if (typeof _cookie.vuex === 'string') {
          const vuex = JSON.parse(_cookie.vuex);
          // console.log("vuex", vuex);
          if (vuex) {
            const userEncode = vuex.Login.userEncode;
            // console.log("userEncode", userEncode);
            if (
              userEncode &&
              userEncode.session_key &&
              userEncode.token &&
              req.session.hasOwnProperty('authUser')
            ) {
              // console.log("_cookie.userEncode1", userEncode);
              req.session.authUser.sessionKey = userEncode.session_key;
              req.session.authUser.session_key = userEncode.session_key;
              req.session.authUser.token = userEncode.token;
              res.cookie('vuex', '');
            } else if (
              userEncode &&
              userEncode.session_key &&
              userEncode.token &&
              !req.session.authUser
            ) {
              // console.log("_cookie.userEncode2", userEncode);
              let [err, result] = await to(
                dispatch('userinfo/encodeLogin', userEncode)
              );
              res.cookie('vuex', '');
            }
          }
        }
      }
    }
    commit('userinfo/setUserInfo', req.session.authUser);
    try {
      await dispatch('sysinfo/getSysinfo', req.headers.host);
      await dispatch('game/getGameListAtin');
    } catch (err) {}
  }
};
