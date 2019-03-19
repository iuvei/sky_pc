class PKNIUNIU_CALC {
  constructor() {
    this.niu = [
      "无牛",
      "牛一",
      "牛二",
      "牛三",
      "牛四",
      "牛五",
      "牛六",
      "牛七",
      "牛八",
      "牛九",
      "牛牛"
    ];
  }
  // 牛牛算法
  result(arr) {
    // console.log(arr)
    let _arr = arr;
    for (let i = 0; i < _arr.length - 2; i++) {
      for (let j = i + 1; j < _arr.length - 1; j++) {
        for (let k = j + 1; k < _arr.length; k++) {
          if ((_arr[i] + _arr[j] + _arr[k]) % 10 == 0) {
            _arr.splice(k, 1);
            _arr.splice(j, 1);
            _arr.splice(i, 1);
            for (let n = 0; n < _arr.length; n++) {
              if ((_arr[0] + _arr[1]) % 10 == 0) {
                // console.log('牛牛')
                return 10;
              } else {
                // console.log('牛'+(_arr[0]+_arr[1])%10)
                return (_arr[0] + _arr[1]) % 10;
              }
            }
          }
        }
      }
    }
    return 0;
  }
  // 牛牛
  niuniu(balls, n) {
    const data = balls;
    if (data && data.length) {
      let _data = data.slice(n, n + 5);
      return this.niu[this.result(_data)];
    }
    return "";
  }
}
export default new PKNIUNIU_CALC();
