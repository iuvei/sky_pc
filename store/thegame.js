import http from '~/api/http'
import to from '~/api/await-to'
import mcache from 'memory-cache'

export const state = () => ({
  forceTag: '', // 当前 tg
  menuTag: '', // 例如 mg  bbin
  menuType: '', // 例如 1=电子,2=棋牌,3=捕鱼
  thegameList: [], // 平台列表
  thegameListTj: [], // 推荐游戏
  thegameListHot: [] // 热门游戏
  // thegameListDl: [], // 登录
})

export const getters = () => ({})
export const mutations = {
  UPDATE_FIELD(state, obj) {
    Object.keys(obj).map(k => (state[k] = obj[k]))
  },
  setTag(state, data) {
    state.menuTag = data
  },
  setType(state, dataType) {
    state.menuType = dataType
  },
  setGameList(state, dataPt) {
    state.thegameList = dataPt
  },
  setGameTj(state, datatj) {
    state.thegameListTj = datatj
  },
  setGameHot(state, dataHot) {
    // state.thegameListHot = dataHot.game_list
    state.thegameListHot = dataHot
  },
  setGameDl(state, dataDl) {
    state.thegameListDl = dataDl
  },
  setGameId(state, id) {
    state.gameId = id
  }
}
export const actions = {
  updateField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  // 获取首页电子游戏平台
  async GetIndexWebgame({ commit }, { type }) {
    let ret = await http({ ac: 'GetIndexWebgame', type })
    commit('setGameList', ret)
    // commit('setTag', (ret[0] && ret[0].tag) || '')
    return ret
  },
  async GetWebGameHotList({ commit, state }) {
    // 获取电子游戏的推荐游戏
    commit('setGameTj', [])
    let ret = await http({
      ac: 'GetWebGameHotList',
      tag: state.menuTag
    })
    commit('setGameTj', ret)
    return ret
  },
  async GetH5GameList({ commit, state }, params) {
    // 获取热门电子游戏的列表
    commit('setGameHot', [])
    let ret = await http({
      ac: 'GetH5GameList',
      tag: state.menuTag,
      rows: 20,
      pageid: params.pageid,
      type: state.menuType
    })
    commit('setGameHot', ret)
    return ret
  },
  async GetWebGameUrl({ commit, state }, params) {
    // 获取电子游戏登录
    const tag = params.tag || state.menuTag
    commit('UPDATE_FIELD', { forceTag: tag })
    return await to(
      http({
        ac: 'GetWebGameUrl',
        tag,
        gameid: params.gameId
      })
    )
  }
}
