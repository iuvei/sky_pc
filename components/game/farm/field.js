function setBallList(playid) {
  // 双面盘 下注标签名
  const labels_1 = [
    '总和大',
    '总和小',
    '总和单',
    '总和双',
    '总和尾大',
    '总和尾小',
    '龙',
    '虎'
  ]
  const labels_2 = ['大', '小', '单', '双', '尾大', '尾小', '合数单', '合数双']
  // 第1-8球 下注标签名
  const labels_3 = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '大',
    '小',
    '单',
    '双',
    '尾大',
    '尾小',
    '合数单',
    '合数双',
    '东',
    '南',
    '西',
    '北',
    '中',
    '发',
    '白'
  ]

  // 下注主体结构
  let mainStructure = {
    1: [{
        name: '总和',
        option: [{
          name: '总和大',
          selected: false,
          value: 0
        }]
      },
      {
        name: '第一球',
        option: []
      },
      {
        name: '第二球',
        option: []
      },
      {
        name: '第三球',
        option: []
      },
      {
        name: '第四球',
        option: []
      },
      {
        name: '第五球',
        option: []
      },
      {
        name: '第六球',
        option: []
      },
      {
        name: '第七球',
        option: []
      },
      {
        name: '第八球',
        option: []
      }
    ],
    2: [{
      name: '第一球',
      option: []
    }],
    3: [{
      name: '第二球',
      option: []
    }],
    4: [{
      name: '第三球',
      option: []
    }],
    5: [{
      name: '第四球',
      option: []
    }],
    6: [{
      name: '第五球',
      option: []
    }],
    7: [{
      name: '第六球',
      option: []
    }],
    8: [{
      name: '第七球',
      option: []
    }],
    9: [{
      name: '第八球',
      option: []
    }]
  }

  function initBetTxt() {
    Object.keys(mainStructure).map(pid => {
      mainStructure[pid].map(page => {
        let data = page.name === '总和' ? labels_1 : labels_2
        if (pid !== '1') {
          data = labels_3
        }
        let uid = 0
        page.option = data.map(option => {
          return {
            label: option,
            selected: false,
            value: uid++,
            money: ''
          }
        })
      })
    })
  }
  initBetTxt()
  return mainStructure[playid]

}

export default setBallList;
