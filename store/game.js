import http from '~/api/http';
import to from '~/api/await-to';
import mcache from 'memory-cache';
import cache from '../plugins/clientCache';
let otherJsTag = ['qxc', 'pkniuniu', 'xypk', 'xync', 'tzyx'];
export const state = () => ({
  gameList: [],
  nowGameTag: '',
  isShowAllGame: false,
  game2txt: {
    ssc: '时时彩',
    pk10: 'PK拾',
    k3: '快三',
    '11x5': '11选5',
    '3d': '3D',
    lhc: '六合彩',
    pcdd: 'PC蛋蛋',
    sport_key: '体彩',
    otherJsTag: '其他彩种'
  },
  gameId: 0,
  gameItem: {},
  curIndex: 0,
  qishus: 0,
  odd: []
  // timeout: {}
});

export const getters = {
  gameList(state) {
    const key = 'getGameListAtin';

    if (state.gameList.length) return state.gameList;
    else if (cache.hasKey(key) && !cache.dataIsExpried(key)) {
      return cache.getDataByKey(key);
    }
    return [];
  }
};

export const mutations = {
  setGameList(state, data) {
    state.gameList = data;

    // 设置六合彩的yearid
    const lhc = data.find(i => i.js_tag === 'lhc');
    if (lhc && 'yearid' in lhc && process.browser) {
      window.yearid = lhc.yearid;
      sessionStorage.setItem('yearid', lhc.yearid);
    }
  },
  setGameId(state, id) {
    state.gameId = id;
  },
  setGameItem(state, item) {
    state.gameItem = item;
  },
  setCurIndex(state, index) {
    state.curIndex = index;
  },
  setGameQishu(state, qishus) {
    state.qishus = qishus;
  },
  setGameOdd(state, odd) {
    state.odd = odd;
  },
  setNowGameTag(state, js_tag) {
    state.nowGameTag = js_tag;
  },
  setShowAllGame(state, isShow) {
    state.isShowAllGame = isShow;
  }
};

export const actions = {
  // 获取游戏配置信息
  async getGameListAtin({ commit, rootState }) {
    let ret = await http({
      ac: 'getGameListAtin',
      ip: rootState.ip
    });
    commit('setGameList', ret);
    return ret;
  },
  // 开奖倒计时
  async getCplogList({ commit }, request = {}) {
    let ret = await http({
      ac: 'getCplogList',
      client_type: 0,
      ...request
    });
    // console.log(ret);
    return ret;
  },
  // 开奖记录
  async getKjCpLog({ commit }, request = {}) {
    let ret = await http({
      ac: 'getKjCpLog',
      ...request
    });
    // console.log(ret);
    return ret;
  },
  // 开奖走势
  async getTrenlistData({ commit }, request = {}) {
    let ret = await http({
      ac: 'getTrenlistData',
      pageid: 0,
      ...request
    });
    return ret;
  },
  // 中奖记录
  async getUserWinList({ commit }) {
    let ret = await http({
      ac: 'userWinList'
    });
    return ret;
  },
  // 玩法列表
  async getGamePlayConfig({ commit }, jsTag) {
    return await http({ ac: 'getGamePlayConfig', js_tag: jsTag });
  },
  // 获取赔率
  async getPeilv({ dispatch, rootState }) {
    if (rootState.userinfo.isLogin) {
      return await dispatch('getPeilvConfig');
    } else {
      return await dispatch('getPeilvNoLogin');
    }
  },
  // 获取登录后获取赔率
  async getPeilvConfig({ commit, state }) {
    return await http({ ac: 'getPeilvConfig', gameid: state.gameId });
  },
  // 获取登录前获取赔率
  async getPeilvNoLogin({ state, commit, rootState }) {
    return await http({
      ac: 'getPeilvNoLogin',
      gameid: state.gameId,
      bind_param: rootState.sysinfo.sysinfo.bind_param
    });
  },
  // 从缓存读取期数并设置
  async getQishus({ commit }, data) {
    if (process.server) {
      let qishus = mcache.get('__GamesQishu__');
      if (qishus) {
        commit('setGameQishu', qishus);
      }
    } else {
      if (data && Array.isArray(data) && data.length) {
        let qishus = data.map(x => {
          return {
            gameid: x.gameid,
            js_tag: x.js_tag,
            tag: x.tag,
            qishu: x.qishu,
            pinlv: x.pinlv
          };
        });
        commit('setGameQishu', qishus);
      }
    }
  },
  //设置当前开奖日期
  setCurIndex({ commit }, index) {
    commit('setCurIndex', index);
  },

  //首页筛选游戏列表
  setNowGameTag({ commit }, js_tag) {
    commit('setNowGameTag', js_tag);
  },
  setShowAllGame({ commit }, isShow) {
    commit('setShowAllGame', isShow);
  }
};
