function getField(playid, labels) {
  labels = labels
    ? Array.isArray(labels)
      ? labels
      : labels.length
        ? labels.split('')
        : []
    : null;

  const defaultArr = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10'
  ];

  const smp1 = ['大', '小', '单', '双', '龙', '虎'];
  const smp2 = ['大', '小', '单', '双'];

  const defaultFunc = (arr = defaultArr, values = []) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: values && values.length ? values[index] : index + 1,
        selected: false,
        odds: false
      };
    });
  };

  const smpFunc = (arr = defaultArr) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: index,
        selected: false,
        odds: false
      };
    });
  };

  switch (playid) {
    case 1: //直选复式	前一直选
      return [
        {
          name: (labels && labels[0]) || '冠军',
          option: defaultFunc()
        }
      ];
    case 2:
    case 3:
      //直选复式	前二直选复式
      return [
        {
          name: (labels && labels[0]) || '冠军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[1]) || '亚军',
          option: defaultFunc()
        }
      ];
    case 4:
    case 5:
      return [
        {
          name: (labels && labels[0]) || '冠军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[1]) || '亚军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[2]) || '季军',
          option: defaultFunc()
        }
      ];
    case 6: //定位胆
    case 15: //数字盘
      return [
        {
          name: (labels && labels[0]) || '冠军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[1]) || '亚军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[2]) || '季军',
          option: defaultFunc()
        },
        {
          name: (labels && labels[3]) || '第四名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[4]) || '第五名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[5]) || '第六名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[6]) || '第七名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[7]) || '第八名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[8]) || '第九名',
          option: defaultFunc()
        },
        {
          name: (labels && labels[9]) || '第十名',
          option: defaultFunc()
        }
      ];
    case 14: //双面盘
      return [
        {
          name: (labels && labels[0]) || '冠军',
          option: smpFunc(smp1)
        },
        {
          name: (labels && labels[1]) || '亚军',
          option: smpFunc(smp1)
        },
        {
          name: (labels && labels[2]) || '季军',
          option: smpFunc(smp1)
        },
        {
          name: (labels && labels[3]) || '第四名',
          option: smpFunc(smp1)
        },
        {
          name: (labels && labels[4]) || '第五名',
          option: smpFunc(smp1)
        },
        {
          name: (labels && labels[5]) || '第六名',
          option: smpFunc(smp2)
        },
        {
          name: (labels && labels[6]) || '第七名',
          option: smpFunc(smp2)
        },
        {
          name: (labels && labels[7]) || '第八名',
          option: smpFunc(smp2)
        },
        {
          name: (labels && labels[8]) || '第九名',
          option: smpFunc(smp2)
        },
        {
          name: (labels && labels[9]) || '第十名',
          option: smpFunc(smp2)
        }
      ];
      break;
    case 7: //	冠亚和
      return [
        {
          name: (labels && labels[0]) || '冠亚和',
          option: defaultFunc(
            [
              '大',
              '小',
              '单',
              '双',
              '中',
              '和',
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ],
            [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22
            ]
          )
        }
      ];
  }
}

const gyh_sortby = [
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  '大',
  '小',
  '单',
  '双',
  '中',
  '和'
];
function sortBallList(playid, dataSource) {
  let _arr = [];
  if (playid === 7) {
    const sortBy = gyh_sortby;
    sortBy.forEach(x => {
      _arr.push(dataSource[0].option.find(y => y.label + '' === x + ''));
    });
    dataSource[0].option = _arr;
  }

  return dataSource;
}

export { getField, sortBallList };
