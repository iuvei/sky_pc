<template>
  <div class="bet-main lhc">
    <div class="special" v-if="betSelectSet && betSelectSet.length && isNormal">
      <div class="title">
        <span>{{betSelectSet[0].name}}</span>
      </div>
      <div class="head" :class="columns">
        <div class="tr" v-for='key in colLen' :key='key'>
          <div>号码</div>
          <div>赔率</div>
          <div>金额</div>
        </div>
      </div>
      <div class="body" :class="columns">
        <div class="tr" :class="{active:item.money>0||((item.money+'').length)}" v-for="(item,key) in betSelectSet[0].option" :key="key" @click="setPrice(item)" @input="priceChange(item, key)">
          <div>{{item.label}}</div>
          <div class="peilv">{{item.odds === false ? '' : item.odds}}</div>
          <div class="number-cell" :class="{'hidden':item.id===0}">
            <AppInputNumber class="number" v-model="item.money" :needNull='true'></AppInputNumber>
          </div>
        </div>
        <div class="tr" v-for="(obj, _index) in pushdata" :key="'c'+_index">
          <div></div>
          <div class="peilv"></div>
          <div class="number-cell">
          </div>
        </div>
      </div>
    </div>
    <!--合肖-->
    <hx v-if="betSelectSet && betSelectSet.length && isHX" :odd="odd" :odds="odds" :dataSource="betSelectSet" @selectItem="selectItem"></hx>
    <!--UI单列-->
    <one-col v-if="betSelectSet && betSelectSet.length && isSingleColumn" :dataSource="betSelectSet" @setPrice="setPrice"></one-col>
    <!--特码色波-->
    <tmsb v-if="betSelectSet && betSelectSet.length && [3].includes(playObj.playid)" :dataSource="betSelectSet" @selectItem="selectItem"></tmsb>
    <!--UI双列-->
    <two-col v-if="betSelectSet && betSelectSet.length && towColumn" :odds="odds" :dataSource="betSelectSet" @setPrice="setPrice"></two-col>
    <!--自选不中-->
    <zxbz v-if="betSelectSet && betSelectSet.length && isZXBZ" :odd="odd" :odds="odds" :dataSource="betSelectSet" @selectItem="selectItem" :pushdata="pushdata"></zxbz>
    <!--连选必中-->
    <lxbz v-if="betSelectSet && betSelectSet.length && isLXBZ" :dataSource="betSelectSet" @selectItem="selectItem"></lxbz>
    <!--连码-->
    <lm v-if="betSelectSet && betSelectSet.length && isLM" :dataSource="betSelectSet" @selectItem="selectItem" :playName="playObj.playname" :odd="odd"></lm>
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import mixinMutex from '../mixinMutex';
import { setBallList, default_color } from './field.js';
import calcLhc from './calc.js';
import zxbz from './zxbz';
import lxbz from './lxbz';
import lm from './lm';
import hx from './hx';
import TwoCol from './TwoCol';
import OneCol from './OneCol';
import tmsb from './tmsb';
export default {
  name: 'betArea',
  data() {
    return {
      betSelectSet: [],
      pushdata: [],
      selsetedArr: [],
      odds: new Array(6),
      odd: 0,
      betNum: 0
    };
  },
  components: {
    zxbz,
    lxbz,
    lm,
    TwoCol,
    OneCol,
    tmsb,
    hx
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj', 'curPrice']),
    columns() {
      if ([4, 6].includes(this.playObj.playid)) {
        return { '': true };
      } else {
        return {
          'col-5': this.betSelectSet[0].option.length % 5 === 0,
          'col-4':
            this.betSelectSet[0].option.length % 4 === 0 ||
            this.betSelectSet[0].option.length === 49,
          'col-3': this.betSelectSet[0].option.length % 3 === 0
        };
      }
    },
    colLen() {
      if ([4, 6].includes(this.playObj.playid)) {
        return 1;
      }
      const len = this.betSelectSet[0].option.length;
      if (len === 49) return 4;
      if (len % 3 === 0) {
        return 3;
      } else if (len % 4 === 0) {
        return 4;
      } else if (len % 2 === 0) {
        return 2;
      }
      return 1;
    },
    specialPlayId() {
      return [3].includes(this.playObj.playid);
    },
    isSingleColumn() {
      return [4, 6, 9].includes(this.playObj.playid);
    },
    towColumn() {
      return [7, 17, 18].includes(this.playObj.playid);
    },
    isZXBZ() {
      // 自选不中
      return [21].includes(this.playObj.playid);
    },
    isLXBZ() {
      // 连选必中
      return [22, 23, 24, 25, 26, 27, 28, 29].includes(this.playObj.playid);
    },
    isLM() {
      // 连码
      return [30, 31, 32, 33, 34, 35].includes(this.playObj.playid);
    },
    isHX() {
      // 合肖
      return [8].includes(this.playObj.playid);
    },
    isNormal() {
      return (
        !this.specialPlayId &&
        !this.isSingleColumn &&
        !this.towColumn &&
        !this.isZXBZ &&
        !this.isLXBZ &&
        !this.isLM &&
        !this.isHX
      );
    },
    isInput() {
      return [
        1,
        2,
        4,
        6,
        7,
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
        36
      ].includes(this.playObj.playid);
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv', 'getGameListAtin']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 设置修改输入框金额
    priceChange(item) {
      window.________timer = setTimeout(() => {
        window.clearTimeout(window.________timer);
        this.addData();
      }, 100);
    },
    // 下注数据组装 结构+赔率
    async togetPeilv() {
      if (!this.playObj.playid) return;
      // 获取模板数据

      /********* 获取yearid *********/
      let yearid =this.$store.state.game.gameList.filter(i => i.js_tag === 'lhc')[0].yearid
      this.betSelectSet = setBallList(this.playObj.playid, '', yearid);
      this.pushdata.splice(0)
      if (this.isZXBZ || this.isLM) {
        this.pushdata.push({ id: 0, money: '' });
      } else if (this.betSelectSet[0].option.length === 49) {
        if (this.isZXBZ || this.isLM) {
          this.pushdata.push({ id: 0, money: '' });
        } else {
          this.pushdata.push({ id: 0, money: '' });
          this.pushdata.push({ id: 0, money: '' });
          this.pushdata.push({ id: 0, money: '' });
        }
      }

      let item,
        ret = await this.getPeilv();
      const playItem = ret.find(val => val.playid == this.playObj.playid);
      const peilv = playItem ? playItem.peilv : '';
      item = peilv ? peilv.split('|') : [];
      // 单一赔率
      if (this.isLM) {
        this.odds = item.map(x => this.processZero(x));
        this.odd = this.odds.join('/');
        this.changeField({ stateOdds: this.odd });
      }
      else if (this.isZXBZ || this.isHX) {
        this.odds = item;
      } else if (item.length === 1) {
        this.changeField({ stateOdds: this.processZero(item[0]) });
      } else {
        this.changeField({ stateOdds: false });
        this.betSelectSet.forEach((group, idx) => {
          let odds = item.splice(0, group.option.length),
            opt = [];
          this.betSelectSet[idx].option = group.option.map((val, key) => {
            this.$set(val, 'odds', this.processZero(odds[key]));
            return val;
          });
        });
      }
      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      });
    },
    // 清空选择
    clearSelect() {
      this.betSelectSet.forEach((group, idx) => {
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          val.selected = false;
          val.money = '';
          return val;
        });
      });
    },
    // 注数计算
    getBetNum(value) {
      let arr = [];
      arr = value[0].split('|').filter(x=>x.length);
      return calcLhc.calcBetNum(this.playObj.playid, arr);
    },
    // 选择号码
    selectItem(item, idx) {
      // 互斥
      this.mutexLhc(item, idx);
      item.selected = !item.selected;
      this.addData();
    },
    setPrice(item, event) {
      if (item.label) {
        setTimeout(() => {
          let price = this.$store.state.gameBet.lhc.curPrice;
          if (
            !isNaN(price) &&
            !item.money.toString().trim().length &&
            !item.selected
          ) {
            item.money = Number(price);
            // item.selected = !item.selected;
            item.selected = true;
          }
          if (isNaN(item.money)) {
            item.seleced = false;
          }
          this.addData();
        });
      }
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      let arr = [],
        name = [],
        label = [],
        value = [];
      betSelectSet.forEach((g, i) => {
        let tr = g.option
          .filter(obj => {
            if (callback) {
              return obj.selected;
            } else if (this.isInput) {
              if (Number(obj.money) < 1) {
                return false;
              }
              return obj.selected;
            } else {
              return obj.selected;
            }
            // return obj.selected;
          })
          .map(v => Object.assign(v, { name: g.name }));
        arr = [...arr, ...tr];
        name[i] = g.name;
        label[i] = tr.map(td => td.label).join('|');
        value[i] = tr
          .map(td => td.value)
          .sort()
          .join('|');
      });

      if (this.isZXBZ) {
        let len = label[0].split('|').length;
        if (len > 5) {
          this.odd = this.odds[len - 6];
          this.changeField({ stateOdds: this.odd });
        }
      }
      if (this.isHX) {
        let len = label[0].split('|').length;
        if (len > 1) {
          this.odd = this.odds[len - 2];
          this.changeField({ stateOdds: this.odd });
        }
      }
      const betNum = this.getBetNum(value);
      const obj = this.calcAddData(name, label, value);
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj
        });
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj,
          betNum: betNum
        });
      }
    },
    //提交的数据特殊处理
    calcAddData(name, label, value) {
      if ([8, 21].includes(this.playObj.playid)) {
        value[0] = value[0].replace(/\|/g, '+');
      }

      const towArr = [22, 26, 32, 33, 34],
        threeArr = [23, 27, 30, 31],
        fourArr = [24, 28, 35],
        fiveArr = [25, 29];

      let isNormal = false;

      if (towArr.includes(this.playObj.playid)) {
        label = calcLhc.getTwoBalls(label[0].split('|'));
        value = calcLhc.getTwoBalls(value[0].split('|'));
      } else if (threeArr.includes(this.playObj.playid)) {
        label = calcLhc.getThreeBalls(label[0].split('|'));
        value = calcLhc.getThreeBalls(value[0].split('|'));
      } else if (fourArr.includes(this.playObj.playid)) {
        label = calcLhc.getFourBalls(label[0].split('|'));
        value = calcLhc.getFourBalls(value[0].split('|'));
      } else if (fiveArr.includes(this.playObj.playid)) {
        label = calcLhc.getFiveBalls(label[0].split('|'));
        value = calcLhc.getFiveBalls(value[0].split('|'));
      } else {
        isNormal = true;
      }

      return {
        name,
        label,
        value: isNormal ? value : value.map(x => x.split(' ').join('+'))
      };
    }
  },
  watch: {
    'playObj'(val) {
      this.pushdata = [];
      this.setBetting();
      this.togetPeilv();
    }
  },
  mounted() {
    this.$bus.$on('resetBetArea', this.clearSelect);
    this.$bus.$on('randomBet', this.addData);
    this.setBetting();
   // todo 后期删除 开发热更新兼容 开发时开启 上线时关闭
    // this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('randomBet');
  }
};
</script>
<style lang='scss'>
.bet-main.lhc {
  margin-top: 20px;
}
.bet-main.lhc {
  .title {
    height: 36px;
    background-color: #f5f5f5;
    span {
      display: inline-block;
      width: 75px;
      height: 36px;
      line-height: 36px;
      background-color: #e93248;
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
  .tr {
    display: flex;
    border-top: 1px solid #ffd5d5;
    border-right: 1px solid #ffd5d5;
    > div {
      flex: 1;
      text-align: center;
    }
    .number-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 28px;
      &.hidden {
        visibility: hidden;
      }
    }
    .balls {
      width: 450px;
      display: flex;
      flex: none;
      justify-content: flex-start;
      align-items: center;
      &.short {
        width: 200px;
      }
      > span {
        width: 31px;
        height: 31px;
        line-height: 31px;
        font-size: 18px;
        color: #666;
        margin-right: 8px;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(to bottom, #e93248, #fb5f73);
        box-shadow: 2px 2px 3px rgba(93, 10, 27, 0.21);
        &.red {
          background: linear-gradient(to bottom, #e93248, #fb5f73);
        }
        &.blue {
          background: rgb(81, 171, 240);
        }
        &.green {
          background: rgb(106, 204, 123);
        }
      }
    }
  }
  .head {
    border-left: 1px solid #ffd5d5;
    .tr > div {
      height: 34px;
      line-height: 34px;
      background-color: #fff7f1;
      &.active {
        background-color: #ffd5d5;
      }
    }
    .ball {
      flex: none;
      width: 450px;
    }
  }
  .body {
    border-left: 1px solid #ffd5d5;
    border-bottom: 1px solid #ffd5d5;
    .tr {
      &:hover,
      &.active {
        background-color: #ffe9ec;
      }
      > div {
        height: 44px;
        line-height: 44px;
      }
    }
  }

  .special {
    .head,
    .body {
      // column-count: 4;
      // column-count: 1;
      column-gap: 0px;
      &.col-5 {
        column-count: 5;
      }
      &.col-4 {
        column-count: 4;
      }
      &.col-3 {
        column-count: 3;
      }
      &.col-2 {
        column-count: 2;
      }
      &.col-1 {
        column-count: 1;
      }

      .wave-ball {
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          display: block;
          width: 28px;
          height: 28px;
          line-height: 28px;
          border-radius: 50%;
          &.red {
            background-color: #e93248;
          }
          &.blue {
            background-color: rgb(81, 171, 240);
          }
          &.green {
            background-color: rgb(106, 204, 123);
          }
        }
      }
    }
  }
  .three {
    height: 44px;
  }
  .multiple {
    display: flex;
    .mix {
      flex: 2;
      .head,
      .body {
        column-count: 2;
        column-gap: 0px;
      }
    }
    .wave {
      flex: 1;
    }
    .leopard {
      flex: 1;
    }
  }

  .tmsb {
    .wave {
      margin-bottom: 20px;
    }
    .body {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-right: 1px solid #ffd5d5;
    }
    p,
    h2 {
      text-align: center;
    }
    .box {
      width: 285px;
      height: 140px;
      margin: 20px 20px 8px 20px;
      border: 1px solid rgb(206, 206, 206);
      border-radius: 4px;
      padding: 6px;
      cursor: pointer;
      &.active {
        background: rgb(253, 70, 66);
        span,
        h2 {
          color: #fff !important;
        }
      }
    }
    .box-numbers {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 4px 15px 12px 15px;

      span {
        padding: 6px 9px;
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>

<style lang="scss">
.bet-main.lhc {
  .peilv {
    color: #e93248;
  }
  .number {
    width: 64px;
    height: 28px;
    line-height: 28px;
    background-color: #f1ffff;
    border-radius: 8px;
    border: 1px solid #cacaca;
  }

  .ivu-checkbox-large .ivu-checkbox-inner {
    width: 20px;
    height: 20px;
  }
  .ivu-checkbox-large .ivu-checkbox-checked .ivu-checkbox-inner:after {
    width: 9px;
    height: 13px;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner:after {
    border: 3px solid #fff;
    border-top: 0;
    border-left: 0;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner {
    background-color: #2db7f5;
    border-color: #2db7f5;
  }
}
</style>
