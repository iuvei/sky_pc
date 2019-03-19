import http from '~/api/http';
export const store = () => ({
  rechargeView: '',
  payTips: {} // 扫码支付提示语
});
export const mutations = {
  setRechargeView(state, tips) {
    state.rechargeView = tips;
  },
  setTips(state, tips) {
    state.payTips = tips;
  }
};
// 获取可用充值途径
export const actions = {
  async getRechargeType() {
    return await http({
      ac: 'getPayTypeByUtype'
    });
  },
  // 获取扫码步骤提示
  async getPayTips({ commit, state }, params) {
    await http({
      ac: 'getDefaultTips',
      ...params
    }).then(res => {
      commit('setTips', res);
    });
  },
  async getPayDataByUtype({ commit }, params) {
    return await http({
      ac: 'getPayDataByUtype',
      ...params
    });
  },
  async getBankList() {
    return await http({
      ac: 'getBankCardList'
    });
  },
  async submitPayCompany({ commit }, params) {
    return await http({
      ac: 'submitPayCompany',
      ...params
    });
  },
  async submitThird({ commit }, params) {
    return await http({
      ac: 'submitPayThrid',
      ...params
    });
  },
  async payQrcode({ commit }, params) {
    return await http({
      ...params
    });
  },
  // 获取用户基本提款信息
  async getCashState({ commit }, ...params) {
    return await http({
      ac: 'getTkPriceWhere',
      ...params
    });
  },
  // 提交在线提款请求
  async getTkPrice({ commit }, params) {
    return await http({
      ac: 'getTkPrice',
      ...params
    });
  }
};
