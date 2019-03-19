import http from '~/api/http';
import to from '~/api/await-to';

export const state = () => ({});

export const mutations = {};

export const actions = {
  //获取个人消息
  async getUserMessage() {
    let ret = await http({
      ac: 'getUserMessage',
      type: 0
    });
    return ret;
  },
  //修改用户基本信息
  async updateUserInfo({ commit, request = {} }) {
    request = Object.assign(getSportMobileGameList(), request);
    let ret = await http({
      ac: 'updateUserInfo',
      type: 0
    });
    return ret;
  },
  //等级头衔
  async GetUserEventRiseInfo() {
    let ret = await http({
      ac: 'GetUserEventRiseInfo'
    });
    return ret;
  },
  //获取投注记录
  async getRecorddata({ commit }, params) {
    const rep = await http({
      ac: 'getUserTouzhuLog',
      gameid: params.gameid,
      type: params.type,
      pageid: params.pageid,
      lasttime: params.lasttime
    });
    return rep;
  },
  //获取验证码
  async getVerifyImage() {
    let ret = await http({
      ac: 'getVerifyImage'
    });
    return ret;
  },
  //获取个人消息
  async getUserMessage() {
    let ret = await http({
      ac: 'getUserMessage',
      type: 0
    });
    return ret;
  },
  //修改用户基本信息
  async updateUserInfo({ commit }, userInfo) {
    let params = {};
    if (userInfo.type === 3) {
      params = {
        oldphone: userInfo.old_phone,
        phone: userInfo.new_phone
      };
    } else {
      params = {
        oldemail: userInfo.old_email,
        email: userInfo.new_email
      };
    }
    let ret = await http({
      ac: 'updateUserInfo',
      type: userInfo.type,
      ...params
    });
    return ret;
  }
  //获取手机购彩背景图片
  // async getQrcode(){
  //     let res = await http({
  //         ac:''
  //     })
  // }
  //获取手机二维码
};
