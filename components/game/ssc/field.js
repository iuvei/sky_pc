function setBallList(playid, labels) {
  labels = labels
    ? Array.isArray(labels)
      ? labels
      : labels.length
        ? labels.split('')
        : []
    : null;
  /******** 基础数据准备 **********/
  const productNum = max => {
    let arr = [],
      startNum = 0;
    max += 1;
    while (max--) {
      arr.push(startNum++);
    }
    return arr;
  };
  const assemRowName = name => {
    return [
      {
        name,
        option: defaultFunc()
      }
    ];
  };
  const defaultArr = productNum(9);
  const heZhiArr = productNum(27);
  const erHeZhiArr = productNum(18);
  const defaultFunc = (arr = defaultArr, type) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: type ? index + 1 : index,
        selected: false,
        odds: false
      };
    });
  };
  /******* 渲染界面的数据 ********/
  const severalRows = [
    {
      name: '万位',
      option: defaultFunc()
    },
    {
      name: '千位',
      option: defaultFunc()
    },
    {
      name: '百位',
      option: defaultFunc()
    },
    {
      name: '十位',
      option: defaultFunc()
    },
    {
      name: '个位',
      option: defaultFunc()
    }
  ];
  const erZuxuanFushi = [
    {
      name: '组选',
      option: defaultFunc()
    }
  ];
  const heZhiRow = [
    {
      name: '和值',
      option: defaultFunc(heZhiArr)
    }
  ];
  const erHeZhiRow = [
    {
      name: '和值',
      option: defaultFunc(erHeZhiArr)
    }
  ];
  const kuaduRow = [
    {
      name: '跨度',
      option: defaultFunc()
    }
  ];
  const zusanRow = [
    {
      name: '组三',
      option: defaultFunc()
    }
  ];
  const zuliuRow = [
    {
      name: '组六',
      option: defaultFunc()
    }
  ];
  const baodanRow = [
    {
      name: '包胆',
      option: defaultFunc()
    }
  ];
  const weishuRow = [
    {
      name: '尾数',
      option: defaultFunc()
    }
  ];
  const niuniu = [
    '牛一',
    '牛二',
    '牛三',
    '牛四',
    '牛五',
    '牛六',
    '牛七',
    '牛八',
    '牛九',
    '牛牛',
    '无牛',
    '有牛',
    '牛大',
    '牛小',
    '牛单',
    '牛双'
  ];
  const lhd = [
    {
      name: '万、千',
      option: ['龙', '虎', '和']
    },
    {
      name: '万、百',
      option: ['龙', '虎', '和']
    },
    {
      name: '万、拾',
      option: ['龙', '虎', '和']
    },
    {
      name: '万、个',
      option: ['龙', '虎', '和']
    },
    {
      name: '千、百',
      option: ['龙', '虎', '和']
    },
    {
      name: '千、十',
      option: ['龙', '虎', '和']
    },
    {
      name: '千、个',
      option: ['龙', '虎', '和']
    },
    {
      name: '百、十',
      option: ['龙', '虎', '和']
    },
    {
      name: '百、个',
      option: ['龙', '虎', '和']
    },
    {
      name: '拾、个',
      option: ['龙', '虎', '和']
    }
  ];
  const template_smp = [
    {
      name: '总和值',
      option: ['大', '小', '单', '双']
    },
    {
      name: '后二和值',
      option: ['大', '小', '单', '双', '中']
    },
    {
      name: '万位',
      option: ['大', '小', '单', '双']
    },
    {
      name: '千位',
      option: ['大', '小', '单', '双']
    },
    {
      name: '百位',
      option: ['大', '小', '单', '双']
    },
    {
      name: '十位',
      option: ['大', '小', '单', '双']
    },
    {
      name: '个位',
      option: ['大', '小', '单', '双']
    }
  ];
  const teshuhao = [
    {
      name: '特殊号',
      option: ['豹子', '顺子', '对子']
    }
  ];
  const smp1 = ['大', '小', '单', '双', '龙', '虎'];
  const smp2 = ['大', '小', '单', '双'];
  const rowsLine = arr => {
    let a = 0;
    arr.forEach((item, index) => {
      a += item.option.length;
      item.option = item.option.map((n, i) => {
        return {
          label: n,
          value: a - item.option.length + i,
          selected: false,
          odds: false
        };
      });
    });
    return arr;
  };

  switch (playid) {
    case 12: // 后三组六
    case 11:
    case 13:
    case 25:
    case 27:
    case 38:
    case 107:
    case 109:
    case 120:
      return severalRows.slice(0, 1);
    case 41: // 双面盘	数字盘
    case 57:
      return severalRows;
    case 131: // 牛牛
      return [
        {
          name: '牛牛',
          option: defaultFunc(niuniu)
        }
      ];
    case 129: // 龙虎斗
      return rowsLine(lhd);
    case 128: // 双面盘
      return rowsLine(template_smp);
    case 1: // 五星直选复式
    case 2:
      return severalRows;
    case 3: // 后四直选复式
    case 4:
    case 89:
      return severalRows.slice(1);
    case 5: // 后三直选复式
    case 7: // 后三组合
      return severalRows.slice(2);
    case 8: // 后三和值
    case 22: // 前三和值
    case 104:
      return heZhiRow;
    case 9: // 后三跨度
    case 23: // 前三跨度
    case 105:
    case 36: // 前二跨度
    case 118:
      return kuaduRow;
    case 10: // 组三复式
    case 24:
    case 106:
      return zusanRow;
    case 12: // 组六复式
    case 26:
    case 108:
      return zuliuRow;
    case 16: // 组选包胆
    case 30:
    case 40:
    case 112:
    case 122:
      return baodanRow;
    case 17: // 和值尾数
    case 31:
    case 113:
      return weishuRow;
    case 18: // 特殊号
    case 32:
    case 114:
      return rowsLine(teshuhao);
    case 19: // 前三直选复式
    case 20:
    case 21: // 前三组合
      return severalRows.slice(0, 3);
    case 33: // 前二复式
    case 34:
      return severalRows.slice(0, 2);
    case 35: // 前二直选和值
    case 117:
      return erHeZhiRow;
    case 37: // 前二组选复式
    case 119:
      return erZuxuanFushi;
    case 39: // 前二组选和值
    case 121:
      erHeZhiRow[0].option.pop();
      erHeZhiRow[0].option.shift();
      return erHeZhiRow;
    case 83: // 五星120
      return assemRowName('组选');
    case 84: // 五星60
    case 85:
    case 91:
    case 98:
      return [...assemRowName('二重号'), ...assemRowName('单号')];
    case 86:
      return [...assemRowName('三重号'), ...assemRowName('单号')];
    case 87:
      return [...assemRowName('三重号'), ...assemRowName('二重号')];
    case 88:
      return [...assemRowName('四重号'), ...assemRowName('单号')];
    case 90:
    case 97:
      return assemRowName('组选24');
    case 92:
    case 99:
      return assemRowName('二重号');
    case 93:
    case 100:
      return [...assemRowName('三重号'), ...assemRowName('单号')];
    case 94:
    case 95:
    case 96:
      return severalRows.slice(0, 4);
    case 101:
    case 102:
    case 103:
      return severalRows.slice(1, 4);
    case 115:
    case 116:
      return severalRows.slice(3);
    case 42:
      return assemRowName('前三一码');
    case 43:
      return assemRowName('前三二码');
    case 44:
      return assemRowName('后三一码');
    case 45:
      return assemRowName('后三二码');
    case 46:
      return assemRowName('前四一码');
    case 47:
      return assemRowName('前四二码');
    case 48:
      return assemRowName('后四一码');
    case 49:
      return assemRowName('后四二码');
    case 50:
      return assemRowName('五星一码');
    case 51:
      return assemRowName('五星二码');
    case 52:
      return assemRowName('五星三码');
  }
}

export default setBallList;
