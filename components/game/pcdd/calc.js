function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item));
}
class calcPcdd {
  constructor() {
    tag_js = "pcdd";
  }
  calcBetNum(playid, ba) {
    switch (playid) {
      // 特码
      case 1:
      //   return this.calc_tema(ba);
      //   break;
      // //混合
      case 3:
        return this.calc_tema(ba);
        break;
      // 特码包三
      case 2:
        return calc_temab3(ba);
        break;
    }
  }
  // 特码 混合
  calc_tema(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /[0-9]/)) {
      return 0;
    } else {
      return ba.length;
    }
  }
  // 特码包三
  calc_temab3(ba) {
    return Array.isArray(ba) ? (ba.length > 2 ? 1 : 0) : 0;
  }

  calc_hh(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_bs(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-2])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_bz(ba) {
    if (parseInt(ba[0]) === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  calc_dwd(ba) {
    if (ba.length < 2) {
      return 0;
    } else {
      let zhushu = 0;
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res = ba[i].split("|");
        if (checkArrIs(res, /^([0-9])$/)) {
          zhushu += res.length;
        }
      }
      return zhushu;
    }
  }

  calc_dw_dxds(ba) {
    if (ba.length < 2) {
      return 0;
    } else {
      let zhushu = 0;
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res = ba[i].split("|");
        if (checkArrIs(res, /^([0-3])$/)) {
          zhushu += res.length;
        }
      }
      return zhushu;
    }
  }

  calc_tmdxds(ba) {
    if (ba.length < 1) {
      return 0;
    } else {
      return ba.length;
    }
  }
}

export default new calcPcdd();
