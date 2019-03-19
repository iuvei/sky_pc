<template >
  <div class="bet-main">
    <div class="bet-area" v-for="(group,idx) in betSelectSet" :key='idx'>
      <div class="baoxuan" v-if="[1].includes(playObj.playid)" v-for="(option,optIndex) in group" :key="optIndex">
        <div class="sel-item" :class="{'isSelect':label[0].selected}" @click="clickCard(label[0])" v-for="(label,labelIdx) in option" :key="labelIdx">
          <input type="checkbox" v-model="label[0].selected">
          <div class="title_top">{{label[0].label.name}}</div>
          <div class="card_bottom">
            <span>{{label[0].label.lizi}}</span>
            <span style="font-size:10px;" v-for="(card,cardIdx) in label[0].label.val" :key="cardIdx">
              <img :src="require('../../../assets/img/puke/card/' + card.type + '_' + card.cardItem +'.png')" alt="">
            </span>
          </div>
          <div class="odds">
            <span>{{label[0].odds}}</span>
          </div>
        </div>
      </div>
      <div class="danxuan_dx" v-if="[2,3,4,5,6].includes(playObj.playid)" v-for="(item,index) in group" :key="index">
        <div class="wrap" v-if="cardIdx==(playObj.playid-2)&&[2,3,4].includes(playObj.playid)" v-for="(cardItem,cardIdx) in item" :key="cardIdx">
          <div class="cardItem" :class="{'isSelect':label.selected}" v-for="(label,labIdx) in cardItem" :key="labIdx" @click="clickCard(label)">
            <input type="checkbox" v-model="label.selected">
            <span class="cards">
              <span v-for="(val,k) in label.label.val" :key="k">
                <img :src="require('../../../assets/img/puke/mixcard/card_' + val + '.png')" alt="">
              </span>
            </span>
          </div>
        </div>
        <div class="danxuan_th" v-if="Idx==(playObj.playid-2)&&[5,6].includes(playObj.playid)" v-for="(card,Idx) in item" :key="Idx">
          <div class="card" :class="{'isSelect':v.selected}" @click="clickCard(v)" v-for="(v,k) in card" :key="k">
            <div class="content">
              <div class="card_icon">
                <img :src="require('../../../assets/img/puke/big/'+ v.label.val + '_big.png')" alt="">
              </div>
              <div class="txt">{{playObj.playid==5?'同花':'同花顺'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="renxuan" v-if="[7,8,9,10,11,12].includes(playObj.playid)" v-for="(item,index) in group" :key="index">
        <div class="card" :class="{'isSelect':card.selected}" @click="clickCard(card)" v-for="(card,cardIdx) in item[0]" :key="cardIdx">
          <input type="checkbox" v-model="card.selected">
          <span class="card_icon">
            <img :src="require('../../../assets/img/puke/mixcard/card_' + card.label.val + '.png')" alt="">
          </span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import getField from './field.js'
import calcSSC from './calc.js'

export default {
  name: 'betArea',
  props: ['playConfig'],
  data() {
    return {
      betSelectSet: [],
      selsetedArr: [],
      actionsArr: ['全', '大', '小', '单', '双', '清'],
      textarea: '',
      zhushu: ''
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj']),
    isBaoxuan() {
      return [1].includes(this.playObj.playid)
    },
    isRenxuan() {
      return [7, 8, 9, 10, 11, 12].includes(this.playObj.playid)
    },
    isDanxuan() {
      return [2, 3, 4, 5, 6].includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    //选球
    clickCard(card) {
      card.selected = !card.selected
      this.addData();
    },
    // 下注数据组装
    async togetPeilv() {
      if (!this.playObj.playid) return
      // 获取模板数据
      this.betSelectSet = getField(this.playObj.playid)
      // 请求赔率
      let ret = await this.getPeilv()
      let item
      // 和值数据处理
      const playItem = ret.find(val => val.playid == this.playObj.playid)
      const peilv = playItem ? playItem.peilv : ''
      item = peilv ? peilv.split('|') : []
      // 单一赔率
      if (item.length === 1) {
        this.changeField({ stateOdds: this.processZero(item[0]) })
      } else {
        this.changeField({ stateOdds: false })
        this.betSelectSet.forEach((group, idx) => {
          let odds = item.splice(0, group.option.length),
            opt = []
          this.betSelectSet[idx].option = group.option.map((val, key) => {
            this.$set(val[0], "odds", this.processZero(odds[key]));
            return val;
          });
        });
      }

      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      this.textarea = ''
      this.betSelectSet.forEach((group, idx) => {
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          if (this.isBaoxuan) {
            val[0].selected = false
          } else {
            val.forEach((item, dex) => {
              item.selected = false
            })
          }
          return val
        })
      })
    },
    // 注数计算
    getBetNum(value) {
      let arr = []
      // value.forEach(v => {
      //   arr = [...arr, ...v.split("|")].filter(h => h);
      // });
      // if (this.isDwd) {
      //   arr = this.getDwdArr(arr);
      // }
      // console.log(value);
      // if (
      //   this.betSelectSet.length > 1 &&
      //   ![26, 27].includes(this.playObj.playid)
      // ) {
      return calcSSC.calcBetNum(this.playObj.playid, value)
      // } else {
      //   return calcSSC.calcBetNum(this.playObj.playid, arr);
      // }
    },
    // 选球互斥
    // 选择号码
    selectItem(item, idx) {
      // 互斥
      // this.mutexK3(item, idx);
      item.selected = !item.selected
      this.addData()
    },
    // 单行操作
    changeGroup(row, actIndex) {
      //console.log("row", row);
      // 0 全 1 大 2 小 3 单 4 双 5 清
      row.option.forEach(x => {
        x.selected = false
        switch (actIndex) {
          case 0:
            x.selected = true
            break
          case 1:
            if (x.value > 5) x.selected = true
            break
          case 2:
            if (x.value < 6) x.selected = true
            break
          case 3:
            if (x.value % 2 !== 0) x.selected = true
            break
          case 4:
            if (x.value % 2 === 0) x.selected = true
        }
      })
      this.addData()
    },
    calcAddData(name, label, value) {
      //双面盘 定位胆，数字盘数据特殊处理
      if (this.isDwd) {
        let _name = [],
          _label = []
        label.forEach((x, i) => {
          if (x.length) {
            _name.push(name[i])
            _label.push(x)
          }
        })
        name = _name
        label = _label
        value = this.getDwdArr(value)
      } else {
        // value = value.map(x => x.replace(/\|/g, "+"));
        // console.log('name',name)
      }
      return {
        name,
        label,
        value
      }
    },
    singleSelect(betSelectSet = this.textarea, callback) {
      let arr = betSelectSet.split(',')

      this.singleArr = arr.map(v => {
        v = v
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')
          .sort((a, b) => a - b)

        return {
          selected: calcSSC.calcBetNum(this.playObj.playid, [v.join("|")]),
          label: v.join(" "),
          value: v.join("|"),
          name: "号码",
        };
      });
      let data = this.singleArr.filter(item => item.selected);
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(data)),
          oneBetDate: {
            name: data.map(item => item.name),
            label: data.map(item => item.label),
            value: data.map(item => item.value)
          }
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(data)),
          oneBetDate: {
            name: data.map(item => item.name),
            label: data.map(item => item.label),
            value: data.map(item => item.value)
          },
          betNum: data.length
        })
      }
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      // if (this.isSingle) {
      //   this.singleSelect(betSelectSet.replace(/\|/g,' '), callback);
      //   return;
      // }
      let arr = [],
        name = [],
        label = [],
        value = [],
        betNum,
        obj
      // if(!this.isDanshi) {
      //   betSelectSet.forEach((g, i) => {
      //     let tr = g.option
      //       .filter(obj => obj.selected)
      //       .map(v => Object.assign(v, { name: g.name }));
      //     arr = [...arr, ...tr];
      //     name[i] = g.name;
      //     label[i] = tr.map(td => td.label).join("|");
      //     value[i] = tr
      //       .map(td => td.value)
      //       .sort()
      //       .join("|");
      //   });
      //   betNum = this.getBetNum(value);

      //   obj = this.calcAddData(name, label, value);
      // } else {
      //   arr = betSelectSet.split(',').map(item => {
      //     return {
      //       name: this.playObj.wanfa,
      //       label: item,
      //       value: item.split(' ').join('|')
      //     }
      //   })
      if (this.isBaoxuan) {
        let sel = []
        betSelectSet.forEach((item, index) => {
          sel = item.option.filter(val => val[0].selected).map(v => v[0])

          arr = [...arr, ...sel]
        })
      } else if (this.isDanxuan) {
        let sel = []
        betSelectSet.forEach((item, index) => {
          sel = item.option
            .filter((val, dex) => dex + 2 == this.playObj.playid)[0]
            .filter(v => v.selected)
          sel.forEach(item => {
            name.push(item.name)
            label.push(item.name)
            value.push(item.value)
          })
          arr = [...arr, ...sel]
        })
      } else {
        let sel = []
        betSelectSet.forEach((item, index) => {
          sel = item.option[0].filter(v => v.selected)
          sel.forEach((v, i) => {
            name.push(v.name)
            value.push(v.value)
            label.push(v.name)
          })
          arr = [...arr, ...sel]
        })
      }
      betNum = this.getBetNum(arr.length)
      obj = this.calcAddData(name, label, value)
      // betNum = this.zhushu
      //   obj = {}
      // }
      if (callback) {
        // console.log('加入购物车')
        callback({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj,
          betNum
        })
      }
    }
  },
  async mounted() {
    this.$bus.$on('resetBetArea', () => {
      this.clearSelect()
    })
    this.$bus.$on('randomBet', this.addData)
    this.setBetting()
    // todo 后期删除 开发热更新兼容 开发时开启 上线时关闭
    // this.togetPeilv()
  },
  watch: {
    playObj() {
      // let
      this.setBetting()
      this.togetPeilv()
    },
    playConfig(val) {
      if (!val) {
        this.betSelectSet = []
      }
    },
    textarea(val) {
      this.singleSelect()
    },
    zhushu(val) {
      this.addData(this.textarea)
    }
  },
  destroyed() {
    this.$bus.$off('randomBet')
  }
}
</script>
<style lang='scss' scoped>
@mixin normal() {
}
@mixin active() {
  background: url(~/assets/img/game/ssc_choosed.png) no-repeat;
  background-size: contain;
  transform: perspective(1px) scale(1.1);
  color: #fff;
}
.bet-main {
  padding: 30px 0;
  input {
    display: none;
    width: 0px;
    height: 0px;
  }
}
.bet-area {
  width: 100%;
  padding: 20px;
  .baoxuan {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    background: #fff;
    .sel-item.isSelect {
      border: 1px solid red;
      .title_top {
        color: red !important;
      }
      .odds {
        span {
          color: red;
          border: 1px solid red;
          border-radius: 2px;
        }
      }
    }
    .sel-item {
      display: inline-block;
      width: 130px;
      height: 130px;
      border: 1px dashed gray;
      border-radius: 5px;
      background-color: #f0f0f0;
      .title_top {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
      }
      .odds {
        width: 100%;
        height: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        span {
          display: inline-block;
          padding: 0px 3px;
        }
      }
      .card_bottom {
        width: 100%;
        height: 40%;
        line-height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: inline-block;
          width: 30px;
          font-size: 20px;
          img {
            display: inline-block;
            vertical-align: bottom;
            width: 30px;
          }
        }
      }
    }
  }
  .danxuan_th,
  .danxuan_dx {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #fff;
  }
  .danxuan_dx {
    .wrap {
      display: flex;
      min-height: 300px;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: flex-start;
      .cardItem {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        border: 1px dashed gray;
        border-radius: 5%;
        background-color: #f1f1f1;
        .cards {
          display: inline-block;
          img {
            width: 35px;
          }
          span:nth-child(2) {
            margin-left: -12px;
          }
          span:nth-child(3) {
            margin-left: -13px;
          }
        }
      }
      .isSelect {
        border: 1px solid red;
      }
    }
  }
  .danxuan_th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    .card {
      display: inline-block;
      width: 100px;
      height: 120px;
      border: 1px dashed gray;
      border-radius: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5%;
      background-color: #f1f1f1;
      .content {
        display: inline-block;
        .txt,
        .card_icon {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            display: inline-block;
            width: 40px;
          }
        }
        .txt {
          padding: 5px;
        }
      }
    }
    .isSelect {
      border: 1px solid red;
    }
  }

  .renxuan {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: #ffffff;
    width: 100%;
    height: 300px;
    .card {
      width: 110px;
      height: 110px;
      border: 1px dashed gray;
      border-radius: 5%;
      background-color: #f1f1f1;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .isSelect {
      border: 1px solid red;
    }
  }
}
</style>
