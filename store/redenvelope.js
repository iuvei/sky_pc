import http from '~/api/http'
import to from '~/api/await-to'
import decompress from '~/plugins/decompress'
import mcache from 'memory-cache'

export const state = () => ({
  characterList: [], // 人品榜单列表
  myredPackets: {}, // 我的红包
  // membersReceive: [], // 点击领取的红包金额
  numberenvelopes: '', // 红包次数
  redeventdetails: [] // 红包活动详情
})

export const getters = () => ({})
export const mutations = {
  setcharacterList(state, dataBd) {
    state.characterList = dataBd
  },
  setMyredPackets(state, dataHb) {
    state.myredPackets = dataHb
  },
  setNumberEnvelopes(state, dataCs) {
    state.numberenvelopes = dataCs
  },
  setRobEventGiftIndex(state, dataHd) {
    state.redeventdetails = dataHd
  }
}
export const actions = {
  // 获取人品榜单列表
  async RobGiftUserRankingList({ commit }) {
    let ret = await http({ ac: 'RobGiftUserRankingList' })
    commit('setcharacterList', ret)
    return ret
  },
  // 获取我的红包列表
  async getMyGiftList({ commit, state, rootState }, params = {}) {
    if (!rootState.userinfo.isLogin) return
    let ret =
      (await http({
        ac: 'getMyGiftList',
        pageid: params.pageid || 0,
        count: 20
      })) || {}
    if (params.pageid) {
      ret.list = [...state.myredPackets.list, ...ret.list]
    }
    commit('setMyredPackets', ret)
    return ret
  },
  // 获取红包次数
  async RobGiftRemainNumber({ commit, state, rootState }) {
    if (!rootState.userinfo.isLogin) return
    let ret =
      (await http({
        ac: 'RobGiftRemainNumber'
      })) || ''
    commit('setNumberEnvelopes', ret)
    return ret
  },
  // 获取立即抢红包
  async RobGiftReward({ commit, state, rootState }, params) {
    if (!rootState.userinfo.isLogin) return
    let res = await to(
      http({
        ac: 'RobGiftReward'
      }) || {}
    )
    // if (res) {
    //   commit('setNumberEnvelopes', res.number)
    // }
    return res
  },
  // 获取红包活动详情
  async RobEventGiftIndex({ commit }) {
    let res =
      (await http({
        ac: 'RobEventGiftIndex'
      })) || {}
    let { detail } = res

    if (detail) {
      const decodedStr = decompress(detail)
      let newDiv = window.document.createElement('div')
      const c = decodeURIComponent(escape(unescape(decodedStr)))
      newDiv.innerHTML = c.replace(/\\u0026/g, '&')
      detail = newDiv.innerText || newDiv.textContent
      newDiv = null
    }
    res.detail = detail
    commit('setRobEventGiftIndex', res)
  }
}
