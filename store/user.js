import http from '~/api/http'
import to from '~/api/await-to'

export const state = () => ({
  bettingTag: '', // 例如 mg  jjqp
  bettingType: '' // 例如 0 =彩票 1=电子 2=棋牌 3= 捕鱼
})

export const mutations = {}

export const actions = {
  //获取个人消息
  async getUserMessage() {
    let ret = await http({
      ac: 'getUserMessage',
      type: 0
    })
    return ret
  },
  //图片进行base64转译
  async UploadUserHeadIconByBase64({ commit }, params) {
    let ret = await http({
      ac: 'UploadUserHeadIconByBase64',
      ...params
    })
    return ret
  },
  //修改用户头像
  async updateUserIconInfo({ dispatch, commit }, params) {
    let ret = await http({
      ac: 'updateUserInfo',
      ...params
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //等级头衔
  async GetUserEventRiseInfo() {
    let ret = await http({
      ac: 'GetUserEventRiseInfo'
    })
    return ret
  },
  //获取彩种投注记录
  async getRecorddata({ commit }, params) {
    const rep = await http({
      ac: 'getUserTouzhuLog',
      gameid: params.gameid,
      type: params.type,
      pageid: params.pageid,
      lasttime: params.lasttime
    })
    return rep
  },
  //获取电子游戏投注记录
  async getGmRecord({ commit, state }, params) {
    const rep = await http({
      ac: 'GetWebUserTouzhuLog',
      pageid: params.pageid,
      lasttime: params.lasttime,
      tag: params.tag || '',
      lasttime: params.lasttime,
      count: params.count,
      type: params.type
    })
    return rep
  },
  //获取彩种玩法列表
  async getGameData() {
    const rep = await http({
      ac: 'getGameListAtin',
      types: 0
    })
    return rep
  },
  //获取游戏玩法列表 比如 mg&棋牌
  async getGetEleMenuList() {
    const rep = await http({
      ac: 'GetEleMenuList'
    })
    return rep
  },
  //获取验证码
  async getVerifyImage() {
    let ret = await http({
      ac: 'getVerifyImage'
    })
    return ret
  },
  //获取购彩图片
  async getMobileBanner() {
    let ret = await http({
      ac: 'getMobileBanner'
    })
    return ret
  },
  //获取个人消息
  async getUserMessage({ commit }, params) {
    let ret = await http({
      ac: 'getUserMessage',
      type: 0,
      ...params
    })
    return ret
  },
  //设置个人消息状态
  async readUserMessage({ commit }, params) {
    let ret = await http({
      ac: 'readUserMessage',
      id: params.guid
    })
    return ret
  },
  //删除个人消息
  async delUserMessage({ commit }, ids) {
    let ret = await http({
      ac: 'delUserMessage',
      id: ids
    })
    return ret
  },
  //等级头衔
  async GetUserEventRiseInfo() {
    let ret = await http({
      ac: 'GetUserEventRiseInfo'
    })
    return ret
  },
  //晋级活动规则json接口
  async GetRiseViewInfo() {
    let ret = await http({
      ac: 'GetRiseViewInfoNew2'
    })
    return ret
  },
  //晋级活动积分明细
  async GetUserExpTradLog() {
    let ret = await http({
      ac: 'GetUserExpTradLog'
    })
    return ret
  },
  //已经领取奖励列表
  async GetRiseRewardLog({ dispatch, commit }, params) {
    let ret = await http({
      ac: 'GetRiseRewardLog',
      ...params
    })
    return ret
  },
  //修改用户基本信息
  async updateUserInfo({ dispatch, commit }, params) {
    let ret = await http({
      ac: 'updateUserInfo',
      vcode: 6666,
      vid: 'b97ec930-7c7c-11e8-acae-0242ac190002',
      ...params
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //修改登录密码
  async setLoginPassVerify({ commit }, password) {
    let ret = await http({
      ac: 'setLoginPassVerify',
      oldpass: password.oldpass,
      newpass: password.newpass
    })
    return ret
  },
  //修改交易密码
  async setTradPassVerify({ commit }, password) {
    let ret = await http({
      ac: 'setTradPassVerify',
      ...password
    })
    return ret
  },
  //设置密保问题
  async addUserHint({ dispatch, commit }, addUserHint) {
    let ret = await http({
      ac: 'addUserHint',
      hint_1: addUserHint.hint_1,
      hint_2: addUserHint.hint_2,
      hint_3: addUserHint.hint_3,
      answer_1: addUserHint.answer_1,
      answer_2: addUserHint.answer_2,
      answer_3: addUserHint.answer_3
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //设置新的密保问题
  async FPchangeUserHint({ dispatch, commit }, FPchangeUserHint) {
    let ret = await http({
      ac: 'FPchangeUserHint',
      hint_1: FPchangeUserHint.hint_1,
      hint_2: FPchangeUserHint.hint_2,
      hint_3: FPchangeUserHint.hint_3,
      answer_1: FPchangeUserHint.answer_1,
      answer_2: FPchangeUserHint.answer_2,
      answer_3: FPchangeUserHint.answer_3,
      accessCode: FPchangeUserHint.accessCode
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //校验密保问题
  async FPcheckQuestion({ commit }, FPcheckQuestion) {
    let ret = await http({
      ac: 'FPcheckQuestion',
      question_1: FPcheckQuestion.question_1,
      question_2: FPcheckQuestion.question_2,
      question_3: FPcheckQuestion.question_3,
      answer_1: FPcheckQuestion.answer_1,
      answer_2: FPcheckQuestion.answer_2,
      answer_3: FPcheckQuestion.answer_3,
      username: FPcheckQuestion.username
    })
    return ret
  },
  //获取银行卡列表
  async getUserBankCard() {
    let ret = await http({
      ac: 'getUserBankCard'
    })
    return ret
  },
  //获取支持银行卡列表
  async getBankCardList() {
    let ret = await http({
      ac: 'getBankCardList'
    })
    return ret
  },
  //获取添加银行卡
  async addUserBankCard({ dispatch, commit }, bankCardInfo) {
    let ret = await http({
      ac: 'addUserBankCard',
      tk_pass: bankCardInfo.tk_pass,
      type: bankCardInfo.type,
      card_num: bankCardInfo.card_num,
      card_sheng: bankCardInfo.card_sheng,
      address: bankCardInfo.address,
      more_bank: bankCardInfo.more_bank,
      realname: bankCardInfo.realname
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //修改银行卡
  async updateUserBankCard({ dispatch, commit }, bankCardInfo) {
    let ret = await http({
      ac: 'updateUserBankCard',
      tk_pass: bankCardInfo.tk_pass,
      type: bankCardInfo.type,
      card_num: bankCardInfo.card_num,
      card_sheng: bankCardInfo.card_sheng,
      address: bankCardInfo.address,
      more_bank: bankCardInfo.more_bank,
      id: bankCardInfo.id
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //解绑银行卡
  async delUserBankCard({ dispatch, commit }, bankCardInfo) {
    let ret = await http({
      ac: 'delUserBankCard',
      tk_pass: bankCardInfo.tk_pass,
      id: bankCardInfo.id
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //设置默认银行卡
  async setUserBankDefault({ dispatch, commit }, id) {
    let ret = await http({
      ac: 'setUserBankDefault',
      id: id
    })
    await dispatch('userinfo/encodeLogin', {}, { root: true })
    return ret
  },
  //获取公告信息
  async getSystemNotice() {
    let ret = await http({
      ac: 'getSystemNotice'
    })
    return ret
  },
  //获取交易记录
  async GetUserTradLog({ commit }, params) {
    let ret = await http({
      ac: 'GetUserTradLog',
      ...params
    })
    return ret
  },
  //获取充值记录
  async getUserCzLog({ commit }, params) {
    let ret = await http({
      ac: 'getUserCzLog',
      ...params
    })
    return ret
  },
  //获取提款记录
  async getUserTKLog({ commit }, params) {
    let ret = await http({
      ac: 'getUserTKLog',
      ...params
    })
    return ret
  },
  //查询用户返水
  async getUserRebate() {
    let ret = await http({
      ac: 'GetUserRebate'
    })
    return ret
  },
  //领取返水金额
  async getRebatePrice() {
    let ret = await http({
      ac: 'GetRebatePrice'
    })
    return ret
  },
  //获取今日盈亏
  async GetProfitAndLoss({ commit }, params) {
    let ret = await http({
      ac: 'GetProfitAndLoss',
      // lasttime: '',
      ...params
    })
    return ret
  }
}
