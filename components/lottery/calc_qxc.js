class QXC_CALC {
  state(val) {
    let a, b;
    val > 4 ? (a = "大") : (a = "小");
    val % 2 == 0 ? (b = "双") : (b = "单");
    return a + b;
  }
  getSum(val) {
    if (val.length) {
      return val[0] * 1 + val[1] * 1 + val[2] * 1 + val[3] * 1;
    }
    return 0;
  }
  state_big_small(val) {
    val = this.getSum(val);
    if (val) return val > 17 ? "大" : "小";
    return "";
  }
  state_single_double(val) {
    val = this.getSum(val);
    if (val) return val % 2 === 0 ? "双" : "单";
    return "";
  }
}
export default new QXC_CALC();
