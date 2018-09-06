import http from "~/api/http";
import to from "~/api/await-to";
import mcache from "memory-cache";

export const state = () => ({
  mobileBackground: "",
  sysinfo: {},
  banners: [],
  news: [],
  sysNotice: "",
  syStyle: false,
  inviteCode: "" // 注册邀请码
});

export const getters = {
  syStyleGetting(state, getters, rootState) {
    let syStyle = state.syStyle;
    return syStyle;
  }
};

export const mutations = {
  setSysInfo(state, sysinfo) {
    sysinfo.service_url = sysinfo.service_url
      .replace(/\\\\u0026/g, "&")
      .replace(/\&amp\;/g, "&");
    const obj = Object.assign(state.sysinfo, sysinfo);
    state.sysinfo = obj;
  },
  setSysBanner(state, banners) {
    state.banners = banners;
  },
  setMobileBackground(state, background) {
    state.mobileBackground = background;
  },
  setNews(state, news) {
    state.news = news;
  },
  setSysNotice(state, notice) {
    state.sysNotice = notice;
  },
  setSyStyle(state, style) {
    state.syStyle = style;
  },
  autoFillCode(state, code) {
    state.inviteCode = code;
  }
};

export const actions = {
  async getSystMes({ commit }) {
    const systMes = await http({
      ac: "getNoticeAppForOffline"
    });
    return systMes;
  },
  async getSysinfo({ commit }, reqHost) {
    const sysinfo = await http({
      ac: "getSysInfo",
      enom: reqHost || ""
    });
    commit("setSysInfo", sysinfo);
    return sysinfo;
  },
  async banner({ commit }) {
    let banners = await http({
      ac: "getPCBanner"
    });
    /// getPCBanner//
    if (!banners) {
      banners = await http({
        ac: "getSystemBanner"
      });
    }
    commit("setSysBanner", banners);
    return banners;
  },
  // 获取新闻列表
  async getNews({ commit }, pageid) {
    const news = await http({
      ac: "getArticleList",
      pageid: pageid
    });
    commit("setNews", news);
    return news;
  },
  // 获取手机页面背景图
  async getMobileBackground({ commit }) {
    const img = await http({
      ac: "getMobileBanner"
    });
    commit("setMobileBackground", img);
    return img;
  },
  // 注册试玩
  async regGuestUser({ dispatch, commit, state, rootState }, params) {
    if (
      rootState.userinfo.accountInfo &&
      rootState.userinfo.accountInfo.test === 2
    )
      return;
    let res = await http({
      ac: "regGuestUser",
      tg_code: state.sysinfo.bind_param
    });
    // window.$nuxt.$Notice.open({
    //   title: '系统提示',
    //   desc: '试玩账号只提供玩家熟悉游戏，不允许充值和提款,且不享有参加优惠活动的权利，有效时间72小时。',
    //   duration: 5
    // })
    let rowModal = window.$nuxt.$AppModal({
      visible: true,
      title: "系统提示",
      showFoot: false,
      customClass: "test-account",
      content:
        '<p style="font-size:16px;"><i style="color:red;">试玩账号</i>只提供玩家熟悉游戏，不允许充值和提款,且不享有参加优惠活动的权利，有效时间<i style="color:red;">72小时</i>。</p>',
      // component: CartInfo,
      // componentData: JSON.parse(JSON.stringify(row)),
      beforeClose: b => {
        rowModal.visible = false;
      }
    });
    await dispatch("userinfo/encodeLogin", res, { root: true });
  },
  //获取系统在线提示信息
  async getOnlineSysMes({ commit }, info) {
    // console.log(store.state.userinfo.accountInfo.uid);
    // console.log(store.state.userinfo.accountInfo.token);
    // console.log(store.state.userinfo.accountInfo.sessionkey);
    let res = await http({
      ac: "getNoticeAppForOnline",
      uid: this.state.userinfo.accountInfo.uid,
      token: this.state.userinfo.accountInfo.token,
      essionkey: this.state.userinfo.accountInfo.sessionkey
    });
    // commit("setSysNotice", res);
    return res;
  },
  //获取系统离线提示信息
  async getOfflineSysMes({ commit }, info) {
    let res = await http({
      ac: "getNoticeAppForOffline"
    });
    // commit("setSysNotice", res);
    return res;
  },
  // 自动填充注册邀请码
  async autoFillCode({ commit }, code) {
    await commit("autoFillCode", code);
  }
};
