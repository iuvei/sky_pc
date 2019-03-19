class XYPK_CALC {
  // 幸运扑克——形态
  state(ballsArr) {
    // if (this.game.js_tag !== "xypk") return "";
    // const ballsArr = this.balls;
    let ballStatus = ""; //开奖后的状态
    let dxArr = []; //扑克解析大小数组
    let hsArr = []; //解析后花色数组
    // 扑克状态:  同花顺->豹子->同花->顺子->对子->单张

    if (Array.isArray(ballsArr) && ballsArr.length == 3) {
      for (let i = 0; i < ballsArr.length; i++) {
        let balls = parseInt(ballsArr[i], 10);
        let dx = parseInt(balls / 4 + 1);
        let color = balls % 4;
        dxArr.push(dx);
        hsArr.push(color);
      }
      dxArr.sort(function(a, b) {
        return a - b;
      });
      hsArr.sort(function(a, b) {
        return a - b;
      });
      //同花顺
      if (
        ((1 == dxArr[0] * 1 && 12 == dxArr[1] * 1 && 13 == dxArr[2] * 1) ||
          (dxArr[0] + 1 == dxArr[1] && dxArr[1] + 1 == dxArr[2])) &&
        (hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2])
      ) {
        ballStatus = "同花顺";
        return ballStatus;
      }
      //豹子
      else if (dxArr[0] == dxArr[1] && dxArr[0] == dxArr[2]) {
        ballStatus = "豹子";
        return ballStatus;
      }
      //同花
      else if (hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2]) {
        ballStatus = "同花";
        return ballStatus;
      }
      //QKA顺子或普通顺子
      else if (
        (1 == dxArr[0] * 1 && 12 == dxArr[1] * 1 && 13 == dxArr[2] * 1) ||
        (dxArr[0] + 1 == dxArr[1] && dxArr[1] + 1 == dxArr[2])
      ) {
        ballStatus = "顺子";
        return ballStatus;
      }

      //对子
      else if (
        dxArr[0] == dxArr[1] ||
        dxArr[1] == dxArr[2] ||
        dxArr[0] == dxArr[2]
      ) {
        ballStatus = "对子";
      } else {
        ballStatus = "单张";
      }

      return ballStatus;
    } else {
      return "";
    }
  }
}
export default new XYPK_CALC();
