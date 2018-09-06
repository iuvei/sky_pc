import http from "~/api/http";
import to from "~/api/await-to";
import mcache from "memory-cache";

const resetData = {
  visible: false,
  customClass: "game-modal",
  title: "温馨提示",
  confirmText: "确定",
  showFoot: true,
  confirmType: true,
  cancelText: "取消",
  cancelType: true,
  content: "",
  component: "",
  componentData: "",
  maskClosable: true,
  delay: false,
  // onOk() {},
  beforeClose() {},
};

export const state = () => ({
  ...resetData,
});

export const getters = () => ({});
export const mutations = {
  changeModal(state, obj) {
    Object.keys(obj).map(k => (state[k] = obj[k]));
  },
};

export const actions = {
  // 获取游戏配置信息
  async getGameListAtin({ commit }) {
    let ret = await http({
      ac: "getGameListAtin",
    });
    commit("setGameList", ret);
    return ret;
  },
};
