import http from "~/api/http";
import to from "~/api/await-to";
import mcache from "memory-cache";

function getFromCache({ commit }, key, mutationType) {
  let obj = mcache.get(key);
  if (obj) {
    obj = typeof obj === "string" ? JSON.parse(obj) : obj;
    obj.data && commit(mutationType, obj.data);
    obj = null;
  }
}

export const state = () => ({
  user_flag: "aaa",
  accountInfo: {},
  isLogin: false,
  autoToken: "",
  isServerLogin: false
});

export const mutations = {
  setUserInfo(state, userinfo) {
    if (userinfo && userinfo.uid) {
      if (process.browser) {
        localStorage.userInfo = JSON.stringify({
          code: userinfo.code,
          uid: userinfo.uid
        });
        state.isServerLogin = false;
      }
      if (process.server) {
        state.isServerLogin = true;
      }
      state.accountInfo = userinfo;
      state.isLogin = true;
      state.logout = false;
      state.user_flag = userinfo.user_flag;
    }
  },
  setPrice(state, price) {
    if (state.isLogin && state.accountInfo.uid) {
      if (!isNaN(price.price)) {
        state.accountInfo.price = price.price;
        state.accountInfo.real_name = price.real_name;
      }
    }
    state.user_flag = price.user_flag;
    // console.log(state.user_flag);
  },
  logout(state) {
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
    state.accountInfo = {};
    state.isLogin = false;
    state.autoToken = "";
    // this.$router.push("/");
  },
  setLogout(state) {
    state.logout = true;
  },
  clearUserinfo(state) {
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
  },
  getUserflag(state, flag) {
    state.user_flag = flag.user_flag;
  }
};

export const actions = {
  async flushPrice({ commit }) {
    const price = await http({
      ac: "flushPrice"
    });
    commit("setPrice", price);
    return price;
  },
  //领取红包
  async getGifs({ commit }, user) {
    let res = await http({ ac: "UserGetEventAward" });
    return res;
  },

  async register({ commit, dispatch }, userinfo) {
    const newOne = Object.assign({}, userinfo, {
      vcode: 6666,
      vid: "b97ec930-7c7c-11e8-acae-0242ac190002"
    });
    let user = await http({
      ac: "regUser",
      ...newOne
    });
    return dispatch("encodeLogin", user);
  },

  async login({ commit }, userinfo) {
    let user = await http({
      ac: "userLogin",
      username: userinfo.username,
      password: userinfo.password,
      vcode: 6666,
      vid: "b97ec930-7c7c-11e8-acae-0242ac190002"
    });
    user && commit("setUserInfo", user);
    return user;
  },
  async logout({ commit }, user) {
    let result = await http({
      ac: "userLogout",
      uid: user.uid,
      token: user.token,
      sessionkey: user.session_key
    });

    commit("logout");
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }

    return result;
  },
  async encodeLogin({ commit, dispatch }, user) {
    console.log("encodeLogin", user);
    let userinfo = null;
    if (process.browser) {
      userinfo = JSON.parse(localStorage.getItem("userInfo"));
    }

    const code = (user && user.code) || (userinfo && userinfo.code);
    const uid = (user && user.uid) || (userinfo && userinfo.uid);
    const res = await http({
      ac: "encodeLogin",
      code,
      uid
    });
    if (res && res.uid) {
      commit("setUserInfo", res);
      await dispatch("flushPrice");
      return true;
    } else return false;
  }
};
