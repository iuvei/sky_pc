class CalcSSC {
  constructor() {
    this.tag_js = "ssc";
  }
  calcBetNum(playid, arr) {
    switch (playid) {
      case 128:
      case 129:
      case 131:
        return arr.length;
      case 41:
        return arr.length - 1;
      // 双面 后三组六
      case 12:
        return this.calc_h3_z6fs(arr);
      case 1:
        return this.calc_5x_zxfs(arr);
      case 82:
        return this.calc_5x_zxzh(arr);
      case 83:
        return this.calc_5x_zx120(arr);
      case 84:
        return this.calc_5x_zx60(arr);
      case 85:
        return this.calc_5x_zx30(arr);
      case 86:
        return this.calc_5x_zx20(arr);
      case 87:
        return this.calc_5x_zx10(arr);
      case 88:
        return this.calc_5x_zx5(arr);
      case 3:
        return this.calc_4x_zxfs(arr);
      case 89:
        return this.calc_4x_zxzh(arr);
      case 90:
        return this.calc_4x_zx24(arr);
      case 91:
        return this.calc_4x_zx12(arr);
      case 92:
        return this.calc_4x_zx6(arr);
      case 93:
        return this.calc_4x_zx4(arr);
      case 94:
        return this.calc_4x_zxfs(arr);
      case 96:
        return this.calc_4x_zxzh(arr);
      case 97:
        return this.calc_4x_zx24(arr);
      case 98:
        return this.calc_4x_zx12(arr);
      case 99:
        return this.calc_4x_zx6(arr);
      case 100:
        return this.calc_4x_zx4(arr);
      case 5:
      case 19:
      case 101:
        return this.calc_h3_zxfs(arr);
      case 7:
      case 21:
      case 103:
        return this.calc_h3_zh(arr);
      case 8:
      case 22:
      case 104:
        return this.calc_h3_zxhz(arr);
      case 9:
      case 23:
      case 105:
        return this.calc_h3_zxkd(arr);
      case 10:
      case 24:
      case 106:
        return this.calc_h3_z3fs(arr);
      case 12:
      case 26:
      case 108:
        return this.calc_h3_z6fs(arr);
      case 16:
      case 30:
      case 112:
        return this.calc_h3_zuxbd(arr);
      case 17:
      case 31:
      case 113:
        return this.calc_h3_sumws(arr);
      case 18:
      case 32:
      case 114:
        return this.calc_h3_tsh(arr);
      case 33:
      case 115:
        return this.calc_q2_zxfs(arr);
      case 35:
      case 117:
        return this.calc_q2_zhxhz(arr);
      case 36:
      case 118:
        return this.calc_q2_zxkd(arr);
      case 37:
      case 119:
        return this.calc_q2_zuxfs(arr);
      case 39:
      case 121:
        return this.calc_q2_zuxhz(arr);
      case 40:
      case 122:
        return this.calc_q2_zuxbd(arr);
      case 42:
        return this.calc_bdw_31m(arr);
      case 43:
        return this.calc_bdw_32m(arr);
      case 44:
        return this.calc_bdw_31m(arr);
      case 45:
        return this.calc_bdw_32m(arr);
      case 46:
        return this.calc_bdw_31m(arr);
      case 47:
        return this.calc_bdw_32m(arr);
      case 48:
        return this.calc_bdw_31m(arr);
      case 49:
        return this.calc_bdw_32m(arr);
      case 50:
        return this.calc_bdw_31m(arr);
      case 51:
        return this.calc_bdw_32m(arr);
      case 52:
        return this.calc_bdw_33m(arr);
      case 53:
        return this.calc_q2_dxds(arr);
      case 54:
        return this.calc_h2_dxds(arr);
      case 55:
        return this.calc_q3_dxds(arr);
      case 56:
        return this.calc_h3_dxds(arr);
      // 下边的是单式
      case 2:
        return this.calc_5x_zxds(arr.split(","));
        break;
      case 4:
      case 95:
        return this.calc_4x_zxds(arr.split(","));
        break;
      case 6:
      case 20:
      case 102:
        return this.calc_h3_zxds(arr.split(","));
        break;
      case 11:
      case 25:
      case 107:
        return this.calc_h3_z3ds(arr.split(","));
        break;
      case 13:
      case 27:
      case 109:
        return this.calc_h3_z6ds(arr.split(","));
        break;
      case 34:
      case 116:
        return this.calc_q2_zxds(arr.split(","));
        break;
      case 38:
      case 120:
        return this.calc_q2_zuxds(arr.split(","));
        break;
      case 58:
        return this.calc_r2_zxds(arr.split(","));
        break;
      case 61:
        return this.calc_r2_zuxds(arr.split(","));
        break;
      case 64:
        return this.calc_r3_zxds(arr.split(","));
        break;
      case 67:
        return this.calc_r3_zu3ds(arr.split(","));
        break;
      case 69:
        return this.calc_r3_zu6ds(arr.split(","));
        break;
      case 73:
        return this.calc_r4_zxds(arr.split(","));
        break;
    }
  }
  // pos_count = 0
  checkArrIs(arr, regx) {
    return arr.every(item => regx.test(item));
  }

  contains(arr, obj) {
    return arr.includes(obj);
  }
  // 五星直选复式
  calc_5x_zxfs(ba) {
    if (ba.length !== 5) {
      return 0;
    }
    const num = [];
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split("|");
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        num[i] = res.length;
      } else {
        return 0;
      }
    }
    return num[0] * num[1] * num[2] * num[3] * num[4];
  }

  // 五星直选单式
  calc_5x_zxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 5) {
        zhushu++;
      }
    }
    return zhushu;
  }

  /* start at 2017-07-10 am */
  // 五星直选组合
  calc_5x_zxzh(ba) {
    if (ba.length !== 5) {
      return 0;
    }
    const zhushu = 5;
    const temp_arr = [];
    for (let i = 0; i < 5; i += 1) {
      const res = ba[i].split("|");
      if (!this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        return 0;
      }
      temp_arr.push(res.length);
    }
    return (
      zhushu *
      temp_arr[0] *
      temp_arr[1] *
      temp_arr[2] *
      temp_arr[3] *
      temp_arr[4]
    );
  }

  // 五星组选120
  calc_5x_zx120(ba) {
    if (ba.length < 5 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    switch (ba.length) {
      case 5:
        return 1;
      case 6:
        return 6;
      case 7:
        return 21;
      case 8:
        return 56;

      case 9:
        return 126;
      case 10:
        return 252;

      default:
        return 0;
    }
  }

  // 五星 组选60
  calc_5x_zx60(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    // 循环二重号码球
    for (let i = 0; i < balls1.length; i += 1) {
      // 判断该二重号是否与单号重复
      let temp_length = 0,
        sub_zhushu = 0;
      if (this.contains(balls2, balls1[i])) {
        temp_length = balls2.length - 1;
      } else {
        temp_length = balls2.length;
      }
      // 计算单号球个数
      switch (temp_length) {
        case 3:
          sub_zhushu = 1;
          break;
        case 4:
          sub_zhushu = 4;
          break;
        case 5:
          sub_zhushu = 10;
          break;
        case 6:
          sub_zhushu = 20;
          break;
        case 7:
          sub_zhushu = 35;
          break;
        case 8:
          sub_zhushu = 56;
          break;
        case 9:
          sub_zhushu = 84;
          break;
        default:
          sub_zhushu = 0;
          break;
      }
      zhushu += sub_zhushu;
    }
    return zhushu;
  }

  // 五星组选30
  calc_5x_zx30(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    // 循环单号号码球
    for (let i = 0; i < balls2.length; i += 1) {
      let temp_length = 0,
        sub_zhushu = 0;
      if (this.contains(balls1, balls2[i])) {
        temp_length = balls1.length - 1;
      } else {
        temp_length = balls1.length;
      }
      // 计算双重号号球个数
      switch (temp_length) {
        case 2:
          sub_zhushu = 1;
          break;
        case 3:
          sub_zhushu = 3;
          break;
        case 4:
          sub_zhushu = 6;
          break;
        case 5:
          sub_zhushu = 10;
          break;
        case 6:
          sub_zhushu = 15;
          break;
        case 7:
          sub_zhushu = 21;
          break;
        case 8:
          sub_zhushu = 28;
          break;
        case 9:
          sub_zhushu = 36;
          break;
        default:
          sub_zhushu = 0;
          break;
      }
      zhushu += sub_zhushu;
    }
    return zhushu;
  }

  // 组选20
  calc_5x_zx20(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    // 循环三重号码球
    for (let i = 0; i < balls1.length; i += 1) {
      let temp_length = 0,
        sub_zhushu = 0;
      if (this.contains(balls2, balls1[i])) {
        temp_length = balls2.length - 1;
      } else {
        temp_length = balls2.length;
      }
      // 计算不同号号球个数
      switch (temp_length) {
        case 2:
          sub_zhushu = 1;
          break;
        case 3:
          sub_zhushu = 3;
          break;
        case 4:
          sub_zhushu = 6;
          break;
        case 5:
          sub_zhushu = 10;
          break;
        case 6:
          sub_zhushu = 15;
          break;
        case 7:
          sub_zhushu = 21;
          break;
        case 8:
          sub_zhushu = 28;
          break;
        case 9:
          sub_zhushu = 36;
          break;
        default:
          sub_zhushu = 0;
          break;
      }
      zhushu += sub_zhushu;
    }
    return zhushu;
  }

  // 五星 组选10
  calc_5x_zx10(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < balls1.length; i += 1) {
      if (this.contains(balls2, balls1[i])) {
        zhushu += balls2.length - 1;
      } else {
        zhushu += balls2.length;
      }
    }
    return zhushu;
  }

  // 五星 组选5
  calc_5x_zx5(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < balls1.length; i += 1) {
      if (this.contains(balls2, balls1[i])) {
        zhushu += balls2.length - 1;
      } else {
        zhushu += balls2.length;
      }
    }
    return zhushu;
  }

  /* end at 2017-07-10 pm */

  // 四星直选复式f
  calc_4x_zxfs(ba) {
    if (ba.length !== 4) {
      return 0;
    }
    const num = [];
    for (let i = 0; i < ba.length; i++) {
      const k = ba[i].split("|");
      if (this.checkArrIs(k, /^([0-9]|[0][0-9])$/)) {
        num[i] = k.length;
      } else {
        return 0;
      }
    }
    return num[0] * num[1] * num[2] * num[3];
  }

  // 四星直选单式
  calc_4x_zxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 4) {
        zhushu++;
      }
    }
    return zhushu;
  }

  /* start at 2017-07-10 pm */

  // 四星直选组合
  calc_4x_zxzh(ba) {
    if (ba.length !== 4) {
      return 0;
    }
    const zhushu = 4;
    const temp_arr = [];
    for (let i = 0; i < 4; i += 1) {
      const res = ba[i].split("|");
      if (!this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        return 0;
      }
      temp_arr.push(res.length);
    }
    return zhushu * temp_arr[0] * temp_arr[1] * temp_arr[2] * temp_arr[3];
  }

  // 四星组选24
  calc_4x_zx24(ba) {
    const len = ba.length;
    if (len < 4 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    switch (len) {
      case 4:
        return 1;
      case 5:
        return 5;
      case 6:
        return 15;
      case 7:
        return 35;
      case 8:
        return 70;
      case 9:
        return 126;
      case 10:
        return 210;
      default:
        return 0;
    }
  }

  // 四星 组选12
  calc_4x_zx12(ba) {
    const len = ba.length;
    if (len !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < balls1.length; i += 1) {
      let temp_len = 0,
        sub_zhushu = 0;
      if (this.contains(balls2, balls1[i])) {
        temp_len = balls2.length - 1;
      } else {
        temp_len = balls2.length;
      }
      switch (temp_len) {
        case 2:
          sub_zhushu = 1;
          break;
        case 3:
          sub_zhushu = 3;
          break;
        case 4:
          sub_zhushu = 6;
          break;
        case 5:
          sub_zhushu = 10;
          break;
        case 6:
          sub_zhushu = 15;
          break;
        case 7:
          sub_zhushu = 21;
          break;
        case 8:
          sub_zhushu = 28;
          break;
        case 9:
          sub_zhushu = 36;
          break;
        default:
          sub_zhushu = 0;
          break;
      }
      zhushu += sub_zhushu;
    }
    return zhushu;
  }

  // 四星组选6
  calc_4x_zx6(ba) {
    if (ba.length < 2 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    const len = ba.length;
    switch (len) {
      case 2:
        return 1;
      case 3:
        return 3;
      case 4:
        return 6;
      case 5:
        return 10;
      case 6:
        return 15;
      case 7:
        return 21;
      case 8:
        return 28;
      case 9:
        return 36;
      case 10:
        return 45;
      default:
        return 0;
    }
  }

  // 四星 组选4
  calc_4x_zx4(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const balls1 = ba[0].split("|");
    const balls2 = ba[1].split("|");
    if (
      !this.checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < balls1.length; i += 1) {
      let sub_zhushu = 0;
      if (this.contains(balls2, balls1[i])) {
        sub_zhushu = balls2.length - 1;
      } else {
        sub_zhushu = balls2.length;
      }
      zhushu += sub_zhushu;
    }
    return zhushu;
  }

  /* end at 2017-07-10 pm */

  // 三星直选复式
  calc_h3_zxfs(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    const num = [];
    for (let i = 0; i < ba.length; i++) {
      const k = ba[i].split("|");
      if (this.checkArrIs(k, /^([0-9]|[0][0-9])$/)) {
        num[i] = k.length;
      }
    }
    return num[0] * num[1] * num[2];
  }

  // 三星直选单式
  calc_h3_zxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 3) {
        zhushu++;
      }
    }
    return zhushu;
  }

  // 后三组合
  calc_h3_zh(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    const num = [];
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        num[i] = res.length;
      } else {
        return 0;
      }
    }
    return num[0] * num[1] * num[2] * 3;
  }

  // 直选和值
  calc_h3_zxhz(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      if (value >= 0 && value <= 27) {
        let n = 0;
        if (value <= 13) {
          n = value + 2;
        } else if (value > 13) {
          n = 29 - value;
        }
        if (n === 12) {
          zhushu += 63;
        } else if (n === 13) {
          zhushu += 69;
        } else if (n === 14) {
          zhushu += 73;
        } else if (n === 15) {
          zhushu += 75;
        } else {
          zhushu += n * ((n - 1) / 2);
        }
      }
    }
    return zhushu;
  }

  // 直选跨度
  calc_h3_zxkd(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 0:
          zhushu += 10;
          break;
        case 1:
        case 9:
          zhushu += 54;
          break;
        case 2:
        case 8:
          zhushu += 96;
          break;
        case 3:
        case 7:
          zhushu += 126;
          break;
        case 4:
        case 6:
          zhushu += 144;
          break;
        case 5:
          zhushu += 150;
      }
    }
    return zhushu;
  }

  // 组三复式
  calc_h3_z3fs(ba) {
    const n = ba.length;
    let zhushu = 0;
    switch (n) {
      case 2:
        zhushu = 2;
        break;
      case 3:
        zhushu = 6;
        break;
      case 4:
        zhushu = 12;
        break;
      case 5:
        zhushu = 20;
        break;
      case 6:
        zhushu = 30;
        break;
      case 7:
        zhushu = 42;
        break;
      case 8:
        zhushu = 56;
        break;
      case 9:
        zhushu = 72;
        break;
      case 10:
        zhushu = 90;
        break;
    }
    return zhushu;
  }

  // 组三单式
  calc_h3_z3ds(ba) {
    // console.log('组三单式： ')
    // console.log(ba)
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        const a = res[0] * 1,
          b = res[1] * 1,
          c = res[2] * 1;
        if (
          (a === b && a !== c) ||
          (a === c && a !== b) ||
          (b === c && a !== b)
        ) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 组六复式
  calc_h3_z6fs(ba) {
    const n = ba.length;
    switch (n) {
      case 3:
        return 1;
      case 4:
        return 4;
      case 5:
        return 10;
      case 6:
        return 20;
      case 7:
        return 35;
      case 8:
        return 56;
      case 9:
        return 84;
      case 10:
        return 120;
    }
    return 0;
  }

  // 组六单式
  calc_h3_z6ds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (
          res[0] * 1 !== res[1] * 1 &&
          res[1] * 1 !== res[2] * 1 &&
          res[0] * 1 !== res[2] * 1
        ) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 混合组选
  calc_h3_hhzx(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] || res[0] !== res[2] || res[1] !== res[2]) {
          // 不包含豹子
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 组选和值
  calc_h3_zuxhz(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 1:
        case 26:
          zhushu += 1;
          break;
        case 2:
        case 3:
        case 24:
        case 25:
          zhushu += 2;
          break;
        case 4:
        case 23:
          zhushu += 4;
          break;
        case 5:
        case 22:
          zhushu += 5;
          break;
        case 6:
        case 21:
          zhushu += 6;
          break;
        case 7:
        case 20:
          zhushu += 8;
          break;
        case 8:
        case 19:
          zhushu += 10;
          break;
        case 9:
        case 18:
          zhushu += 11;
          break;
        case 10:
        case 17:
          zhushu += 13;
          break;
        case 11:
        case 12:
        case 16:
        case 15:
          zhushu += 14;
          break;
        case 13:
        case 14:
          zhushu += 15;
          break;
      }
    }
    return zhushu;
  }

  // 组选包胆
  calc_h3_zuxbd(ba) {
    if (ba.length !== 1 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    return 54;
  }

  // 和值尾数
  calc_h3_sumws(ba) {
    if (ba.length < 1 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 特殊号
  calc_h3_tsh(ba) {
    if (ba.length < 1 || !this.checkArrIs(ba, /^([0-2])$/)) {
      return 0;
    }
    return ba.length;
  }

  // 前二直选复式
  calc_q2_zxfs(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    const ba_0 = ba[0].split("|");
    const ba_1 = ba[1].split("|");
    if (
      this.checkArrIs(ba_0, /^([0-9]|[0][0-9])$/) &&
      this.checkArrIs(ba_1, /^([0-9]|[0][0-9])$/)
    ) {
      return ba_0.length * ba_1.length;
    } else {
      return 0;
    }
  }

  // 前二直选单式
  calc_q2_zxds(ba) {
    let zhushu = 0;
    console.log(ba);
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 2 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++;
      }
    }
    return zhushu;
  }

  // 前二直选和值
  calc_q2_zhxhz(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      if (value < 10) {
        zhushu += value + 1;
      } else if (value < 19) {
        zhushu += 19 - value;
      }
    }
    return zhushu;
  }

  // 前二 直选跨度
  calc_q2_zxkd(ba) {
    let zhushu = 0;
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 0:
          zhushu += 10;
          break;
        case 1:
          zhushu += 18;
          break;
        case 2:
          zhushu += 16;
          break;
        case 3:
          zhushu += 14;
          break;
        case 4:
          zhushu += 12;
          break;
        case 5:
          zhushu += 10;
          break;
        case 6:
          zhushu += 8;
          break;
        case 7:
          zhushu += 6;
          break;
        case 8:
          zhushu += 4;
          break;
        case 9:
          zhushu += 2;
          break;
      }
    }
    return zhushu;
  }

  // 前二 组选复式
  calc_q2_zuxfs(ba) {
    const count = ba.length;
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    switch (count) {
      case 2:
        return 1;
      case 3:
        return 3;
      case 4:
        return 6;
      case 5:
        return 10;
      case 6:
        return 15;
      case 7:
        return 21;
      case 8:
        return 28;
      case 9:
        return 36;
      case 10:
        return 45;
    }
    return 0;
  }

  // 前二 组选单式
  calc_q2_zuxds(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (
        res.length === 2 &&
        this.checkArrIs(res, /^([0-9]|[0][0-9])$/) &&
        res[0] * 1 !== res[1] * 1
      ) {
        zhushu++;
      }
    }
    return zhushu;
  }

  // 前二 组选和值
  calc_q2_zuxhz(ba) {
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 1:
        case 2:
        case 16:
        case 17:
          zhushu += 1;
          break;
        case 3:
        case 4:
        case 14:
        case 15:
          zhushu += 2;
          break;
        case 5:
        case 6:
        case 12:
        case 13:
          zhushu += 3;
          break;
        case 7:
        case 8:
        case 10:
        case 11:
          zhushu += 4;
          break;
        case 9:
          zhushu += 5;
          break;
      }
    }
    return zhushu;
  }

  // 前二 组选包胆
  calc_q2_zuxbd(ba) {
    if (ba.length !== 1 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return 9;
    }
  }

  // 定位胆
  calc_dwd(ba) {
    if (ba.length < 2) {
      return 0;
    } else {
      let zhushu = 0;
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res = ba[i].split("|");
        if (this.checkArrIs(res, /^([0-9])$/)) {
          zhushu += res.length;
        }
      }
      return zhushu;
    }
  }

  // 三星 不定位 3中1码
  calc_bdw_31m(ba) {
    if (ba.length < 1 || !this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 三星 不定位 3中2码
  calc_bdw_32m(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    const n = ba.length;
    return n * ((n - 1) / 2);
  }
  // 三星 不定位 3中3码
  calc_bdw_33m(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    const n = ba.length;
    switch (n) {
      case 3:
        return 1;
      case 4:
        return 4;
      case 5:
        return 10;
      case 6:
        return 20;
      case 7:
        return 35;
      case 8:
        return 56;
      case 9:
        return 84;
      case 10:
        return 120;
    }
    return 0;
  }

  // 前二 大小单双
  calc_q2_dxds(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    let zhushu = 1;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length;
      } else {
        return 0;
      }
    }
    return zhushu;
  }

  // 后二 大小单双
  calc_h2_dxds(ba) {
    if (ba.length !== 2) {
      return 0;
    }
    let zhushu = 1;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length;
      } else {
        return 0;
      }
    }
    return zhushu;
  }

  // 前三 大小单双
  calc_q3_dxds(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    let zhushu = 1;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length;
      } else {
        return 0;
      }
    }
    return zhushu;
  }

  // 后三 大小单双
  calc_h3_dxds(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    let zhushu = 1;
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (this.checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length;
      } else {
        return 0;
      }
    }
    return zhushu;
  }

  // 任二 直选复式
  calc_r2_zxfs(ba) {
    // console.log(ba)
    const len = ba.length;
    if (len < 3) return 0;

    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0;
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length;
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length;
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length;
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length;
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length;
      }
    }
    return a * (b + c + d + e) + b * (c + d + e) + c * (d + e) + d * e;
  }

  // 任二 直选单式
  calc_r2_zxds(ba) {
    let zhushu = 0,
      pos_count;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 2 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++;
      }
    }
    return zhushu * pos_count;
  }

  // 任二 直选和值
  calc_r2_zxhz(ba) {
    // console.log('数据:')
    // console.log(ba)
    // 24 3 5 7 9/33
    let zhushu = 0;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const sub_arr = [ba[i]];
      if (!this.checkArrIs(sub_arr, /^(([0-9]|[1][0-8])|([0][0-9]))$/)) {
        return 0;
      }
      const value = parseInt(ba[i]);
      switch (value) {
        case 0:
        case 18:
          zhushu += 1;
          break;
        case 1:
        case 17:
          zhushu += 2;
          break;
        case 2:
        case 16:
          zhushu += 3;
          break;
        case 3:
        case 15:
          zhushu += 4;
          break;
        case 4:
        case 14:
          zhushu += 5;
          break;
        case 5:
        case 13:
          zhushu += 6;
          break;
        case 6:
        case 12:
          zhushu += 7;
          break;
        case 7:
        case 11:
          zhushu += 8;
          break;
        case 8:
        case 10:
          zhushu += 9;
          break;
        case 9:
          zhushu += 10;
          break;
      }
    }
    return zhushu;
  }

  // 任二 组选复式
  calc_r2_zuxfs(ba) {
    let zhushu = 0;
    if (ba.length < 3) {
      return 0;
    }

    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      if (value >= 0 && value <= 9) {
        zhushu++;
      }
    }
    return zhushu * ((zhushu - 1) / 2);
  }

  // 任二 组选单式
  calc_r2_zuxds(ba) {
    let zhushu = 0;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 2 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1]) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 任二 组选和值
  calc_r2_zuxhz(ba) {
    let zhushu = 0;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 1:
        case 2:
        case 16:
        case 17:
          zhushu += 1;
          break;
        case 3:
        case 4:
        case 14:
        case 15:
          zhushu += 2;
          break;
        case 5:
        case 6:
        case 12:
        case 13:
          zhushu += 3;
          break;
        case 7:
        case 8:
        case 10:
        case 11:
          zhushu += 4;
          break;
        case 9:
          zhushu += 5;
          break;
      }
    }
    return zhushu;
  }

  // 任三 直选复式
  calc_r3_zxfs(ba) {
    const len = ba.length;
    if (len < 4) {
      return 0;
    }
    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0;
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length;
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length;
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length;
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length;
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length;
      }
    }
    //		console.log(a+' '+b+' '+c+' '+d+' '+e);
    return (
      a * b * (c + d + e) +
      a * c * (d + e) +
      a * d * e +
      b * c * (d + e) +
      b * d * e +
      c * d * e
    );
  }

  // 任三 直选单式
  calc_r3_zxds(ba) {
    let zhushu = 0;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++;
      }
    }
    return zhushu * pos_count;
  }

  // 任三 直选和值
  calc_r3_zxhz(ba) {
    let zhushu = 0;
    if (ba.length < 2) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      if (value >= 0 && value <= 27) {
        let n = 0;
        if (value <= 13) {
          n = value + 2;
        } else if (value > 13) {
          n = 29 - value;
        }
        if (n === 12) {
          zhushu += 63;
        } else if (n === 13) {
          zhushu += 69;
        } else if (n === 14) {
          zhushu += 73;
        } else if (n === 15) {
          zhushu += 75;
        } else {
          zhushu += n * ((n - 1) / 2);
        }
      }
    }
    return zhushu;
  }

  // 任三 组三复式
  calc_r3_zu3fs(ba) {
    let zhushu = 0;
    const len = ba.length;
    if (len < 3) {
      return 0;
    }
    switch (len - 1) {
      case 2:
        zhushu = 2;
        break;
      case 3:
        zhushu = 6;
        break;
      case 4:
        zhushu = 12;
        break;
      case 5:
        zhushu = 20;
        break;
      case 6:
        zhushu = 30;
        break;
      case 7:
        zhushu = 42;
        break;
      case 8:
        zhushu = 56;
        break;
      case 9:
        zhushu = 72;
        break;
      case 10:
        zhushu = 90;
        break;
    }
    return zhushu;
  }

  // 任三 组三单式
  calc_r3_zu3ds(ba) {
    let zhushu = 0;
    if (ba.length < 2 || ba[0] < 7) {
      return 0;
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        const a = res[0] * 1,
          b = res[1] * 1,
          c = res[2] * 1;
        if (
          (a === b && a !== c) ||
          (a === c && a !== b) ||
          (b === c && a !== b)
        ) {
          zhushu++;
        }
      }
    }
    return zhushu * pos_count;
  }

  // 任三 组六复式
  calc_r3_zu6fs(ba) {
    const len = ba.length;
    let zhushu = 0;
    if (len < 4) {
      return 0;
    }
    switch (len - 1) {
      case 3:
        zhushu = 1;
        break;
      case 4:
        zhushu = 4;
        break;
      case 5:
        zhushu = 10;
        break;
      case 6:
        zhushu = 20;
        break;
      case 7:
        zhushu = 35;
        break;
      case 8:
        zhushu = 56;
        break;
      case 9:
        zhushu = 84;
        break;
      case 10:
        zhushu = 120;
        break;
    }
    return zhushu;
  }

  // 任三 组六单式
  calc_r3_zu6ds(ba) {
    if (ba.length < 2) {
      return;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] && res[0] !== res[2] && res[1] !== res[2]) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 任三 混合组选
  calc_r3_hhzx(ba) {
    // return 0;
    // console.log('任三-混合组选：')
    // console.log(ba)
    if (ba.length < 2 || ba[1] === "") {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 3 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] || res[0] !== res[2] || res[1] !== res[2]) {
          zhushu++;
        }
      }
    }
    return zhushu;
  }

  // 任三 组选和值
  calc_r3_zuxhz(ba) {
    // console.log(ba)
    if (ba.length < 2) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      switch (value) {
        case 1:
        case 26:
          zhushu += 1;
          break;
        case 2:
        case 3:
        case 24:
        case 25:
          zhushu += 2;
          break;
        case 4:
        case 23:
          zhushu += 4;
          break;
        case 5:
        case 22:
          zhushu += 5;
          break;
        case 6:
        case 21:
          zhushu += 6;
          break;
        case 7:
        case 20:
          zhushu += 8;
          break;
        case 8:
        case 19:
          zhushu += 10;
          break;
        case 9:
        case 18:
          zhushu += 11;
          break;
        case 10:
        case 17:
          zhushu += 13;
          break;
        case 11:
        case 12:
        case 16:
        case 15:
          zhushu += 14;
          break;
        case 13:
        case 14:
          zhushu += 15;
          break;
      }
    }
    return zhushu;
  }

  // 任四 直选复式
  calc_r4_zxfs(ba) {
    const len = ba.length;
    if (len < 5) {
      return 0;
    }

    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0;
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length;
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length;
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length;
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length;
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/);
      if (this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length;
      }
    }
    return (
      a * b * c * d +
      a * b * c * e +
      a * c * d * e +
      b * c * d * e +
      a * b * d * e
    );
  }

  // 任四 直选单式
  calc_r4_zxds(ba) {
    if (ba.length < 2) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/);
      if (res.length === 4 && this.checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++;
      }
    }
    return zhushu * pos_count;
  }

  // 任四 组选24
  calc_r4_zux24(ba) {
    const len = ba.length;
    const resBalls = ba.slice(1);
    if (len < 5 || !this.checkArrIs(resBalls, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    switch (len - 1) {
      case 4:
        return 1;
      case 5:
        return 5;
      case 6:
        return 15;
      case 7:
        return 35;
      case 8:
        return 70;
      case 9:
        return 126;
      case 10:
        return 210;
    }
  }

  // 任四 组选12
  calc_r4_zux12(ba) {
    //		console.log("数据测试");
    //		console.log(ba);
    const len = ba.length;
    // const resBalls = ba.slice(1)
    if (len < 3) {
      return 0;
    }
    const ball1 = ba[1].split("|"); // 2重号数组
    const ball2 = ba[2].split("|"); // 单号数组
    let zhushu = 0;
    for (let i = 0; i < ball1.length; i++) {
      const ball1_value = parseInt(ball1[i]);
      if (ball1_value >= 0 && ball1_value <= 9) {
        let n = 0;
        for (let j = 0; j < ball2.length; j++) {
          const ball2_value = parseInt(ball2[j]);
          if (
            ball2_value >= 0 &&
            ball2_value <= 9 &&
            ball2_value !== ball1_value
          ) {
            n++;
          }
        }
        zhushu += n * ((n - 1) / 2);
      }
    }
    return zhushu;
  }

  // 任四 组选6
  calc_r4_zux6(ba) {
    const len = ba.length;
    const resBalls = ba.slice(1);
    if (len < 3 || !this.checkArrIs(resBalls, /^([0-9]|[0][0-9])$/)) {
      return 0;
    }
    let n = 0;
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i]);
      if (value >= 0 && value <= 9) {
        n++;
      }
    }
    return n * ((n - 1) / 2);
  }

  // 任四 组选4
  calc_r4_zux4(ba) {
    //		console.log("任性--XXxxxxfsdfoo")
    //		console.log(ba);
    const len = ba.length;
    // const resBalls = ba.slice(1)
    if (len < 3) {
      return 0;
    }
    const balls_1 = ba[1].split("|"); // 三重号
    const balls_2 = ba[2].split("|"); // 单号
    //		console.log(balls_1);
    //		console.log(balls_2);
    if (
      !this.checkArrIs(balls_1, /^([0-9]|[0][0-9])$/) ||
      !this.checkArrIs(balls_2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < balls_1.length; i++) {
      const ball1_v = parseInt(balls_1[i]);
      if (ball1_v >= 0 && ball1_v <= 9) {
        let n = 0;
        for (let j = 0; j < balls_2.length; j++) {
          const ball2_v = parseInt(balls_2[j]);
          if (ball2_v >= 0 && ball2_v <= 9 && ball2_v !== ball1_v) {
            n++;
          }
        }
        zhushu += n;
      }
    }
    //		console.log("pp"+zhushu+" "+zhushu*pos_count);
    return zhushu;
  }

  // 南拳劈腿
  calc_dw_dxds(ba) {
    if (ba.length !== 5) {
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

  // 侧妃之争
  calc_cfzz(ba) {
    if (ba.length < 1 || !this.checkArrIs(ba, /[0-9]/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 侍寝之牌
  calc_sqzp(ba) {
    if (ba.length !== 5) {
      return 0;
    }
    let zhushu = 0;
    for (let i = 0; i < ba.length; i++) {
      if (ba[i] !== "?") {
        const res = ba[i].split(/[\|\/]/);
        if (this.checkArrIs(res, /[0-9]/)) {
          zhushu += res.length;
        }
      }
    }
    return zhushu;
  }

  calc_qw_yffs(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_qw_hscs(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_qw_sykt(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_qw_sjfc(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  calc_qw_wgfd(ba) {
    if (!this.checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 和值大小单双
  calc_hzdxds(ba) {
    if (!this.checkArrIs(ba, /^([0-3])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 尾数大小单双
  calc_hwdxds(ba) {
    if (!this.checkArrIs(ba, /^([0-3])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 牛牛
  calc_nn(arr) {
    return Array.isArray(arr) ? arr.length : 0;
  }

  // 双面盘
  calc_smp(arr) {
    return Array.isArray(arr) ? arr.length : 0;
  }

  // 龙虎斗
  calc_lhd(arr) {
    return Array.isArray(arr) ? arr.length : 0;
  }

  // END CLASS
}
export default new CalcSSC();
