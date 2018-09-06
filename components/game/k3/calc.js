class calcK3 {
  constructor() {
    this.tag_js = "k3";
  }
  calcBetNum(playid, ba) {
    switch (playid) {
      // 和值
      case 1:
      // 双面
      case 14:
        return this.calc_sum(ba);
        break;
      // 2同号
      case 7:
        return this.calc_2thfx(ba);
        break;
      //3不同号
      case 5:
        return this.calc_3bthdt(ba);
      // 2不同号
      case 10:
        return this.calc_2bthdt(ba);
        break;
      //	三同号
      case 15:
        return this.calc_3thtx(ba);
        break;
    }
  }

  // 用于安徽快三注数计算的JS文件
  checkArrIs(arr, regx) {
    return arr.every(item => regx.test(item));
  }
  // 和值 1
  calc_sum(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    }
    return ba.length;
  }
  // 三不同号 胆拖 5
  calc_3bthdt(ba) {
    if (ba.length < 2 || ba[1] === "") {
      return 0;
    }
    const danma = ba[0].split("|"); // 胆码
    const tuoma = ba[1].split("|"); // 拖码
    if (!this.checkArrIs(danma, /[1-6]/) || !this.checkArrIs(tuoma, /[1-6]/)) {
      return 0;
    }
    if (danma.length === 2) {
      return tuoma.length;
    } else if (danma.length === 1) {
      const n = tuoma.length;
      return n * ((n - 1) / 2);
    }
    return 0;
  }
  // 三同号 通选
  calc_3thtx(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    }
    return ba.length;
  }
  // 三同号 复选
  calc_3thdx(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    }
    return ba.length;
  }

  // 三不同号 标准
  calc_3bthbz(ba) {
    const len = ba.length;
    if (len < 3) {
      return 0;
    }
    switch (len) {
      case 3:
        return 1;
      case 4:
        return 4;
      case 5:
        return 10;
      case 6:
        return 20;
    }
  }

  // 三连号 通选
  calc_3lhtx(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    }
    return ba.length;
  }

  // 二同号 复选
  calc_2thfx(ba) {
    if (!this.checkArrIs(ba, /[1-6]/)) {
      return 0;
    }
    return ba.length;
  }

  // 二同号 单选
  calc_2thdx(ba) {
    if (ba.length < 2) {
      return 0;
    }

    const tonghao = ba[0].split("|");
    if (!this.checkArrIs(tonghao, /[1-6][1-6]/)) {
      return 0;
    }

    const th_length = tonghao.length;
    const btonghao = ba[1].split("|");
    if (!checkArrIs(btonghao, /[1-6]/)) {
      return 0;
    }
    const bth_length = btonghao.length;
    return th_length * bth_length;
  }

  // 二不同号 标准
  calc_2bthbz(ba) {
    if (!this.checkArrIs(ba, /[1-6]/)) {
      return 0;
    }
    const len = ba.length;
    if (len < 2) {
      return 0;
    }
    return len * ((len - 1) / 2);
  }

  // 二不同号 胆拖
  calc_2bthdt(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split("|");
    if (!this.checkArrIs(ba0, /^[1-6]$/)) {
      return 0;
    }
    const ba1 = ba[1].split("|");
    if (!this.checkArrIs(ba1, /^[1-6]$/)) {
      return 0;
    }
    return ba1.length;
  }

  // 任选一
  calc_rx1m(ba) {
    if (ba.length < 1) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 总大小单双
  calc_hz_dxds(ba) {
    if (ba.length < 1 || ba[0] === "") {
      return 0;
    } else {
      return ba.length;
    }
  }
  //
  calc_dwdxds(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      if (ba[i] !== "?") {
        const res = ba[i].split(/[\|\/]/);
        if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
          zhushu += res.length;
        }
      }
    }
    return zhushu;
  }
}

export default new calcK3();
