export default [
  {
    name: '特码包三',
    playId: 2,
    option: new Array(28).fill(1).map((v, k) => ({
      label: k,
      value: k,
      odds: false,
      money: ''
    }))
  },
  {
    name: '特码',
    playId: 1,
    option: new Array(28).fill(1).map((v, k) => ({
      label: k,
      value: k,
      odds: '-',
      money: ''
    }))
  },

  {
    name: '混合',
    playId: 3,
    option: [
      '大',
      '小',
      '单',
      '双',
      '大单',
      '小单',
      '大双',
      '小双',
      '极大',
      '极小'
    ].map((v, k) => ({
      label: v,
      value: k,
      odds: '-',
      money: ''
    }))
  },
  {
    name: '混合',
    playId: 3,
    option: ['红波', '绿波', '蓝波'].map((v, k) => ({
      label: v,
      value: 10 + k,
      odds: '-',
      money: ''
    }))
  },
  {
    name: '混合',
    playId: 3,
    option: [
      {
        label: '豹子',
        value: 13,
        odds: '-',
        money: ''
      }
    ]
  }
]
