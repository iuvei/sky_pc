const checkArrIs = (arr, regx) => {
  return arr.every(item => regx.test(item));
};
class ClacPk10 {
  constructor() {
    this.tag_js = "pk10";
  }
  calcBetNum(playid, arr) {
    // console.log("pk10calc", playid, arr);
    switch (playid) {
      // 直选复式	前一直选
      case 1:
        return this.calc_q1_zxfs(arr);
      // 直选复式	前二直选复式
      case 2:
        return this.calc_q2_zxfs(arr);
      // 直选单式	前二直选单式
      case 3:
        return this.calc_q2_zxds(arr);
      //直选复式	前三直选
      case 4:
        return this.calc_q3_zxfs(arr);
      // 直选单式	前三直选单式
      case 5:
        return this.calc_q3_zxds(arr);
      //	定位胆	定位胆 数字盘	数字盘
      case 6:
      case 15:
        return this.calc_dwd(arr);
      //冠亚和	冠亚和
      case 7:
        return this.calc_gyh(arr);
      //双面盘	双面盘
      case 14:
        return this.calc_smp(arr);
    }
  }
  // 前一 直选复式
  calc_q1_zxfs(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    } else {
      return ba.length;
    }
  }
  // 前二 直选复式
  calc_q2_zxfs(ba) {
    if (ba.length < 2) {
      return 0;
    }
    let zhushu = 0;
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !checkArrIs(balls1, /[0-1][0-9]/) ||
      !checkArrIs(balls2, /[0-1][0-9]/)
    ) {
      return 0;
    }

    for (let i = 0; i < balls1.length; i++) {
      for (let j = 0; j < balls2.length; j++) {
        if (balls1[i] !== balls2[j]) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }
  // 前二  直选单式 ~~~~~暂时没有
  calc_q2_zxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (
        res.length === 2 &&
        res[0] !== res[1] &&
        checkArrIs(res, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
      ) {
        zhushu++;
      }
    }
    return zhushu;
    // if (ba.length < 1 || ba[0] === "") {
    //   return 0;
    // }

    // let zhushu = 0;
    // for (let i = 0; i < ba.length; i++) {
    //   const balls = ba[i].split(/[\|\/]/);
    //   if (
    //     balls.length === 2 &&
    //     checkArrIs(balls, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/) &&
    //     balls[0] !== balls[1]
    //   ) {
    //     zhushu++;
    //   }
    // }
    // return zhushu;
  }

  // 前三 直选复式
  calc_q3_zxfs(ba) {
    if (ba.length < 3) {
      return 0;
    }
    let zhushu = 0;
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    const balls3 = ba[2].split("|");
    if (
      !checkArrIs(balls1, /[0-1][0-9]/) ||
      !checkArrIs(balls2, /[0-1][0-9]/) ||
      !checkArrIs(balls3, /[0-1][0-9]/)
    ) {
      return 0;
    }
    for (let i = 0; i < balls1.length; i++) {
      for (let j = 0; j < balls2.length; j++) {
        for (let n = 0; n < balls3.length; n++) {
          if (
            balls1[i] !== balls2[j] &&
            balls3[n] !== balls1[i] &&
            balls2[j] !== balls3[n]
          ) {
            zhushu++;
          }
        }
      }
    }
    return zhushu;
  }
  isRepeat(arr) {
    let data = arr.sort(),
      b = true;
    data.forEach((val, key) => {
      if (val === data[key + 1]) {
        b = false;
      }
    });
    return b;
  }
  // 前三 直选单式
  calc_q3_zxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (
        res.length === 3 &&
        this.isRepeat(res) &&
        checkArrIs(res, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
      ) {
        zhushu++;
      }
    }
    return zhushu;
    // if (ba.length < 1 || ba[0] === "") {
    //   return 0;
    // }
    // let zhushu = 0;
    // for (let i = 0; i < ba.length; i++) {
    //   const balls = ba[i].split(/[\|\/]/);
    //   for (let k = 0; k < balls.length; k++) {
    //     if (balls[k] === "") {
    //       return 0;
    //     }
    //   }
    //   if (
    //     balls.length === 3 &&
    //     checkArrIs(balls, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
    //   ) {
    //     if (
    //       balls[0] !== balls[1] &&
    //       balls[1] !== balls[2] &&
    //       balls[0] !== balls[2]
    //     ) {
    //       zhushu++;
    //     }
    //   }
    // }
    // return zhushu;
  }
  // 定位胆
  calc_dwd(ba) {
    if (ba.length < 2) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const subballs = ba[i].split("|");
      for (const k in subballs) {
        if (
          subballs !== "" &&
          parseInt(subballs[k]) > 0 &&
          parseInt(subballs[k]) <= 10
        ) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  /* 自定义玩法 */
  // 前二和值
  calc_q2_hz(ba) {
    if (ba.length < 1) {
      return 0;
    }
    return ba.length;
  }
  // 前三和值
  calc_q3_hz(ba) {
    if (ba.length < 1) {
      return 0;
    }
    return ba.length;
  }
  // 前四和值
  calc_q4_hz(ba) {
    if (ba.length < 1) {
      return 0;
    }
    return ba.length;
  }

  // 定位大小单双
  calc_all_dxds(ba) {
    if (ba.length < 2 || ba[1] === "") {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i += 1) {
      const res = ba[i].split("|");
      zhushu += res.length;
    }
    return zhushu;
  }

  // 前三总大小单双
  calc_q3_dxds(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 前三特选
  calc_q3_qtx(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 龙虎斗
  calc_whjx(ba) {
    if (ba.length < 0 || ba[0] === "") {
      return 0;
    } else {
      return ba.length;
    }
  }
  /* END 自定玩法 */

  // 双面盘
  calc_smp(ba) {
    if (ba.length < 2) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const subballs = ba[i].split("|");
      for (const k in subballs) {
        if (
          subballs !== "" &&
          parseInt(subballs[k]) >= 0 &&
          parseInt(subballs[k]) <= 5
        ) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 冠亚和
  calc_gyh(ba) {
    return ba.length;
  }

  // 牛牛
  calc_nn(ba) {
    return ba.length;
  }
}

export default new ClacPk10();
