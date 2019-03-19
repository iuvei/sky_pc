import http from '~/api/http'
import decompress from '~/plugins/decompress'
// import to from "~/api/await-to";

export const state = () => ({
  isAgent: false, // 是否提交过代理申请
  agentIntro: '', // 代理说明
  // 下级开户
  lowerLevelAccount: {
    view: 'rebateSetting', // 默认返点设置
    selectedAccountType: 1, // 1代理   0会员
    selectedDomain: 0, // 选中的域名id
    domainList: [], // 使用域名
    domainType: 0 // 0自身域名  1下级域名
  },
  // 现金交易
  cashTransaction: {
    view: 'cashTransaction', // addBank cashTransaction confirmation success
    other: '', // 转账账号名
    otherInfo: {}, // 转账账号信息
    tradeInfo: {} // 现金交易信息
  }
})

export const getters = {
  rateSetting(state, getters, rootState) {
    let {
      fp_ssc,
      fp_k3,
      fp_11x5,
      fp_3d,
      fp_pk10,
      fp_pcdd,
      fp_lhc,
      fp_other
    } = rootState.userinfo.accountInfo
    fp_ssc = (fp_ssc && fp_ssc * 1) || 0
    fp_k3 = (fp_k3 && fp_k3 * 1) || 0
    fp_11x5 = (fp_11x5 && fp_11x5 * 1) || 0
    fp_3d = (fp_3d && fp_3d * 1) || 0
    fp_pk10 = (fp_pk10 && fp_pk10 * 1) || 0
    fp_pcdd = (fp_pcdd && fp_pcdd * 1) || 0
    fp_lhc = (fp_lhc && fp_lhc * 1) || 0
    fp_other = (fp_other && fp_other * 1) || 0
    return {
      fp_ssc,
      fp_k3,
      fp_11x5,
      fp_3d,
      fp_pk10,
      fp_pcdd,
      fp_lhc,
      fp_other,
      vssc: fp_ssc,
      vk3: fp_k3,
      v11x5: fp_11x5,
      v3d: fp_3d,
      vpk10: fp_pk10,
      vpcdd: fp_pcdd,
      vlhc: fp_lhc,
      vother: fp_other
    }
  },
  getLowerLevelView(state, getters, rootState) {
    let accountInfo = rootState.userinfo.accountInfo
    let agent_mode = accountInfo && accountInfo.agent_mode * 1
    let view = state.lowerLevelAccount.view
    if ((agent_mode && view === 'rebateSetting') || view === 'domainManage')
      view = 'rebatePicture'
    else if (!agent_mode && view === 'rebatePicture') view = 'rebateSetting'
    return view
  },
  getCashView(state, getters, rootState) {
    let accountInfo = rootState.userinfo.accountInfo
    let bank_typename = accountInfo && accountInfo.bank_typename
    let view = state.cashTransaction.view
    if (!bank_typename) view = 'addBank'
    return view
  }
}

export const mutations = {
  // 一级字段data={key:value}，二级字段data={prefix,params:{key:value}}
  MODIFY_FIELD(state, data) {
    // console.log(data);
    let { prefix, params } = data
    params = params || data
    Object.keys(params).map(k => {
      if (prefix) state[prefix][k] = params[k]
      else state[k] = params[k]
    })
  },
  modify(state, data) {
    // console.log(data);
    state.lowerLevelAccount.view = 'rebatePicture'
    // console.log(state.lowerLevelAccount.view);
  }
}

export const actions = {
  modifyDefault({ commit }, item) {
    commit('modify', item)
  },
  modifyField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  async createJoinCode({ commit, state }, params) {
    // 创建邀请码
    return await http({
      ac: 'createJoinCode',
      actype: state.lowerLevelAccount.selectedAccountType,
      // eid: state.lowerLevelAccount.selectedDomain,
      ...params
    })
  },
  async getUserJoinCodeList({ commit, state }, params) {
    // 获取用户邀请码的列表
    return await http({
      ac: 'getUserJoinCodeList',
      actype: params.actype || state.lowerLevelAccount.selectedAccountType,
      ...params
    })
  },
  async getUsefulEnomList() {
    // 获取可用域名列表
    return await http({ ac: 'getUsefulEnomList' })
  },
  async getUserEnomList({ commit, state }, params) {
    // 获取域名列表
    return await http({
      ac: 'getUserEnomList',
      actype: state.lowerLevelAccount.domainType,
      ...params
    })
  },
  async setTuiguangRemark({ commit }, params) {
    // 设置邀请码备注
    let { remark, id } = params
    return await http({ ac: 'setTuiguangRemark', remark, id })
  },
  async getEnomLIplist() {
    // 获取代理DNS列表
    return await http({ ac: 'getEnomLIplist' })
  },
  async addNewUserEnom({}, params) {
    // 添加自己的域名进行推广
    return await http({ ac: 'addNewUserEnom', ...params })
  },
  async getChlidStatic({ commit, rootState }, params) {
    // 下级管理 下级报表
    // user_id: rootState.userinfo.accountInfo.uid
    return await http({ ac: 'getChlidStatic', ...params })
  },
  async getDailiStaticData({ commit, rootState }, params) {
    // 代理通过此接口来查看自身和自身所有下级(包括直接下级和间接下级)在指定时间区间内的数据情况。
    return await http({ ac: 'getDailiStaticData', ...params })
  },
  async verifyEnmo({}, params) {
    // 总代和股东可以通过此接口对下级代理提交的域名进行审核。
    return await http({ ac: 'verifyEnmo', ...params })
  },
  async isDailiVerify({ dispatch, rootState }) {
    // 用于用户查看当前申请代理是否还在审核中
    // 游客身份不查询
    if (rootState.userinfo.accountInfo.test === 2) return
    if (rootState.userinfo.accountInfo.level === 0) {
      let isAgent =
        (await http({
          ac: 'isDailiVerify'
        })) || false
      dispatch('modifyField', { isAgent })
    }
  },
  async ApplyDaili({ dispatch }) {
    // 用户提交代理申请
    let data = await http({ ac: 'ApplyDaili' })
    dispatch('isDailiVerify')
  },
  async getChildTradLog({ commit, rootState }, params) {
    // 交易明细
    return await http({ ac: 'getChildTradLog', ...params })
  },
  // 代理通过此接口获取自身的所有下级或者间接下级的所有投注记录，可以筛选指定彩种，固定一次返回40条。
  async getDailiTouzhuLog({}, params) {
    return await http({ ac: 'getDailiTouzhuLog', ...params })
  },
  // 现金交易检验权限和获取对方部分账号信息
  async TradGetUserInfo({}, params) {
    let ret = await http({ ac: 'TradGetUserInfo', ...params })
    return ret
  },
  // 现金交易接口
  async sendMoneyToChild({}, params) {
    let ret = await http({ ac: 'sendMoneyToChild', ...params })
    return ret
  },
  // 获取代理说明
  async getAgentInfo({ commit }, params) {
    let res = (await http({ ac: 'getSpecialContent', ...params })) || {}
    let { content: detail } = res
    let decodedStr = ''
    if (detail) {
      if (detail.slice(0, 2) === 'GZ') {
        decodedStr = decompress(detail)
      } else {
        decodedStr = window.$nuxt.decode(detail)
      }
      let newDiv = window.document.createElement('div')
      // const c = decodeURIComponent(escape(unescape(decodedStr)))
      newDiv.innerHTML = decodedStr
      detail = newDiv.innerText || newDiv.textContent
      newDiv = null
    }
    // console.error(decodedStr, '------', detail)

    commit('MODIFY_FIELD', { agentIntro: detail })
  }
}
