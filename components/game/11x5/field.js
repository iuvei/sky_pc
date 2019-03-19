function setBallList({ playid, content }) {
  content = content ? content.split('+') : [];
  // console.error(playid, content)
  const defaultArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
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
      name: '一位、二位',
      option: ['龙', '虎']
    },
    {
      name: '一位、三位',
      option: ['龙', '虎']
    },
    {
      name: '一位、四位',
      option: ['龙', '虎']
    },
    {
      name: '一位、五位',
      option: ['龙', '虎']
    },
    {
      name: '二位、三位',
      option: ['龙', '虎']
    },
    {
      name: '二位、四位',
      option: ['龙', '虎']
    },
    {
      name: '二位、五位',
      option: ['龙', '虎']
    },
    {
      name: '三位、四位',
      option: ['龙', '虎']
    },
    {
      name: '三位、五位',
      option: ['龙', '虎']
    },
    {
      name: '四位、五位',
      option: ['龙', '虎']
    }
  ];
  const smp = [
    {
      name: '总和值',
      option: ['大', '小', '单', '双', '尾大', '尾小']
    },
    {
      name: '后二和值',
      option: ['大', '小', '单', '双']
    },
    {
      name: '号码一',
      option: ['大', '小', '单', '双']
    },
    {
      name: '号码二',
      option: ['大', '小', '单', '双']
    },
    {
      name: '号码三',
      option: ['大', '小', '单', '双']
    },
    {
      name: '号码四',
      option: ['大', '小', '单', '双']
    },
    {
      name: '号码五',
      option: ['大', '小', '单', '双']
    }
  ];
  const smp1 = ['大', '小', '单', '双', '龙', '虎'];
  const smp2 = ['大', '小', '单', '双'];

  const arr3 = ['第一位', '第二位', '第三位'];
  const arr2_1 = ['第一位', '第二位'];
  const arr2_2 = ['第四位', '第五位'];

  const rowsLine = arr => {
    let value = 0;
    arr.forEach((item, index) => {
      item.option = item.option.map((n, i) => {
        return {
          label: n,
          value: value++,
          selected: false,
          odds: false
        };
      });
    });
    return arr;
  };
  const toObjFunc = arr => {
    arr.forEach((item, index) => {
      item.option = item.option.map((n, i) => {
        return {
          label: n,
          value: index * item.option.length + i,
          selected: false,
          odds: false
        };
      });
    });
    return arr;
  };

  switch (playid) {
    case 54: // 龙虎斗
      return toObjFunc(lhd);
      break;
    case 56: // 双面盘
      return rowsLine(smp);
      break;
    case 57: // 牛牛
      return [
        {
          name: '牛牛',
          option: defaultFunc(niuniu, 0)
        }
      ];
      breal;
    default:
      if ([2, 7, 12].includes(playid)) content = arr3; // 三码
      if ([17].includes(playid)) content = arr2_1; // 二码
      if ([22].includes(playid)) content = arr2_2; // 二码
      if ([4, 9, 14, 19, 24].includes(playid)) content = ['组选单式']; // 组选单式
      if ([38, 39, 40, 41, 42, 43, 44].includes(playid)) content = ['号码']; // 任选单式
      const data = content.map(x => {
        return {
          name: x,
          option: defaultFunc(defaultArr, 1)
        };
      });
      return data;
      break;
  }
}

export default setBallList;
