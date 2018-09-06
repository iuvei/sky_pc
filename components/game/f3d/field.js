function setBallList(playid, labels) {
  labels = labels ?
    Array.isArray(labels) ?
    labels :
    labels.length ?
    labels.split("") :
    [] :
    null;
    /******** 基础数据准备 **********/
  const productNum = (max) => {
    let arr = [], startNum = 0
    max += 1
    while(max--) {
      arr.push(startNum++)
    }
    return arr
  }
  const assemRowName = (name) => {
    return [{
      name,
      option: defaultFunc()
    }]
  }
  const defaultArr = productNum(9)
  const heZhiArr = productNum(27)
  const erHeZhiArr = productNum(18)
  const defaultFunc = (arr = defaultArr, type) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: type ? item : index,
        selected: false,
        odds: false
      };
    });
  };
  /******* 渲染界面的数据 ********/
  const severalRows = [
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
    },
  ]
  const lhd = [
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
  ]
  const template_smp = [
    {
      name: '总和值',
      option: ['大', '小', '单', '双', '尾大', '尾小']
    },
    {
      name: '后二和值',
      option: ['大', '小', '单', '双', '中']
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
  ]
  const rowsLine = (arr) => {
    let ballCount = 0
    arr.forEach((item, index) => {
      ballCount += item.option.length
      item.option = item.option.map((n, i) => {
        return {
          label: n,
          value: ballCount - item.option.length + i,
          selected: false,
          odds: false
        }
      })
    });
    return arr
  }

  switch (playid) {
    case 1:
    case 2:
      return severalRows
    case 3:
      return [{
        name: '和值',
        option: defaultFunc(heZhiArr, 1)
      }]
    case 4:
      return assemRowName('组三')
    case 5:
      return assemRowName('组六')
    case 6:
      heZhiArr.pop()
      heZhiArr.shift()
      return [{
        name: '和值',
        option: defaultFunc(heZhiArr, 1)
      }]
    case 7:
      return [{
        name: '和值',
        option: defaultFunc(heZhiArr.slice(3, 25), 1)
      }]
    case 8:
      return severalRows.slice(0, 2)
    case 9:
      return severalRows.slice(1)
    case 10:
    case 11:
      return assemRowName('组选')
    case 12:
      return severalRows
    case 13:
      return assemRowName('一码')
    case 14:
      return assemRowName('二码')
    case 26:
      return rowsLine(template_smp)
    case 27:
      return rowsLine(lhd)
  }
}

export default setBallList;
