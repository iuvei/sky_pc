import http from "~/api/http";
import to from "~/api/await-to";

const resetBetting = {
  selected: [],
  oneBetDate: {},
  betNum: 0,
};
const resetShopCartInfo = {
  betNum: 0,
  money: 0,
  auto: 1,
  stop: 1,
  multiple: 1,
  voucher: 0,
};
const tableOpt = {
  xiangqing: "详情",
  wanfan: "玩法",
  zhushu: "倍数",
  win: "注数",
  is_win: "赔率",
  status: "总金额",
  status: "操作",
};
export const state = () => ({
  // 期号
  periods: "",
  openTime: [],
  // 是否滚球
  isScrollBalls: false,
  // 当前玩法对象
  playObj: {},
  // 单一下注集合
  betting: resetBetting,
  stateOdds: false,
  // 购物车集合
  shopCart: [],
  shopCartInfo: resetShopCartInfo,
  tableOpt,
  betSetSource: {},
  lhc: {
    curPrice: "2",
    isBall: false,
  },
});

export const mutations = {
  setCurPrice(state, price) {
    if (!isNaN(price) && price.toString().length) {
      state.lhc.curPrice = price;
    }
  },
  setLhcPlay(state, isBall) {
    state.lhc.isBall = isBall;
  },
  setBetPlay(state, obj) {
    state.playObj = obj;
  },
  //
  setBetting(state, obj = resetBetting) {
    // console.log(obj);
    Object.keys(obj).map(k => (state.betting[k] = obj[k]));
  },
  // 订单详情
  setShopCartInfo(state, obj = resetShopCartInfo) {
    Object.keys(obj).map(k => (state.shopCartInfo[k] = obj[k]));
    //  金钱 注数 追期
    let money = 0,
      betNum = 0,
      auto = 1;
    if (state.shopCartInfo.stop) {
      auto = state.shopCartInfo.auto;
    }
    // state.shopCart = [...arr, ...state.shopCart];
    state.shopCart.forEach(item => {
      money = money.float("add", item.money);
      betNum += item.betNum;
    });

    state.shopCartInfo.money = money.float(
      "multiply",
      state.shopCartInfo.multiple * auto
    );
    state.shopCartInfo.betNum = betNum * auto;
  },
  // 添加购物车
  setShopCart(state, arr = []) {
    let money = 0,
      betNum = 0,
      auto = 1;
    if (state.shopCartInfo.stop) {
      auto = state.shopCartInfo.auto;
    }
    state.shopCart = [...arr, ...state.shopCart];
    state.shopCart.forEach(item => {
      money = money.float("add", item.money);
      betNum += item.betNum;
    });

    state.shopCartInfo.money = money.float(
      "multiply",
      state.shopCartInfo.multiple * auto
    );
    state.shopCartInfo.betNum = betNum * auto;
    // 重置 选择数据
    Object.keys(resetBetting).map(k => (state.betting[k] = resetBetting[k]));
  },
  // 删除购物车数据
  delShopCart(state, idx) {
    if (Number.isInteger(idx)) {
      state.shopCart.splice(idx, 1);
    } else {
      state.shopCart = [];
    }
  },
  changeField(state, obj) {
    Object.keys(obj).map(k => (state[k] = obj[k]));
  },
};

export const actions = {
  // 确定下注
  async userSubmitTouzhu({ state, rootState }, request = state.shopCart) {
    return await to(
      http({
        ac: "userSubmitTouzhu",
        gameid: rootState.game.gameId,
        qishu: state.periods.toString(),
        data: request.map(item =>
          [
            item.playId,
            item.money.float("divide", item.betNum),
            item.value,
          ].join("#")
        ),
        auto: state.shopCartInfo.auto,
        stop: state.shopCartInfo.stop,
        // multiple: state.shopCartInfo.multiple,
        multiple: Array.from({ length: state.shopCartInfo.auto })
          .map(v => state.shopCartInfo.multiple)
          .join("|"),
        ver: "v1.0.0",
      })
    );
  },
  // 一键投注
  async quickUserSubmitTouzhu({ state, rootState }, { request, multiple }) {
    return await to(
      http({
        ac: "userSubmitTouzhu",
        gameid: rootState.game.gameId,
        qishu: state.periods.toString(),
        data: request.map(item =>
          [
            item.playId,
            item.money.float("divide", item.betNum),
            item.value,
          ].join("#")
        ),
        auto: 1,
        stop: 1,
        multiple,
        ver: "v1.0.0",
      })
    );
  },
  // 普通追号下注
  async useAutoTouzhu(
    { state, rootState },
    { data, stop },
    request = state.shopCart
  ) {
    return await to(
      http({
        ac: "userSubmitTouzhu",
        gameid: rootState.game.gameId,
        qishu: state.periods.toString(),
        data: request.map(item =>
          [
            item.playId,
            item.money.float("divide", item.betNum),
            item.value,
          ].join("#")
        ),
        auto: data.length,
        stop: stop,
        // multiple: state.shopCartInfo.multiple,
        multiple: data.join("|"),
        ver: "v1.0.0",
      })
    );
  },
  // pknn投注
  async submitTouzhu({ state, rootState }, request = {}) {
    return await to(
      http({
        ac: "userSubmitTouzhu",
        gameid: 55,
        auto: 1,
        stop: 1,
        ver: "v1.0.0",
        client_type: 1,
        ...request
      })
    );
  },
  // 撤销注单
  async cancelTouzhu({ state, rootState }, request = {}) {
    return await to(
      http({
        ac: "cancelTouzhu",
        ...request,
      })
    );
  },
};
