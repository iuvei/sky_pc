function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item));
}
// 去除数组中的重复值
function repeatArr(arr) {
  const res = [];
  const jsons = {};
  for (let i = 0; i < arr.length; i++) {
    if (!jsons[arr[i]]) {
      res.push(arr[i]);
      jsons[arr[i]] = 1;
    }
  }
  return res;
}

class Calc {
  constructor() {
    this.tag_js = '11x5';
  }

  // 三码 前三直选复式
  calc_3m_q3zhxfs(ba) {
    // if (ba.length !== 3) {
    //   return 0
    // }
    if (ba.length < 3) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    const ba2 = ba[2].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    let num = 0;
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++;
          }
        }
      }
    }
    return num;
  }

  // 三码 前三直选单式
  calc_3m_q3zhxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 前三组选复式
  calc_3m_q3zuxfs(ba) {
    const num = ba.length;
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (num) {
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
      case 11:
        return 165;
    }
    return 0;
  }

  // 三码 前三组选单式
  calc_3m_q3zuxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        len[0] !== len[1] &&
        len[1] !== len[2] &&
        len[2] !== len[0] &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 前三组选胆拖
  calc_3m_q3zuxdt(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba1 = ba[0].split('|');
    const ba2 = ba[1].split('|');
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length;
    } else {
      switch (ba2.length) {
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
  }

  // 三码 中三直选复式
  calc_3m_z3zhxfs(ba) {
    // if (ba.length !== 3) {
    //   return 0
    // }
    if (ba.length < 3) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    const ba2 = ba[2].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    let num = 0;
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++;
          }
        }
      }
    }
    return num;
  }

  // 三码 中三直选单式
  calc_3m_z3zhxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 中三组选复式
  calc_3m_z3zuxfs(ba) {
    const num = ba.length;
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (num) {
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
      case 11:
        return 165;
    }
    return 0;
  }

  // 三码 中三组选单式
  calc_3m_z3zuxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 中三组选胆拖
  calc_3m_z3zuxdt(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba1 = ba[0].split('|');
    const ba2 = ba[1].split('|');
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length;
    } else {
      switch (ba2.length) {
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
  }

  // 三码 后三直选复式
  calc_3m_h3zhxfs(ba) {
    if (ba.length !== 3) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    const ba2 = ba[2].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    let num = 0;
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++;
          }
        }
      }
    }
    return num;
  }

  // 三码 后三直选单式
  calc_3m_h3zhxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 后三组选复式
  calc_3m_h3zuxfs(ba) {
    const num = ba.length;
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (num) {
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
      case 11:
        return 165;
    }
    return 0;
  }

  // 三码 后三组选单式
  calc_3m_h3zuxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }

  // 三码 后三组选胆拖
  calc_3m_h3zuxdt(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba1 = ba[0].split('|');
    const ba2 = ba[1].split('|');
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length;
    } else {
      switch (ba2.length) {
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
  }
  // 二码 前二直选复式
  calc_2m_q2zhxfs(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    let num = 0;
    for (const i in ba0) {
      for (const j in ba1) {
        if (ba1[j] !== ba0[i]) {
          num++;
        }
      }
    }
    return num;
  }
  // 二码 前二直选单式
  calc_2m_q2zhxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 二码 前二组选复式
  calc_2m_q2zuxfs(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
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
      case 11:
        return 55;
    }
  }
  // 二码 前二组选单式
  calc_2m_q2zuxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 2 &&
        len[0] !== len[1] &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 二码 前二组选胆拖
  calc_2m_q2zuxdt(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba1 = ba[1].split('|');
    if (!checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
      return 0;
    }
    return ba1.length;
  }

  // 二码 后二直选复式
  calc_2m_h2zhxfs(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    let num = 0;
    for (const i in ba0) {
      for (const j in ba1) {
        if (ba1[j] !== ba0[i]) {
          num++;
        }
      }
    }
    return num;
  }
  // 二码 后二直选单式
  calc_2m_h2zhxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 二码 后二组选复式
  calc_2m_h2zuxfs(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
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
      case 11:
        return 55;
    }
  }
  // 二码 后二组选单式
  calc_2m_h2zuxds(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/);
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 二码 后二组选胆拖
  calc_2m_h2zuxdt(ba) {
    if (ba.length < 2 || ba[0] === '') {
      return 0;
    }
    const ba1 = ba[1].split('|');
    if (!checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
      return 0;
    }
    return ba1.length;
  }
  // 不定位  前三位
  calc_bdw_q3w(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    return ba.length;
  }
  // 不定位  中三位
  calc_bdw_z3w(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    return ba.length;
  }
  // 不定位  后三位
  calc_bdw_h3w(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    return ba.length;
  }

  // 定位胆
  calc_dwd_dwd(ba) {
    if (ba.length < 2) {
      return 0;
    }

    let num = 0;
    for (let i = 1; i < ba.length; i++) {
      const child_arr = ba[i].split('|');
      if (checkArrIs(child_arr, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
        num += child_arr.length;
      }
    }
    return num;
  }
  // 任选复式 任选一中一
  calc_rxfs_rx1z1(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    return ba.length;
  }

  // 任选复式 任选二中二
  calc_rxfs_rx2z2(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
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
      case 11:
        return 55;
    }
  }

  // 任选复式 任选三中三
  calc_rxfs_rx3z3(ba) {
    if (
      ba.length < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
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
      case 11:
        return 165;
    }
  }
  // 任选复式 任选四中四
  calc_rxfs_rx4z4(ba) {
    if (
      ba.length < 4 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
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
      case 11:
        return 330;
    }
  }
  // 任选复式 任选五中五
  calc_rxfs_rx5z5(ba) {
    if (
      ba.length < 5 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
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
      case 11:
        return 462;
    }
  }
  // 任选复式 任选六中五
  calc_rxfs_rx6z5(ba) {
    if (
      ba.length < 6 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
      case 6:
        return 1;
      case 7:
        return 7;
      case 8:
        return 28;
      case 9:
        return 84;
      case 10:
        return 210;
      case 11:
        return 462;
    }
  }
  // 任选复式 任选七中五
  calc_rxfs_rx7z5(ba) {
    if (
      ba.length < 7 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
      case 7:
        return 1;
      case 8:
        return 8;
      case 9:
        return 36;
      case 10:
        return 120;
      case 11:
        return 330;
    }
  }
  // 任选复式 任选八中五
  calc_rxfs_rx8z5(ba) {
    if (
      ba.length < 8 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    switch (ba.length) {
      case 8:
        return 1;
      case 9:
        return 9;
      case 10:
        return 45;
      case 11:
        return 165;
    }
  }

  // 任选单式 任选一中一
  calc_rxds_rx1z1(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    // for (const i in ba) {
    for (var i = 0; i < ba.length; i++) {
      const len = ba[i].split(/[\|\/]/);
      if (
        len.length === 1 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选二中二
  calc_rxds_rx2z2(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 2) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 2 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选三中三
  calc_rxds_rx3z3(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 3) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 3 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选四中四
  calc_rxds_rx4z4(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 4) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 4 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选五中五
  calc_rxds_rx5z5(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 5) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 5 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选六中五
  calc_rxds_rx6z5(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 6) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 6 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选七中五
  calc_rxds_rx7z5(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 7) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 7 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选单式 任选八中五
  calc_rxds_rx8z5(ba) {
    if (ba.length < 1) {
      return 0;
    }
    let num = 0;
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/);
      if (len.length !== 8) break;
      const resBalls = repeatArr(len);
      if (
        resBalls.length === 8 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++;
      }
    }
    return num;
  }
  // 任选胆拖 任选二中二
  calc_rxdt_rx2z2(ba) {
    if (ba.length < 2) {
      return 0;
    }
    if (!ba[0].length) return 0;
    const ba1 = ba[1].split(/[\|\/]/);
    if (
      ba1.length < 1 ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    return ba1.length;
  }
  // 任选胆拖 任选三中三
  calc_rxdt_rx3z3(ba) {
    console.error(ba);
    // if (ba.length !== 2) {
    //   return 0
    // }
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length === 2) {
      return ba1.length;
    } else {
      if (ba1.length < 2) {
        return 0;
      }
      let num = 0;
      for (let m = ba1.length; m > 0; m--) {
        num += m - 1;
      }
      return num;
    }
  }
  // 任选胆拖 任选四中四
  calc_rxdt_rx4z4(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length + ba1.length < 4) {
      return 0;
    }
    switch (ba0.length) {
      case 1: {
        let k = 0;
        const n = ba1.length - 2; // 胆码固定1求  则拖码3求为一注
        const num = [];
        for (let i = n; i > 0; i--) {
          num[k] = (k + 1) * i;
          k++;
        }
        let result = 0;
        for (const i in num) {
          result += num[i];
        }
        return result;
      }
      case 2: {
        const n = ba1.length - 1; // 胆码固定2码  则拖码2个球为一注
        const num = [];
        let result = 0;
        for (let i = n, j = 0; i > 0; i--) {
          num[j] = i;
          j++;
        }
        for (const i in num) {
          result += num[i];
        }
        return result;
      }
      case 3:
        return ba1.length;
    }
    return 0;
  }
  // 任选胆拖 任选五中五
  calc_rxdt_rx5z5(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length + ba1.length < 5) {
      return 0;
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
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
        break;
      case 2: {
        // 拖码3个球为一注
        let k = 0;
        const n = ba1.length - 2; // 胆码固定2求  则拖码3求为一注
        const num = [];
        for (let i = n; i > 0; i--) {
          num[k] = (k + 1) * i;
          k++;
        }
        let result = 0;
        for (const i in num) {
          result += num[i];
        }
        return result;
      }
      case 3: {
        const n = ba1.length - 1; // 胆码固定3码  则拖码2个球为一注
        const num = [];
        let result = 0;
        for (let i = n, j = 0; i > 0; i--) {
          num[j] = i;
          j++;
        }
        for (const i in num) {
          result += num[i];
        }
        return result;
      }
      case 4:
        return ba1.length;
    }
  }
  // 任选胆拖 任选六中五
  calc_rxdt_rx6z5(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length + ba1.length < 6) {
      return 0;
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
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
        }
        break;
      case 2:
        switch (ba1.length) {
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
        }
        break;
      case 3:
        switch (ba1.length) {
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
        }
        break;
      case 4:
        switch (ba1.length) {
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
        }
        break;
      case 5:
        return ba1.length;
    }
  }
  // 任选胆拖 任选七中五
  calc_rxdt_rx7z5(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length + ba1.length < 7) {
      return 0;
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 6:
            return 1;
          case 7:
            return 7;
          case 8:
            return 28;
          case 9:
            return 84;
          case 10:
            return 210;
        }
        break;
      case 2:
        switch (ba1.length) {
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
        }
        break;
      case 3:
        switch (ba1.length) {
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
        }
        break;
      case 4:
        switch (ba1.length) {
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
        }
        break;
      case 5:
        switch (ba1.length) {
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
        }
        break;
      case 6:
        return ba1.length;
    }
  }
  // 任选胆拖 任选八中五
  calc_rxdt_rx8z5(ba) {
    if (ba.length < 2) {
      return 0;
    }
    const ba0 = ba[0].split('|');
    const ba1 = ba[1].split('|');
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    }
    if (ba0.length + ba1.length < 8) {
      return 0;
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 7:
            return 1;
          case 8:
            return 8;
          case 9:
            return 36;
          case 10:
            return 120;
        }
        break;
      case 2:
        switch (ba1.length) {
          case 6:
            return 1;
          case 7:
            return 7;
          case 8:
            return 28;
          case 9:
            return 84;
        }
        break;
      case 3:
        switch (ba1.length) {
          case 5:
            return 1;
          case 6:
            return 6;
          case 7:
            return 21;
          case 8:
            return 56;
        }
        break;
      case 4:
        switch (ba1.length) {
          case 4:
            return 1;
          case 5:
            return 5;
          case 6:
            return 15;
          case 7:
            return 35;
        }
        break;
      case 5:
        switch (ba1.length) {
          case 3:
            return 1;
          case 4:
            return 4;
          case 5:
            return 10;
          case 6:
            return 20;
        }
        break;
      case 6:
        switch (ba1.length) {
          case 2:
            return 1;
          case 3:
            return 3;
          case 4:
            return 6;
          case 5:
            return 10;
        }
        break;
      case 7:
        return ba1.length;
    }
  }

  calc_dwd_dxds(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0;
    }
    let zhushu = 0;
    for (let i = 1, len = ba.length; i < len; i += 1) {
      const res = ba[i].split(/[\|\/]/);
      if (checkArrIs(res, /^([0-3])$/)) {
        zhushu += res.length;
      }
    }
    return zhushu;
  }

  calc_sum_dxds(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-5])$/)) {
      return 0;
    } else {
      return ba.length;
    }
  }
  // 龙虎斗
  calc_lhd(ba) {
    if (Array.isArray(ba)) return ba.length;
    return 0;
  }

  calc_q5z1(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0;
    } else {
      return ba.length;
    }
  }

  // 牛牛
  calc_nn(ba) {
    return Array.isArray(ba) ? ba.length : 0;
  }

  // 双面盘
  calc_smp(ba) {
    return Array.isArray(ba) ? ba.length : 0;
  }

  // END CLASS
}

const getCalcFuncByPlayID = playid => {
  switch (playid) {
    case 1: // '前三直选复式':
      return 'calc_3m_q3zhxfs';
    case 2: // '前三直选单式':
      return 'calc_3m_q3zhxds';
    case 3: // '前三组选复式':
      return 'calc_3m_q3zuxfs';
    case 4: // '前三组选单式':
      return 'calc_3m_q3zuxds';
    case 5: // '前三组选胆拖':
      return 'calc_3m_q3zuxdt';
    case 6: // '中三直选复式':
      return 'calc_3m_z3zhxfs';
    case 7: // '中三直选单式':
      return 'calc_3m_z3zhxds';
    case 8: // '中三组选复式':
      return 'calc_3m_z3zuxfs';
    case 9: // '中三组选单式':
      return 'calc_3m_z3zuxds';
    case 10: // '中三组选胆拖':
      return 'calc_3m_z3zuxdt';
    case 11: // '后三直选复式':
      return 'calc_3m_h3zhxfs';
    case 12: // '后三直选单式':
      return 'calc_3m_h3zhxds';
    case 13: // '后三组选复式':
      return 'calc_3m_h3zuxfs';
    case 14: // '后三组选单式':
      return 'calc_3m_h3zuxds';
    case 15: // '后三组选胆拖':
      return 'calc_3m_h3zuxdt';
    case 16: // '前二直选复式':
      return 'calc_2m_q2zhxfs';
    case 17: // '前二直选单式':
      return 'calc_2m_q2zhxds';
    case 18: // '前二组选复式':
      return 'calc_2m_q2zuxfs';
    case 19: // '前二组选单式':
      return 'calc_2m_q2zuxds';
    case 20: // '前二组选胆拖':
      return 'calc_2m_q2zuxdt';
    case 21: // '后二直选复式':
      return 'calc_2m_h2zhxfs';
    case 22: // '后二直选单式':
      return 'calc_2m_h2zhxds';
    case 23: // '后二组选复式':
      return 'calc_2m_h2zuxfs';
    case 24: // '后二组选单式':
      return 'calc_2m_h2zuxds';
    case 25: // '后二组选胆拖':
      return 'calc_2m_h2zuxdt';
    case 26: // '不定位-前三位':
      return 'calc_bdw_q3w';
    case 27: // '不定位-中三位':
      return 'calc_bdw_z3w';
    case 28: // '不定位-后三位':
      return 'calc_bdw_h3w';
    case 29:
      // case 56: // '定位胆': 双面盘
      return 'calc_dwd_dwd';
    case 30: // '任选复式_任选一中一':
      return 'calc_rxfs_rx1z1';
    case 31: // '任选二中二(复式)':
      return 'calc_rxfs_rx2z2';
    case 32: // '任选复式_任选三中三':
      return 'calc_rxfs_rx3z3';
    case 33: // '任选复式_任选四中四':
      return 'calc_rxfs_rx4z4';
    case 34: // '任选复式_任选五中五':
      return 'calc_rxfs_rx5z5';
    case 35: // '任选复式_任选六中五':
      return 'calc_rxfs_rx6z5';
    case 36: // '任选七中五(复式)':
      return 'calc_rxfs_rx7z5';
    case 37: // '任选复式_任选八中五':
      return 'calc_rxfs_rx8z5';
    case 38: // '任选单式_任选一中一':
      return 'calc_rxds_rx1z1';
    case 39: // '任选单式_任选二中二':
      return 'calc_rxds_rx2z2';
    case 40: // '任选单式_任选三中三':
      return 'calc_rxds_rx3z3';
    case 41: // '任选单式_任选四中四':
      return 'calc_rxds_rx4z4';
    case 42: // '任选单式_任选五中五':
      return 'calc_rxds_rx5z5';
    case 43: // '任选单式_任选六中五':
      return 'calc_rxds_rx6z5';
    case 44: // '任选单式_任选七中五':
      return 'calc_rxds_rx7z5';
    // case 44: // '任选单式_任选八中五':
    //   return 'calc_rxds_rx8z5'
    case 45: // '任选胆拖_任选二中二':
      return 'calc_rxdt_rx2z2';
    case 46: // '任选胆拖_任选三中三':
      return 'calc_rxdt_rx3z3';
    case 47: // '任选胆拖_任选四中四':
      return 'calc_rxdt_rx4z4';
    case 48: // '任选胆拖_任选五中五':
      return 'calc_rxdt_rx5z5';
    case 49: // '任选胆拖_任选六中五':
      return 'calc_rxdt_rx6z5';
    case 50: // '任选胆拖_任选七中五':
      return 'calc_rxdt_rx7z5';
    case 51: // '任选胆拖_任选八中五':
      return 'calc_rxdt_rx8z5';
    // case 29: // '综合定位胆':
    //   return 'calc_sum_dxds'
    case 54: // '龙虎斗':
      return 'calc_lhd';
    case 57: // '牛牛':
      return 'calc_nn';
    case 56:
      return 'calc_smp';
    // case 'calc_q5z1':
    //   return 'calc_q5z1'
  }
};

const danshiArr = [
  2,
  4,
  7,
  9,
  12,
  14,
  17,
  19,
  22,
  24,
  38,
  39,
  40,
  41,
  42,
  43,
  44
];

const calc = new Calc();
export default function calcBetNum(playid, arr) {
  const name = getCalcFuncByPlayID(playid);
  // console.error(name,arr)
  const isDanshi = danshiArr.includes(playid);
  arr = isDanshi ? (Array.isArray(arr) ? arr : arr.split(',')) : arr;
  return calc[name](arr);
}
