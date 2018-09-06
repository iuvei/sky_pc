import http from "~/api/http";
import to from "~/api/await-to";

export const state = () => ({
  gameList: [],
  gametxt: {
    ssc: "时时彩",
    pk10: "PK拾",
    k3: "快三",
    "11x5": "11选5",
    "3d": "3D",
    lhc: "六合彩",
    pcdd: "PC蛋蛋",
    sport_key: "体彩"
  }
});

export const mutations = {
  setGameList(state, data) {
    state.gameList = data;
  }
};

export const actions = { setGameList({ commit }, item) {
           commit("setGameList", item);
         }, async getGameListAtin({ commit }) {
           // 获取游戏配置信息
           let ret = await http({ ac: "getGameListAtin" });
           commit("setGameList", ret);
           return ret;
         }, async getGamePlayConfig({ commit }, params) {
           return await http({ ac: "getGamePlayConfig", ...params });
           jstag: "", commit("setGameList", ret);
           return ret;
         } };
