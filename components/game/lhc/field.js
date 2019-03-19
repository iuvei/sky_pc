// 牛 2 虎3 兔四 龙5 蛇6 马7 羊8 猴9 鸡10 狗11 猪12
var shegnxiaoVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let shengxiaoArr;
var sort_shengxiao = [
  '鼠',
  '虎',
  '龙',
  '马',
  '猴',
  '狗',
  '牛',
  '兔',
  '蛇',
  '羊',
  '鸡',
  '猪'
];
const resShengxiao = shidx => {
  // 这个如果之前10期20期还有2018年的数据下面的代码就不要放开了
  // if (shengxiaoArr) {
  //   return shengxiaoArr;
  // }
  const default_shengxiao = {
    ba_0: { name: '鼠', idx: 0, balls: [] },
    ba_1: { name: '牛', idx: 1, balls: [] },
    ba_2: { name: '虎', idx: 2, balls: [] },
    ba_3: { name: '兔', idx: 3, balls: [] },
    ba_4: { name: '龙', idx: 4, balls: [] },
    ba_5: { name: '蛇', idx: 5, balls: [] },
    ba_6: { name: '马', idx: 6, balls: [] },
    ba_7: { name: '羊', idx: 7, balls: [] },
    ba_8: { name: '猴', idx: 8, balls: [] },
    ba_9: { name: '鸡', idx: 9, balls: [] },
    ba_10: { name: '狗', idx: 10, balls: [] },
    ba_11: { name: '猪', idx: 11, balls: [] }
  };
  for (const k in default_shengxiao) {
    let start_balls = shidx - default_shengxiao[k].idx + 1; // 计算生肖位置开始号码
    if (start_balls < 0) {
      start_balls = 12 + start_balls;
    }
    // 输出生肖对应的号码
    for (let i = start_balls; i < 50; i += 12) {
      if (i === 0) {
        continue;
      }
      const theball = i > 9 ? i + '' : '0' + i;
      default_shengxiao[k].balls.push(theball);
    }
  }
  shengxiaoArr = {};
  for (const i in default_shengxiao) {
    shengxiaoArr[default_shengxiao[i].name] = default_shengxiao[i].balls;
  }
  return shengxiaoArr;
};
var weishu = {};
weishu['0尾'] = ['10', '20', '30', '40'];
weishu['1尾'] = ['01', '11', '21', '31', '41'];
weishu['2尾'] = ['02', '12', '22', '32', '42'];
weishu['3尾'] = ['03', '13', '23', '33', '43'];
weishu['4尾'] = ['04', '14', '24', '34', '44'];
weishu['5尾'] = ['05', '15', '25', '35', '45'];
weishu['6尾'] = ['06', '16', '26', '36', '46'];
weishu['7尾'] = ['07', '17', '27', '37', '47'];
weishu['8尾'] = ['08', '18', '28', '38', '48'];
weishu['9尾'] = ['09', '19', '29', '39', '49'];

var zongxiao = ['2肖', '3肖', '4肖', '5肖', '6肖', '7肖', '总肖单', '总肖双'];

// 红蓝绿波
export const default_color = {
  red: {
    name: '红波',
    color: 'red',
    val: 0,
    balls: [
      '01',
      '02',
      '07',
      '08',
      '12',
      '13',
      '18',
      '19',
      '23',
      '24',
      '29',
      '30',
      '34',
      '35',
      '40',
      '45',
      '46'
    ]
  },
  blue: {
    name: '蓝波',
    color: 'blue',
    val: 1,
    balls: [
      '03',
      '04',
      '09',
      '10',
      '14',
      '15',
      '20',
      '25',
      '26',
      '31',
      '36',
      '37',
      '41',
      '42',
      '47',
      '48'
    ]
  },
  green: {
    name: '绿波',
    color: 'green',
    val: 2,
    balls: [
      '05',
      '06',
      '11',
      '16',
      '17',
      '21',
      '22',
      '27',
      '28',
      '32',
      '33',
      '38',
      '39',
      '43',
      '44',
      '49'
    ]
  }
};

export function setBallList(playid, labels, yearid) {
  labels = labels
    ? Array.isArray(labels)
      ? labels
      : labels.length
      ? labels.split('')
      : []
    : null;
  const shengxiao = resShengxiao(yearid);
  const defaultArr = Array.from({ length: 49 }, (v, i) =>
    (i + 1).toString().padStart(2, '0')
  );

  const defaultFunc = (arr = defaultArr, nums = [], startWithZero = false) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: startWithZero ? index : index + 1,
        selected: false,
        odds: false,
        money: '',
        numbers: nums.length ? nums[index] : []
      };
    });
  };

  const sxFunc = (arr = defaultArr, nums = [], values = []) => {
    return arr.map((item, index) => {
      return {
        label: item,
        value: values[index],
        selected: false,
        odds: false,
        money: '',
        numbers: nums.length ? nums[index] : []
      };
    });
  };

  const arrFunc = (arr = new Array(49)) => {
    return arr.map(item => {
      return {
        label: item.toString().padStart(2, '0'),
        value: item + 1,
        selected: false,
        odds: false,
        money: ''
      };
    });
  };

  switch (playid) {
    case 1: //特码A
      return [
        {
          name: (labels && labels[0]) || '特码A',
          option: defaultFunc()
        }
      ];
    case 2: //特两面
      return [
        {
          name: (labels && labels[0]) || '特两面',
          option: defaultFunc(
            [
              '特大',
              '特双',
              '特小单',
              '特地肖',
              '特小',
              '特大单',
              '特小双',
              '特前肖',
              '特大尾',
              '特大双',
              '特合单',
              '特后肖',
              '特小尾',
              '特合大',
              '特合双',
              '特家肖',
              '特单',
              '特合小',
              '特天肖',
              '特野肖'
            ],
            [],
            true
          )
        }
      ];
    case 3: //特色波
      return [
        {
          name: (labels && labels[0]) || '特色波',
          option: defaultFunc(
            [
              default_color.red.name,
              default_color.blue.name,
              default_color.green.name
            ],
            [
              default_color.red.balls,
              default_color.blue.balls,
              default_color.green.balls
            ],
            true
          )
        }
      ];
    case 4: //特半波
      return [
        {
          name: (labels && labels[0]) || '特色波',
          option: defaultFunc(
            [
              '红大',
              '红小',
              '红单',
              '红双',
              '蓝大',
              '蓝小',
              '蓝单',
              '蓝双',
              '绿大',
              '绿小',
              '绿单',
              '绿双'
            ],
            [
              ['#e93248', '29', '30', '34', '35', '40', '45', '46'],
              [
                '#e93248',
                '01',
                '02',
                '07',
                '08',
                '12',
                '13',
                '18',
                '19',
                '23',
                '24'
              ],
              ['#e93248', '01', '07', '13', '19', '23', '29', '35', '45'],
              ['#e93248', '02', '08', '12', '18', '24', '30', '34', '40', '46'],
              [
                'rgb(81, 171, 240)',
                '25',
                '26',
                '31',
                '36',
                '37',
                '41',
                '42',
                '47',
                '48'
              ],
              ['rgb(81, 171, 240)', '03', '04', '09', '10', '14', '15', '20'],
              [
                'rgb(81, 171, 240)',
                '03',
                '09',
                '15',
                '25',
                '31',
                '37',
                '41',
                '47'
              ],
              [
                'rgb(81, 171, 240)',
                '04',
                '10',
                '14',
                '20',
                '26',
                '36',
                '42',
                '48'
              ],
              [
                'rgb(106, 204, 123)',
                '27',
                '28',
                '32',
                '33',
                '38',
                '39',
                '43',
                '44'
              ],
              ['rgb(106, 204, 123)', '05', '06', '11', '16', '17', '21', '22'],
              [
                'rgb(106, 204, 123)',
                '05',
                '11',
                '17',
                '21',
                '27',
                '33',
                '39',
                '43'
              ],
              ['rgb(106, 204, 123)', '06', '16', '22', '28', '32', '38', '44']
            ],
            true
          )
        }
      ];
    case 5: // 特头尾数
      return [
        {
          name: (labels && labels[0]) || '特头尾数',
          option: defaultFunc(
            [
              '0头',
              '1头',
              '2头',
              '3头',
              '4头',
              '1尾',
              '2尾',
              '3尾',
              '4尾',
              '5尾',
              '6尾',
              '7尾',
              '8尾',
              '9尾',
              '0尾'
            ],
            [],
            true
          )
        }
      ];
    case 6: // 特半半波
      return [
        {
          name: (labels && labels[0]) || '特半半波',
          option: defaultFunc(
            [
              '红大单',
              '红小单',
              '红大双',
              '红小双',
              '蓝大单',
              '蓝小单',
              '蓝大双',
              '蓝小双',
              '绿大单',
              '绿小单',
              '绿大双',
              '绿小双'
            ],
            [
              ['#e93248', '29', '35', '45'],
              ['#e93248', '01', '07', '13', '19', '23'],
              ['#e93248', '30', '34', '40', '46'],
              ['#e93248', '02', '08', '12', '18', '24'],
              ['rgb(81, 171, 240)', '25', '31', '37', '41', '47'],
              ['rgb(81, 171, 240)', '03', '09', '15'],
              ['rgb(81, 171, 240)', '26', '36', '42', '48'],
              ['rgb(81, 171, 240)', '04', '10', '14', '20'],
              ['rgb(106, 204, 123)', '27', '33', '39', '43'],
              ['rgb(106, 204, 123)', '05', '11', '17', '21'],
              ['rgb(106, 204, 123)', '28', '32', '38', '44'],
              ['rgb(106, 204, 123)', '06', '16', '22']
            ],
            [],
            true
          )
        }
      ];
    case 7: //特肖
      return [
        {
          name: (labels && labels[0]) || '特肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 8: //合肖
      return [
        {
          name: (labels && labels[0]) || '合肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 9: //五行
      return [
        {
          name: (labels && labels[0]) || '五行',
          option: defaultFunc(
            ['金', '木', '水', '火', '土'],
            [
              ['#e93248', '05', '06', 19, 20, 27, 28, 35, 36, 49],
              ['#e93248', '01', '02', '09', 10, 17, 18, 31, 32, 39, 40, 47, 48],
              ['#e93248', '07', '08', 15, 16, 23, 24, 37, 38, 45, 46],
              ['#e93248', '03', '04', 11, 12, 25, 26, 33, 34, 41, 42],
              ['#e93248', 13, 14, 21, 22, 29, 30, 43, 44]
            ]
          )
        }
      ];
    case 10: //正码混选
      return [
        {
          name: (labels && labels[0]) || '正码混选',
          option: defaultFunc()
        }
      ];
    case 11: //正码一
      return [
        {
          name: (labels && labels[0]) || '正码一',
          option: defaultFunc()
        }
      ];
    case 12: //正码二
      return [
        {
          name: (labels && labels[0]) || '正码二',
          option: defaultFunc()
        }
      ];
    case 13: //正码三
      return [
        {
          name: (labels && labels[0]) || '正码三',
          option: defaultFunc()
        }
      ];
    case 14: //正码四
      return [
        {
          name: (labels && labels[0]) || '正码四',
          option: defaultFunc()
        }
      ];
    case 15: //正码五
      return [
        {
          name: (labels && labels[0]) || '正码五',
          option: defaultFunc()
        }
      ];
    case 16: //正码六
      return [
        {
          name: (labels && labels[0]) || '正码六',
          option: defaultFunc()
        }
      ];
    case 17: //平特一肖
      return [
        {
          name: (labels && labels[0]) || '平特一肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 18: //平特尾数
      return [
        {
          name: (labels && labels[0]) || '平特尾数',
          option: defaultFunc(Object.keys(weishu), Object.values(weishu), true)
        }
      ];
    case 19: //七色波
      return [
        {
          name: (labels && labels[0]) || '七色波',
          option: defaultFunc(['红波', '蓝波', '绿波', '和局'], [], true)
        }
      ];
    case 20: //总肖
      return [
        {
          name: (labels && labels[0]) || '总肖',
          option: defaultFunc(zongxiao, [], true)
        }
      ];
    case 21: //自选不中
      return [
        {
          name: (labels && labels[0]) || '自选不中',
          option: defaultFunc()
        }
      ];
    case 22: //二连肖
      return [
        {
          name: (labels && labels[0]) || '二连肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 23: //三连肖
      return [
        {
          name: (labels && labels[0]) || '三连肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 24: //四连肖
      return [
        {
          name: (labels && labels[0]) || '四连肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];
    case 25: //五连肖
      return [
        {
          name: (labels && labels[0]) || '五连肖',
          option: sxFunc(
            Object.keys(shengxiao),
            Object.values(shengxiao),
            shegnxiaoVals
          )
        }
      ];

    case 26: //二连尾
      return [
        {
          name: (labels && labels[0]) || '二连尾',
          option: defaultFunc(Object.keys(weishu), Object.values(weishu), true)
        }
      ];
    case 27: //三连尾
      return [
        {
          name: (labels && labels[0]) || '三连尾',
          option: defaultFunc(Object.keys(weishu), Object.values(weishu), true)
        }
      ];
    case 28: //四连尾
      return [
        {
          name: (labels && labels[0]) || '四连尾',
          option: defaultFunc(Object.keys(weishu), Object.values(weishu), true)
        }
      ];
    case 29: //五连尾
      return [
        {
          name: (labels && labels[0]) || '五连尾',
          option: defaultFunc(Object.keys(weishu), Object.values(weishu), true)
        }
      ];
    case 30: // 三中二/三
      return [
        {
          name: (labels && labels[0]) || '三中二/三',
          option: defaultFunc()
        }
      ];
    case 31: // 三全中
      return [
        {
          name: (labels && labels[0]) || '三全中',
          option: defaultFunc()
        }
      ];
    case 32: // 二全中
      return [
        {
          name: (labels && labels[0]) || '二全中',
          option: defaultFunc()
        }
      ];
    case 33: // 二中特
      return [
        {
          name: (labels && labels[0]) || '二中特',
          option: defaultFunc()
        }
      ];
    case 34: // 特串
      return [
        {
          name: (labels && labels[0]) || '特串',
          option: defaultFunc()
        }
      ];
    case 35: // 四全中
      return [
        {
          name: (labels && labels[0]) || '四全中',
          option: defaultFunc()
        }
      ];
    case 36: // 特码B
      return [
        {
          name: (labels && labels[0]) || '特码B',
          option: defaultFunc()
        }
      ];
  }
}

export function getShengxiaoByNum(num, yearid) {
  const shengxiao = resShengxiao(yearid);
  // console.log(shengxiao, yearid);
  return Object.keys(shengxiao).find(x => shengxiao[x].includes(num)) || '';
}
