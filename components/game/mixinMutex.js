export default {
  methods: {
    mutexK3(item, idx) {
      if (item.selected) return;
      // 5三不同 10二不同
      if ([5, 10].includes(this.playObj.playid)) {
        let arr0 = this.betSelectSet[0].option;
        let arr1 = this.betSelectSet[1].option;
        let length = this.playObj.playid === 5 ? 2 : 1;
        if (idx) {
          let arr = arr1.filter(v => v.selected);
          if (arr.length === 5) arr[0].selected = false;
          arr0[item.label - 1].selected = false;
        } else {
          let arr = arr0.filter(v => v.selected);
          if (arr.length === length) arr[0].selected = false;
          arr1[item.label - 1].selected = false;
        }
      }
    },
    mutexLhc(item, idx) {
      if (item.selected) return;
      let arr0 = this.betSelectSet[0].option.filter(x => x.selected);
      if (this.isZXBZ) {
        if (arr0.length > 10) {
          arr0[0].selected = false;
        }
      }
      if (this.isLM) {
        if (arr0.length > 9) {
          arr0[0].selected = false;
        }
      }
      if (this.isHX) {
        if (arr0.length > 10) {
          arr0[0].selected = false;
        }
      }
      if (this.playObj.playid >= 22 && this.playObj.playid <= 29) {
        if (arr0.length > 5) {
          arr0[0].selected = false;
        }
      }
    },
    /**
     * 处理多个0的情况,只需要一个0
     *
     * @param {string} num
     * @returns processed string
     */
    processZero(num) {
      let _peilv = num;
      if (/.000/.test(num)) {
        _peilv = num.substring(0, num.length - 2);
      } else if (/.00/.test(num)) {
        _peilv = num.substring(0, num.length - 1);
      } else if (/.[0-9][1-9]0/.test(num)) {
        _peilv = num.substring(0, num.length - 1);
      } else if (/.[1-9]00/.test(num)) {
        _peilv = num.substring(0, num.length - 2);
      }

      return _peilv;
    },
    getDwdArr(arr) {
      //所有的定位胆都需要单独计算一个位置参数
      //只要当前行有值，就取当前行的2次方数，和即为位置数组
      let c = 0;
      arr.forEach((x, i) => {
        if (x.length) {
          c += Math.pow(2, i);
        }
      });
      return [c.toString()].concat(arr.filter(x => x.length));
    }
  },
  watch: {
    "$store.state.userinfo.isLoign": {
      // 登录后重新获取赔率
      handle(newVal, oldVal) {
        if (oldVal === false && newVal === true) {
          this.togetPeilv && this.togetPeilv();
        }
      }
    }
  }
};
