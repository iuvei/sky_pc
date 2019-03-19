// pcdd号码转颜色
function pcddColor(_ball) {
  switch (parseInt(_ball)) {
    case 3:
    case 6:
    case 9:
    case 12:
    case 15:
    case 18:
    case 21:
    case 24:
      return '#e33939';
    case 2:
    case 5:
    case 8:
    case 11:
    case 17:
    case 20:
    case 23:
    case 26:
      return '#00a0e9';
    case 0:
    case 13:
    case 14:
    case 27:
      return '#707070';
    default:
      return '#32b16c';
  }
}
// pk10颜色
function pk10Color(_ball) {
  switch (parseInt(_ball)) {
    case 1:
      return '#e5e500';
    case 2:
      return '#2a64ae';
    case 3:
      return '#949695';
    case 4:
      return '#f29535';
    case 5:
      return '#7dcbdf';
    case 6:
      return '#2c489c';
    case 7:
      return '#cbcbcb';
    case 8:
      return '#e83338';
    case 9:
      return '#421e20';
    case 10:
      return '#4fb233';
  }
}
// lhc颜色
function lhcColor(_ball) {
  let rule = {
    red: [
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
    ],
    blue: [
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
    ],
    green: [
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
  };
  return Object.keys(rule).find(cl => {
    return rule[cl].find(v => v === _ball);
  });
}
export { pcddColor, pk10Color, lhcColor };
