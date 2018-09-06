// 3D  排列3  计算注数 文件
class Calc_Zhushu_Obj {
  constructor() {
    this.tag_js = 'f3d'
  }
  calcBetNum(playid, arr) {
    console.log(playid, arr)
    switch (playid) {
      case 1:
        return this.calc_3x_zhxfs(arr)
      case 3:
        return this.calc_3x_zhxhz(arr)
      case 4:
        return this.calc_3x_zu3fs(arr)
      case 5:
        return this.calc_3x_zu6fs(arr)
      case 6:
        return this.calc_3x_zu3hz(arr)
      case 7:
        return this.calc_3x_zu6hz(arr)
      case 8:
        return this.calc_2x_q2zhxfs(arr)
      case 9:
        return this.calc_2x_h2zhxfs(arr)
      case 10:
        return this.calc_2x_q2zuxfs(arr)
      case 11:
        return this.calc_2x_h2zuxfs(arr)
      case 12:
        return this.calc_dwd_dwd(arr)
      case 13:
        return this.calc_bdw_1mbdw(arr)
      case 14:
        return this.calc_bdw_2mbdw(arr)
      case 26:
        return this.calc_smp(arr)
      case 27:
        return this.calc_lhd(arr)
      case 2:
        return this.calc_3x_zhxds(arr)
    }
  }
  checkArrIs(arr, regx) {
    return arr.every(item => regx.test(item))
  }
  // 三星直选复式
  calc_3x_zhxfs(balls) {
    if (
      balls.length !== 3 ||
      balls[0] === '' ||
      balls[1] === '' ||
      balls[2] === ''
    ) {
      return 0
    }
    const ba0 = balls[0].split('|')
    const ba1 = balls[1].split('|')
    const ba2 = balls[2].split('|')
    const c = ba0.concat(ba1).concat(ba2)
    if (c.join('').length) return ba0.length * ba1.length * ba2.length
    return 0
  }

  // 三星 直选单式
  calc_3x_zhxds(ba) {
    console.log(ba)
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const balls = ba[i].split(/[\|\/]/)
      if (!this.checkArrIs(balls, /^([0-9]|[0][0-9])$/) || balls.length !== 3) {
        return 0
      } else {
        zhushu++
      }
    }
    return zhushu
  }

  // 三星 和值  牛逼的存在
  calc_3x_zhxhz(balls) {
    if (balls.length < 1 || balls[0] === '') {
      return 0
    } else {
      return balls.length
    }
  }

  // 三星 组三复式
  calc_3x_zu3fs(ba) {
    if (ba.length < 2) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 2
      case 3:
        return 6
      case 4:
        return 12
      case 5:
        return 20
      case 6:
        return 30
      case 7:
        return 42
      case 8:
        return 56
      case 9:
        return 72
      case 10:
        return 90
    }
    return 0
  }

  // 三星 组六复式
  calc_3x_zu6fs(ba) {
    if (ba.length < 3) {
      return 0
    }
    switch (ba.length) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
      case 7:
        return 35
      case 8:
        return 56
      case 9:
        return 84
      case 10:
        return 120
    }
    return 0
  }
  // 三星 组三和值
  calc_3x_zu3hz(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 三星 组六和值
  calc_3x_zu6hz(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 二星  前二直选复式
  calc_2x_q2zhxfs(ba) {
    if (ba.length < 2) {
      return 0
    }
    if (ba[0].length === 0 || ba[1].length === 0) return 0
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    return ba0.length * ba1.length
  }

  // 二星 后二直选复式
  calc_2x_h2zhxfs(ba) {
    if (ba.length < 2) {
      return 0
    }
    if (ba[0].length === 0 || ba[1].length === 0) return 0
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    return ba0.length * ba1.length
  }

  // 二星 前二组选复式
  calc_2x_q2zuxfs(ba) {
    if (ba.length < 2) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
    }
    return 0
  }
  // 二星 后二组选复式
  calc_2x_h2zuxfs(ba) {
    if (ba.length < 2) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
    }
    return 0
  }

  // 定位胆
  calc_dwd_dwd(ba) {
    if (ba.length < 1) {
      return 0
    }
    if (ba[0].length === 0 && ba[1].length === 0 && ba[2].length === 0) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      if (!ba[i].length) continue
      const len = ba[i].split('|')
      if (len[0] !== '?') {
        num += len.length
      }
    }
    return num
  }

  // 不定位 一码
  calc_bdw_1mbdw(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 不定位 二码
  calc_bdw_2mbdw(ba) {
    if (ba.length < 2) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
    }
    return 0
  }

  // 大小单双 前二
  calc_dxds_q2dxds(ba) {
    if (ba.length !== 2) {
      return 0
    } else {
      const ba0 = ba[0].split('|')
      const ba1 = ba[1].split('|')
      return ba0.length * ba1.length
    }
  }

  // 大小单双 后二
  calc_dxds_h2dxds(ba) {
    if (ba.length !== 2) {
      return 0
    } else {
      const ba0 = ba[0].split('|')
      const ba1 = ba[1].split('|')
      return ba0.length * ba1.length
    }
  }

  // 对子通选
  calc_dztx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 对子单选
  calc_dzdx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 顺子通选
  calc_sztx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 顺子单选
  calc_szdx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 豹子通选
  calc_bztx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 豹子单选
  calc_bzdx(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 龙虎斗
  calc_lhd(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 定位大小单双
  calc_dw_dxds(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0
    } else {
      let zhushu = 0
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res_balls = ba[i].split('|')
        zhushu += res_balls.length
      }
      return zhushu
    }
  }

  // 总大小单双
  calc_hz_dxds(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 双面盘
  calc_smp(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // END FUNCTION calc_zhushu_obj
}

export default new Calc_Zhushu_Obj()
