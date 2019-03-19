class XYNC_CALC {
  // 总和
  sum(arr) {
    // if (typeof arr === "string" && arr.includes("+")) {
    //   arr = arr.split("+");
    // }
    let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
    if (isNaN(s) || s === 0) return "-";
    return s;
  }
  // 总和大小
  total_size(arr) {
    // if (typeof arr === "string" && arr.includes("+")) {
    //   arr = arr.split("+");
    // }
    let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
    if (isNaN(s) || s === 0) return "-";
    return s > 84 ? "大" : "小";
  }
  // 总和单双
  singleDouble(arr) {
    // if (typeof arr === "string" && arr.includes("+")) {
    //   arr = arr.split("+");
    // }
    let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
    if (isNaN(s) || s === 0) return "-";
    return s % 2 === 0 ? "双" : "单";
  }
  // 总和尾大小
  wei_size(arr) {
    // if (typeof arr === "string" && arr.includes("+")) {
    //   arr = arr.split("+");
    // }
    let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
    if (isNaN(s) || s === 0) return "-";
    s += "";
    return s[s.length - 1] > 4 ? "尾大" : "尾小";
  }
  // 龙虎
  dragonTriger(arr) {
    // if (typeof arr === "string" && arr.includes("+")) {
    //   arr = arr.split("+");
    // }
    if (!arr[0] || !arr[7]) return "-";
    return arr[0] - arr[7] > 0 ? "龙" : "虎";
  }
  // 输出字符串
  all(arr) {
    if (Array.isArray(arr) && arr.length)
      return `${this.sum(arr)} ${this.total_size(arr)} ${this.singleDouble(
        arr
      )} ${this.wei_size(arr)} ${this.dragonTriger(arr)}`;
    return "";
  }
}
export default new XYNC_CALC();
