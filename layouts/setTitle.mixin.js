// import clientCache from '../plugins/clientCache';

import { mapState, mapGetters } from 'vuex';
export default {
  head() {
    return {
      title: this.getDocTitle()
    };
  },
  computed: {
    // ...mpaState({
    //   isLogin: state => state.userinfo.isLogin
    // }),
    sysinfo() {
      return this.$store.getters['sysinfo/sysInfo'];
    },
    accountInfo() {
      return this.$store.getters['userinfo/accountInfo'];
    }
  },
  methods: {
    getDocTitle() {
      const _title =
        this.sysinfo.web_title ||
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('web_title')) ||
        ' ';
      return _title;
    }
  },
  async created() {
    //判断是否是低版本浏览器
    if (process.browser) {
      // alert(window.navigator.userAgent)
      // console.log(window.navigator.userAgent);
      this.$nextTick(() => {
        if (typeof outdatedBrowser === 'function') {
          outdatedBrowser();
        }
      });

      const title = window.localStorage.getItem('web_title');
      if (!title) {
        window.localStorage.setItem('web_title', this.getDocTitle());
      }

      if (!process.env.static) {
        // 如果没有加载到sysinfo，则从客户端重新加载
        const sysinfo = this.sysinfo;
        const hasKeys = Object.keys(sysinfo).length > 0;
        if (!hasKeys) {
          //先从缓存获取
          const key = 'getSysinfo';
          const storeSysinfo = JSON.parse(sessionStorage.getItem(key));

          if (
            !storeSysinfo ||
            (storeSysinfo && storeSysinfo.expried > new Date().getTime())
          ) {
            const _sysinfo = await this.$store.dispatch(
              'sysinfo/getSysinfo',
              window.location.host
            );
            if (_sysinfo) {
              sessionStorage.setItem(
                key,
                JSON.stringify({
                  expried: new Date().getTime() + 1000 * 60 * 5,
                  data: _sysinfo
                })
              );
            }
            // cache.setItem(key, _sysinfo);
          } else {
            const _sysinfo = JSON.parse(sessionStorage.getItem(key));
            if (_sysinfo)
              this.$store.commit('sysinfo/setSysInfo', _sysinfo.data);
          }
        }
      }
      if (process.env.static) {
        await this.$store.dispatch('sysinfo/getSysinfo', window.location.host);
        await this.$store.dispatch('game/getGameListAtin');

        // 这是体彩用的
        const ticai_userinfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!this.$store.state.userinfo.isLogin) {
          if (this.accountInfo && Object.keys(this.accountInfo).length) {
            // console.warn('这是体彩用的setUserInfo');
            await this.$store.commit('userinfo/setUserInfo', this.accountInfo);
          } else {
            // console.warn('自己用的setUserInfo');
            // 这是自己用的
            await this.$store.commit(
              'userinfo/setUserInfo',
              JSON.parse(sessionStorage.getItem('accountInfo'))
            );
          }
        }
      }
    }
  }
};
