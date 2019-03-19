import http from '~/api/http'

import to from '~/api/await-to'
import mcache from 'memory-cache'
import cookies from 'js-cookie'

function getFromCache({ commit }, key, mutationType) {
  let obj = mcache.get(key)
  if (obj) {
    obj = typeof obj === 'string' ? JSON.parse(obj) : obj
    obj.data && commit(mutationType, obj.data)
    obj = null
  }
}

export const state = () => ({
  user_flag: 'aaa',
  accountInfo: {},
  isLogin: false,
  autoToken: '',
  isServerLogin: false
})

export const getters = {
  accountInfo(state) {
    let obj = null
    if (process.browser) {
      if (process.env.static) {
        let sessionUserinfo = sessionStorage.getItem('accountInfo')
        const cookie_userinfo = cookies.get('vuex')
        // console.log('cookie_userinfo', cookie_userinfo);
        if (
          cookie_userinfo &&
          Object.keys(cookie_userinfo).length &&
          sessionUserinfo
        ) {
          const _obj = JSON.parse(cookie_userinfo).Login.userEncode
          if (_obj && Object.keys(_obj).length) {
            obj = Object.assign(JSON.parse(sessionUserinfo), _obj)
            cookies.remove('vuex')
          }
        }
      } else {
        obj = JSON.parse(sessionStorage.getItem('accountInfo'))
      }
    }
    return (
      obj || (Object.keys(state.accountInfo).length ? state.accountInfo : {})
    )
  }
}

export const mutations = {
  async setUserInfo(state, userinfo) {
    if (userinfo && userinfo.uid) {
      if (process.browser) {
        localStorage.userInfo = JSON.stringify({
          code: userinfo.code,
          uid: userinfo.uid
        })
        state.isServerLogin = false
      }
      if (process.server) {
        state.isServerLogin = true
      }
      state.accountInfo = userinfo
      state.isLogin = true
      state.logout = false
      if (process.env.static)
        sessionStorage.accountInfo = JSON.stringify(userinfo)
    }
  },
  // 强制刷新金额
  forcedPrice(state, price) {
    if (state.isLogin && state.accountInfo.uid) {
      if (!isNaN(price.price)) {
        state.accountInfo.price = price.price
      }
    }
  },
  setPrice(state, price) {
    if (state.isLogin && state.accountInfo.uid) {
      if (!isNaN(price.price)) {
        state.accountInfo.price = price.price
        state.accountInfo.real_name = price.real_name
      }
    }
  },
  logout(state) {
    if (process.browser) {
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('accountInfo')
    }
    state.accountInfo = {}
    state.isLogin = false
    state.autoToken = ''
    // this.$router.push("/");
  },
  setLogout(state) {
    state.logout = true
  },
  clearUserinfo(state) {
    if (process.browser) {
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('accountInfo')
    }
  },
  setUserflag(state, flag) {
    state.user_flag = flag.user_flag
  }
}

export const actions = {
  // 强制刷新余额
  async ForceRunPrice({ commit }, params) {
    let forced = await http({
      ac: 'ForceRunPrice',
      ...params
    })
    commit('forcedPrice', forced)
    return forced
  },

  async flushPrice({ commit }, action) {
    let params = {
      ac: 'flushPrice'
    }
    if (action) params['click'] = 1
    const price = await http(params)
    commit('setPrice', price)
    commit('setUserflag', price)
    return price
  },
  //领取红包
  async getGifs({ commit }, user) {
    let res = await http({ ac: 'UserGetEventAward' })
    return res
  },
  async register({ commit, dispatch }, userinfo) {
    const newOne = Object.assign({}, userinfo, {
      vcode: 6666,
      vid: 'b97ec930-7c7c-11e8-acae-0242ac190002'
    })
    let user = await http({ ac: 'regUser', ...newOne })
    return await dispatch('encodeLogin', user)
  },
  async login({ commit }, userinfo) {
    let user = await http({
      ac: 'userLogin',
      username: userinfo.username,
      password: userinfo.password,
      vcode: 6666,
      vid: 'b97ec930-7c7c-11e8-acae-0242ac190002'
    })
    user && (await commit('setUserInfo', user))
    return user
  },
  async logout({ commit }, user) {
    let result = await http({
      ac: 'userLogout',
      uid: user.uid,
      token: user.token,
      sessionkey: user.session_key
    })

    commit('logout')
    if (process.browser) {
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('accountInfo')
    }

    return result
  },
  async encodeLogin({ commit, dispatch }, user) {
    // console.log('encodeLogin', user)
    let userinfo = null
    if (process.browser) {
      userinfo = JSON.parse(localStorage.getItem('userInfo'))
    }

    const code = (user && user.code) || (userinfo && userinfo.code)
    const uid = (user && user.uid) || (userinfo && userinfo.uid)
    const res = await http({ ac: 'encodeLogin', code, uid })
    if (res && res.uid) {
      await commit('setUserInfo', res)
      await dispatch('flushPrice')
      return true
    } else return false
  }
}
