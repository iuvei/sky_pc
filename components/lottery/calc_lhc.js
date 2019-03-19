import {
  BallToColorpcdd,
  BallToColor2,
  BallToColor,
  BallToWuXing,
  BallToHeiBai,
  BallToTianDi,
  BallToNanNv,
  BallToDanShuang,
  BallToBi,
  BallToYinYang,
  BallToQinShou,
  BallToJiXiong,
  BallsToDaXiao,
  ballToShengxiao
} from './xglhc.2017';

class LHC_CALC {
  zm(balls) {
    // if(!this.isLhc) return ""
    if (balls.length > 5) {
      return [balls[0], balls[1], balls[2], balls[3], balls[4], balls[5]].join(
        ' '
      );
    }
    return '';
  }
  tm(balls) {
    //特码
    // if(!this.isLhc) return ""
    return balls[balls.length - 1];
  }
  tmds(balls) {
    return this.tm(balls) % 2 === 0 ? '双' : '单' || '';
  }
  bs(balls) {
    // 波色
    return `${BallToColor(this.tm(balls))}波` || '';
  }
  sx(ball, yearid) {
    // 生肖
    // return ballToShengxiao(balls, yearid) || '';
    return ballToShengxiao(ball, yearid);
  }
  sxFromBalls(balls) {
    return ballToShengxiao(this.tm(balls)) || '';
  }
  tmdx(balls) {
    // 特码大小
    return (this.tm(balls) && this.tm(balls) < 25 ? '小' : '大') || '';
  }
  wx(balls) {
    return BallToWuXing(this.tm(balls)) || '';
  }
  // 家野
  jy(balls) {
    return BallToQinShou(this.tm(balls)) || '';
  }
  // 阴阳
  yy(balls) {
    return BallToYinYang(this.tm(balls)) || '';
  }
  // 天地
  td(balls) {
    return (this.tm && BallToTianDi(this.tm(balls))) || '';
  }
  // 吉凶
  jx(balls) {
    return (this.tm && BallToJiXiong(this.tm(balls))) || '';
  }
  // 黑白
  hb(balls) {
    return BallToHeiBai(this.tm(balls)) || '';
  }
  // 男女
  nn(balls) {
    return BallToNanNv(this.tm(balls)) || '';
  }
  // 笔画
  bh(balls) {
    return BallToBi(this.tm(balls)) || '';
  }
  // 总和单双
  zhds(balls) {
    const ballSum = balls.reduce((a, b) => a * 1 + b * 1);
    return BallToDanShuang(ballSum) || '';
    // return BallToDanShuang(this.tm(balls)) || '';
  }
}
export default new LHC_CALC();
