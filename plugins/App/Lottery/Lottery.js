import LotteryPcdd from "./LotteryPcdd";
import LotteryPk10 from "./LotteryPk10";
import LotteryLhc from "./LotteryLhc";
import LotteryK3 from "./LotteryK3";
import LotteryBall from "./LotteryBall";
import LotteryXypk from "./LotteryXypk";
import LotteryXync from "./LotteryXync"
import LotteryLadder from "./LotteryLadder"

export default {
  name: 'AppLotteryNum',
  props: ['number', 'type', 'showZero', 'qishu'],
  render(h) {
    switch (this.type) {
      case 'pcdd':
        return <LotteryPcdd class="pcdd-balls" number={this.number} />;
        break;
      case 'pk10':
        return (
          <LotteryPk10
            class="pk10-balls"
            number={this.number}
            showZero={this.showZero}
          />
        );
        break;
      case 'lhc':
        return <LotteryLhc class="lhc-balls" number={this.number} qishu={this.qishu}/>;
        break;
      case 'k3':
        return <LotteryK3 class="k3-balls" number={this.number} />;
        break;
      case "xypk":
        return  <LotteryXypk class="puke-balls" number={this.number}></LotteryXypk>;
        break;
      case "pkniuniu":
        return (
          <LotteryPk10
            class="pk10-balls"
            number={this.number}
            showZero={this.showZero}
          />
        );
        break;
      case "xync":
        return <LotteryXync class="farm-balls" number={this.number}></LotteryXync>
        break;
      case "tzyx":
        return <LotteryLadder class="ladder-balls" number={this.number}></LotteryLadder>
        break;
      default:
        return <LotteryBall class="default" number={this.number} />;
        break;
    }
  }
};
