import http from '~/api/http';
import to from '~/api/await-to';

export const state = () => ({});

export const mutations = {};

export const actions = {
  //获取签到记录
  async getUserSignedLog() {
    let res = await http({
      ac: 'getUserSignedLog'
    });
    return res;
  },
  //每日签到
  async gameUserSigned() {
    let res = await http({
      ac: 'gameUserSigned'
    });
    return res;
  },
  //获取奖励记录
  async getUserAwardLog({ commit }, params) {
    let res = await http({
      ac: 'UserSignAwardLog',
      date: params
    });
    return res;
  },
  //领取奖励
  async getUserSignAward() {
    let res = await http({
      ac: 'UserSignAward'
    });
    return res;
  },
  // 获取活动列表
  async getGameEventList() {
    let res = await http({
      ac: 'getGameEventList'
    });
    return res;
  },
  // 获取活动详情
  async getEventContent(store, eid) {
    let res = await http({
      ac: 'getEventContent',
      eid: eid
    });
    return res;
  }
};
