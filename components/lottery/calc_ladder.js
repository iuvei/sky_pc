class LADDER_CALC {
  left_right(val) {
    return val * 1 === 0 ? "左" : "右";
  }
  three_four(val) {
    return val * 1 === 0 ? "3" : "4";
  }
  single_double(val) {
    return val * 1 === 0 ? "单" : "双";
  }
  all(balls) {
    if (Array.isArray(balls) && balls.length)
      return `${this.left_right(balls[0])} ${this.three_four(
        balls[1]
      )} ${this.single_double(balls[2])}`;
  }
}
export default new LADDER_CALC();
