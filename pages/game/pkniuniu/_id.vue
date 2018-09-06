<template>
  <div class='niuniu'>
    <div class="nn">
      <p class="title">PK拾牛牛</p>
      <div class="info"><span>{{'请选择下方注项，每一期为一分钟开奖，一天共开奖为'+item.tip.match(/\d+/g)+'期。'}}</span></div>
      <div class="number">
        <div class="num">
          <span :class="'car' + (item)" v-for="(item,key) in data" :key="key"></span>
        </div>
        <div class="info">
          <p>现在开奖：<span>{{(qishu-1+'').slice(-4)}}</span> 期</p>
          <p>下期开奖：<span>{{(qishu+'').slice(-4)}}</span> 期</p>
          <p>开奖时间：<AppTimer :openTime="openTime" v-if="openTime.length" :callback="nextOpen" :repeat='openLength' offset="true">
          </AppTimer></p>
        </div>
      </div>
      <!-- 赛车 -->
      <div class="racing" :class="isbg?'beg':''" v-show="!isOver">
        <img class="start" src="../../../assets/img/game/pk10/car/start.png" alt="" :style="{transform:'translateX(' + bgPositionX + 'px)'}">
        <img class="end" src="../../../assets/img/game/pk10/car/end.png" alt="" :style="{transform:'translateX(' + endPositionX + 'px)'}">
        <ul class="carbox">
          <li class="car" :id="key+1" :class="item.speed?'speed c'+(key-0+1):'c'+(key-0+1)" v-for="(item,key) in carArr" :key="key" :style="{top:(100+key*16)+'px',right:(98+item.Eright)+'px'}">
            <span class="l_tyre" :class="isStart?'tyre':''"></span>
            <span class="r_tyre" :class="isStart?'tyre':''"></span>
          </li>
        </ul>
        <div class="count" v-show="!isStart">{{openless}}</div>
        <div class="light">
          <img src="../../../assets/img/game/pk10/car/red_light.png" v-if="!isStart">
          <img src="../../../assets/img/game/pk10/car/green_light.png" v-else>
        </div>
      </div>
      <div class="champion" :class="isOver?'show':''">
        <div class="num1"></div>
        <div class="num2"></div>
        <div class="num3"></div>
        <div class="sort">
          <div :class="isOver?'scale'+(key+1)+ ' sort'+item+' st'+(key+1):'sort'+item+' st'+(key+1)" v-for="(item,key) in sortData" :key="key"></div>
        </div>
        <div class="colour" :class="isOver?'land':''"></div>
        <div class="lamp">
          <div class="lamp_1"></div>
          <div class="lamp_2"></div>
          <div class="lamp_3"></div>
          <div class="lamp_4"></div>
        </div>
      </div>
      <div class="poker">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" @click="sele()"></canvas>
        <div class="niu">
          <div class="box" :class="items.class" v-for="(items,key) in resultList" :key="key" @click="canvas(key)" :style="'height:'+(canvasHeight*items.h)+'px'">
            <p>{{items.title}}</p>
            <div class="poker">
              <div class="item" :class="isOver?'sy':''" v-for="(item,key) in items.data" :key="key">
                <!-- <span :class="'poker'+item+'-'+(key==4?'4':key+1)"></span> -->
                <span :class="'poker'+item+'-'+items.color[key]"></span>
                <img src="../../../assets/img/game/pk10/brand.png" alt="">
              </div>
              <!-- <img :class="isStart?'rotate':''" :src="'../../../../img/game/'+item+'-'+(parseInt(Math.random() * 4 + 1))+'.png'" alt="" v-for="(item,key) in items.data" :key="key"> -->
              <span class="niu" :class="'niu'+items.niu+'_'+items.result" v-show="isOver"></span>
              <span class="res" :class="isOver?'show res_'+items.result:'res_'+items.result" v-if="!key==0"></span>
            </div>
          </div>
        </div>
        <div class="history">
          <p>开奖历史</p>
          <div class="item">
            <div class="tit">
              <span>期数</span>
              <span>开奖号码</span>
              <span>庄</span>
              <span>闲一</span>
              <span>闲二</span>
              <span>闲三</span>
              <span>闲四</span>
              <span>闲五</span>
            </div>
            <div class="list" v-for="(i,k) in kjList" :key="k">
              <span style="color:#EF0202">{{i.qishu.toString().slice(-4)}}</span>
              <span>{{i.balls.length ==10 ? i.balls.join(',') : '正在开奖'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,0) : '-'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,1) : '-'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,2) : '-'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,3) : '-'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,4) : '-'}}</span>
              <span>{{i.balls.length ==10 ? niuniu(i.balls,5) : '-'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bet">
        <div>您选择了 <span style="color:#EA3740;padding: 0 5px">{{betNum.length}}</span> 注，共 <span style="color:#EA3740">{{(betNum.length*money).toFixed(2)}}</span> 元，单注<input class="money" type="text" v-model="money">
          <div class="tag"><span @click="selectSort(k)" :class="{active:k==index}" v-for="(i,k) in tag" :key="k">{{i}}</span></div>
        </div>
        <div class="betting">
          <span class="add" @click="add">添加</span>
          <span class="keyBet" @click="submit">一键投注</span>
        </div>
      </div>
    </div>
    <commonCart :betList="betList" @resetBetnum="resets"></commonCart>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { pk10Color } from "../../../plugins/App/Lottery/color";
import commonCart from "~/components/game/common/cart";
let countDown;
let anima;
let sortss;
let next;
let resTimer;
export default {
  name: "pkniuniu",
  data() {
    return {
      isStart: false,
      isOver: false,
      isbg: false,
      bgPositionX:0,
      endPositionX:-110,
      carArr:[],
      tag:['元','角','分'],
      index: 0,
      count:10,
      car:[1,2,3,4,5,6,7,8,9,10],
      canvasWidth: 600,
      canvasHeight:400,
      resultList:[
        {
          title:'庄',
          class:'zhuang',
          data:[1,2,3,4,5],
          niu:'0',
          result:'w',
          h:0.67,
          color:[1,2,3,4,2]
        },
        {
          title:'闲一',
          class:'xian1',
          data:[2,3,4,5,6],
          niu:'0',
          result:'t',
          h:0.37,
          color:[1,2,3,4,2]
        },
        {
          title:'闲二',
          class:'xian2',
          data:[3,4,5,6,7],
          niu:'0',
          result:'t',
          h:0.3,
          color:[1,2,3,4,2]
        },
        {
          title:'闲三',
          class:'xian3',
          data:[4,5,6,7,8],
          niu:'0',
          result:'t',
          h:0.25,
          color:[1,2,3,4,2]
        },
        {
          title:'闲四',
          class:'xian4',
          data:[5,6,7,8,9],
          niu:'0',
          result:'t',
          h:0.3,
          color:[1,2,3,4,2]
        },
        {
          title:'闲五',
          class:'xian5',
          data:[6,7,8,9,10],
          niu:'0',
          result:'t',
          h:0.37,
          color:[1,2,3,4,2]
        },
      ],
      arr:[],
      sortData:[1,2,3],
      time:20,
      data:[1,2,3,4,5,6,7,8,9,10],
      money: 2,
      animateKey: 0,
      kjList: '',
      kjTime: [],
      openTime: '',
      qishu:0,
      openLength: 0,
      betNum:[],
      openless: 0,
      stopless: 0,
      // 是否在请求开奖结果
      openPrize: false,
      niu:['无牛','牛一','牛二','牛三','牛四','牛五','牛六','牛七','牛八','牛九','牛牛'],
      isOne: 0,
      balls:[],
      odd:[],
      betList:[],
      bets:[],
      interval:0,
      menuPlayConfig:[]
    };
  },
  components: { commonCart },
  computed: {
    ...mapState("userinfo", ["isLogin"]),
    ...mapState("game", ["gameList"]),
    item() {
      return this.initItem();
    }
  },
  created(){
    this.$store.commit("game/setGameId", this.$route.params.id);
    this.$store.commit("game/setGameItem", this.item);
    this.delShopCart()
    this.togetPeilv()
    this.getInitData()
    this.gamePlayConfig()
    clearInterval(this.resTimer)
    this.cars()
    if (process.browser) {
      this.resize()
      window.addEventListener("resize", this.resize);
    }
  },
  mounted() {
    
  },
  deactivated() {
    window.clearInterval(countDown)
    window.clearInterval(anima)
    window.clearInterval(sortss)
    window.clearInterval(resTimer)
    this.isbg = false
    this.sortData = []
    this.bgPositionX = 0
    this.endPositionX = -110
    this.isOver = false
    this.isStart = false
    this.betNum = []
    this.cars()
    this.resize()
    this.bgPositionX = 0;
    this.endPositionX = -110
  },
  watch: {
    "$route.params.id"(val) {
      this.toTop();
      this.delShopCart();
      this.setShopCart();
      this.$bus.$emit("resetBetArea");
      this.openPrize = false;
      this.getInitData();
      this.gamePlayConfig();
    },
    openPrize(val) {
      this.changeField({ isScrollBalls: this.openPrize });
    },
    isOver(){
      if(!this.isOver){
        this.reset()
      } else {
        window.setTimeout(()=>{
          this.isOver = false
        },5000)
      }
    },
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog","getPeilv","getGamePlayConfig"]),
    ...mapMutations("gameBet", ["changeField", "setShopCart", "delShopCart"]),
    ...mapActions("gameBet", ["submitTouzhu"]),
    async gamePlayConfig() {
      this.$store.commit("game/setGameId", this.$route.params.id);
      this.$store.commit("game/setGameItem", this.item);
      let ret = await this.getGamePlayConfig('pkniuniu');
      // this.menuPlayConfig = ret.list.filter(item => item.showofficial == 1);
      this.menuPlayConfig = ret.list;
    },
    initItem() {
      return (
        this.gameList.find(item => item.game_id == this.$route.params.id) || {}
      );
    },
    // toTop() {
    //   var timer = requestAnimationFrame(function fn() {
    //     // ;
    //     var s = document.documentElement.scrollTop;
    //     if (s > 0) {
    //       s -= 100;
    //       document.documentElement.scrollTop = s;
    //       timer = requestAnimationFrame(fn);
    //     }
    //   });
    // },
    async getInitData() {
      this.animateKey++;
      [this.kjList, this.openTime] = await Promise.all([
        this.togetKjCpLog(),
        this.togetCplogList()
      ]);
    },
    async togetKjCpLog() {
      let ret = await this.getKjCpLog({ tag: 'xypknn', date: 0, pcount: 20,pageid: 0 });
      if (ret && Array.isArray(ret) && ret.length) {
        this.balls = ret[0].balls && ret[0].balls.length ? ret[0].balls.split('+') : []
        for (let i = 0; i < ret.length; i++) {
          if(ret.balls !== ''){
            ret[i].balls = ret[i].balls.split('+')
            for (let n = 0; n < ret[i].balls.length; n++) {
              ret[i].balls[n] = ret[i].balls[n]*1
            }
          } else {
            ret.balls = []
          }
        }
        this.balls = ret[0].balls
        this.kjList = ret;
      } 
      return ret
    },
    async togetCplogList() {
      let ret = await this.getCplogList({ tag: 'xypknn' });
      this.changeField({ periods: ret[0].next[0].qishu });
      this.openLength = ret[0].next.length;
      this.qishu = ret[0].next[0].qishu
      this.openless = ret[0].next[0].openless || ret[0].next[1].openless
      this.countDow()
      this.$store.commit("game/setGameQishu", this.qishu);
      return ret[0].next;
    },
    async nextOpen(length, long = 5) {
      let _this = this
      this.openPrize = true;
      window.clearInterval(resTimer);
      resTimer = window.setInterval(async () => {
        let list = await this.togetKjCpLog()
        console.log(_this.balls)
        if (list && Array.isArray(list) && list.length) {
          this.compare();
          if(_this.balls.length ==10){
            setTimeout( () => {
              _this.downTime()
            },10000)
            window.clearInterval(resTimer);
          }
        }
      }, (long + 1) * 1000);
      let open = await this.togetCplogList();
      this.openTime = open;
      this.star()
    },
    // 获取赔率
    async togetPeilv() {
      // 请求赔率
      let ret = await this.getPeilv();
      // 数据处理
      const playItem = ret.find(val => val.playid == 1);
      const peilv = playItem ? playItem.peilv : "";
      this.odd = peilv ? peilv.split("|") : [];
      this.$store.commit("game/setGameOdd", this.odd);
    },
    add(){
      if(this.betNum.length == 0){
        this.$Message.warning("请选择投注号码");
        return;
      }
      if(this.money <= 0){
        this.$Message.warning("请输入投注金额");
        return;
      }
      let arr = []
      for (let i = 0; i < this.betNum.length; i++) {
        arr.push({
          betNum: this.betNum[i],
          money: this.money,
          odd: this.odd[this.betNum[i]-1]
        })
      }
      this.betList = arr
      this.betNum = []
      this.resize()
    },
    async submit(){
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if(this.betNum.length == 0){
        this.$Message.warning('请选择投注号码');
        return
      }
      if(this.money <= 0){
        this.$Message.warning('请输入投注金额');
        return
      }
      let bets = []
      for (let i = 0; i < this.betNum.length; i++) {
        bets.push('1#'+this.money+'#'+(this.betNum[i]-1))
      }
      let [err, ret] = await this.submitTouzhu({
        qishu: this.qishu,
        data: bets,
        multiple: 1
      });
      if (ret) {
        this.$bus.$emit("resetBetArea");
        this.$Message.success("投注成功，祝您好运！");
        await this.$store.dispatch("userinfo/flushPrice");
        this.money = ''
        this.betNum = []
        this.resize()
      }
    },
    resets(){
      this.betNum = []
      this.resize()
    },
    getBgColor(v) {
      return { backgroundColor: pk10Color(v) };
    },
    // 定义汽车
    cars(){
      this.carArr = []
      for (let i = 0; i < 10; i++) {
        let car = {}
        car.id = i  //汽车号
        car.Sright = i*30  //初始位置
        car.Eright = i*9  //初始位置
        car.speed = false //加速
        this.carArr.push(car)
      }
    },
    star(){
      window.clearInterval(anima);
      this.isStart = true;
      this.isbg = true;
      this.bgPositionX = 350;
      this.begin();
      this.init();
      this.sortList();
    },
    // 重置
    reset(){
      this.isOver = false
      this.cars()
    },
    init(){
      window.clearInterval(anima);
      anima = window.setInterval(this.begin,5000)
    },
    countDow(){
      let _this = this;
      window.clearInterval(sortss);
      window.clearInterval(countDown);
      countDown = window.setInterval(function() {
        if(_this.openless < 0){_this.openless = 0}
        _this.openless--;
      }, 1000);
    },
    // 开始
    begin(){
      for(let i = 0; i < 10; i++) {
        this.carArr[i].Sright = this.carArr[i].Eright
        this.carArr[i].Eright = Math.random() * 350 + 100
        if(((this.carArr[i].Sright+50)+1)>this.carArr[i].Eright){
          this.carArr[i].speed = false
        } else {
          this.carArr[i].speed = true
        }
      }
    },
    // 结束倒计时
    downTime(){
      window.clearInterval(anima);
      let beg = document.querySelector(".racing");
      let arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(Math.random() * 350 + 100) 
      }
      arr.sort(function(a,b){
        return b-a;
      })
      // console.log(arr)
      // console.log(this.carArr)
      for (let i = 0; i < 10; i++) {
        this.carArr[this.balls[i]*1-1].Sright = this.carArr[this.balls[i]*1-1].Eright;
        this.carArr[this.balls[i]*1-1].Eright = arr[i];
        if (this.carArr[this.balls[i]*1-1].Sright + 1 + 1 > this.carArr[this.balls[i]*1-1].Eright) {
          this.carArr[this.balls[i]*1-1].speed = false;
        } else {
          this.carArr[this.balls[i]*1-1].speed = true;
        }
      }
      window.setTimeout(() => {
        this.isbg = false;
        this.endPositionX = 200;
        for (let i = 0; i < 10; i++) {
          this.carArr[i].Eright = this.carArr[i].Eright + 2000;
          this.carArr[i].speed = true;
        }
        window.setTimeout(() => {
          this.data = this.balls
          this.sortData = [];
          for (let i = 0; i < 3; i++) {
            this.sortData.push(this.data[i]);
          }
          this.bgPositionX = 0;
          this.endPositionX = -110;
          this.isOver = true;
          this.isStart = false;
          window.clearInterval(sortss);
        },1000)
      }, 5000);
    },
    niuniu(data,n){
      let _data = data.slice(n, n + 5)
      return this.niu[this.result(_data)]
    },
    // 牛牛算法
    result(arr){
      // console.log(arr)
      let _arr = arr
      for(let i=0; i < _arr.length - 2; i++){
        for(let j=i+1; j < _arr.length - 1; j++){
          for(let k=j+1; k < _arr.length; k++){
            if((_arr[i]+_arr[j]+_arr[k])%10 == 0){
              _arr.splice(k,1)
              _arr.splice(j,1)
              _arr.splice(i,1)
              for (let n = 0; n < _arr.length; n++) {
                if((_arr[0]+_arr[1])%10 == 0) {
                  // console.log('牛牛')
                  return 10
                }else{
                  // console.log('牛'+(_arr[0]+_arr[1])%10)
                  return (_arr[0]+_arr[1])%10
                }
              }
            }
          }
        }
      }
      return 0
    },
    //结果
    compare(){
      let _data = this.balls
      for (let i = 0 ; i < 6; i++) {
        this.resultList[i].data = _data.slice(i,i+5)
        this.resultList[i].niu = this.result(_data.slice(i,i+5))
        for (let j = 0; j < 5; j++) {
          this.resultList[i].color[j] = parseInt(Math.random()*4+1)
        }
      }
      // let this.resultList = this.resultList
      for (let i = 1; i < this.resultList.length; i++) {
        if(this.resultList[i].niu > this.resultList[0].niu){
          this.resultList[i].result = 'w'
        } else {
          this.resultList[i].result = 't'
        } 
      }
      // console.log(this.resultList)
    },
    // 排序
    sortList(){
      let cars = document.getElementsByClassName('car')
      let _this = this
      let compares = function (prop) {
        return function (obj1, obj2) {
          let val1 = obj1[prop];
          let val2 = obj2[prop];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }            
        } 
      }
      window.clearInterval(sortss);
      sortss = window.setInterval(function(){
        let sortCar = []
        let newData = []
        for (let i = 0; i < cars.length; i++) {
          sortCar.push(
            {
              left: cars[i].offsetLeft,
              id: i+1
            }
          )
        }
        sortCar.sort(compares("left"))
        for (let j = 0; j < sortCar.length; j++) {
          newData.push(sortCar[j].id)
        }
        _this.data = newData
      },500)
    },
    openHistory() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$refs.accordion.openItem()
      } else {
        this.$refs.accordion.closeItem()
      }
    },
    getColor(val) {
      return pk10bjys(val)
    },
    sele(){
      let p = this.getEventPosition(event);
      let cass = document.getElementById('canvas');
      let cxtx = cass.getContext( '2d' );
      cxtx.clearRect(0, 0, cass.width, cass.height);
      let n = 0
      this.arr.forEach(function(v,i){
        cxtx.beginPath();
        cxtx.moveTo(v.spot1.x,v.spot1.y);
        cxtx.lineTo(v.spot2.x,v.spot2.y);
        cxtx.lineTo(v.spot3.x,v.spot3.y);
        cxtx.lineTo(v.spot4.x,v.spot4.y);
        cxtx.stroke();
        if(p && cxtx.isPointInPath(p.x, p.y)){
          n = i
        }
      })
      this.canvas(n)
    },
    getEventPosition(ev){
      let x, y;
      if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) {
        x = ev.offsetX;
        y = ev.offsetY;
      }
      return {x: x, y: y};
    },
    canvas(num){
      let _this = this
      if(num ==0){return}
      let a = this.betNum.indexOf(num)
      if(a > -1) {
        this.betNum.splice(a, 1)
      } else {
        this.betNum.push(num)
      }
      // console.log(this.betNum)
      let items = document.querySelector(".niuniu").querySelectorAll(".box")
      let cass = document.getElementById('canvas');
      let cxtx = cass.getContext( '2d' );
      cxtx.clearRect(0, 0, cass.width, cass.height);
      this.arr.forEach(function(v,i){
        if(i ==0){
          cxtx.beginPath();
          cxtx.moveTo(v.spot1.x,v.spot1.y);
          cxtx.lineTo(v.spot2.x,v.spot2.y);
          cxtx.lineTo(v.spot3.x,v.spot3.y);
          cxtx.lineTo(v.spot4.x,v.spot4.y);
          cxtx.stroke();
          for (let i = 0; i < items.length; i++) {
            items[i].style.color = '#666'
          }
          return
        }
        for (let n = 0; n < _this.betNum.length; n++) {
          if (i == _this.betNum[n]) {
            cxtx.beginPath();
            cxtx.strokeStyle = "#ccc";
            cxtx.fillStyle = "#eb3349";
            cxtx.moveTo(v.spot1.x, v.spot1.y);
            cxtx.lineTo(v.spot2.x, v.spot2.y);
            cxtx.lineTo(v.spot3.x, v.spot3.y);
            cxtx.lineTo(v.spot4.x, v.spot4.y);
            cxtx.stroke();
            cxtx.fill();
            // for (let i = 0; i < items.length; i++) {
            //   items[i].style.color = "#666";
            // }
            let obj = document.querySelector(".xian" + i);
            obj.style.color = "#fff";
          }
        }
        cxtx.beginPath();
        cxtx.moveTo(v.spot1.x,v.spot1.y);
        cxtx.lineTo(v.spot2.x,v.spot2.y);
        cxtx.lineTo(v.spot3.x,v.spot3.y);
        cxtx.lineTo(v.spot4.x,v.spot4.y);
        cxtx.stroke();
      })
    },
    resize() {
      let items = document.querySelectorAll(".niuniu .box")
      for (let i = 0; i < items.length; i++) {
        items[i].style.color = '#666'
      }
      this.arr = [
        {spot1:{x:this.canvasWidth*0.365,y:0},spot2:{x:this.canvasWidth*0.635,y:0},spot3:{x:this.canvasWidth*0.635,y:this.canvasHeight*0.67},spot4:{x:this.canvasWidth*0.365,y:this.canvasHeight*0.67}},//庄
        {spot1:{x:0,y:0},spot2:{x:this.canvasWidth*0.365,y:0},spot3:{x:this.canvasWidth*0.365,y:this.canvasHeight*0.37},spot4:{x:0,y:this.canvasHeight*0.37}},//闲1
        {spot1:{x:0,y:this.canvasHeight*0.37},spot2:{x:this.canvasWidth*0.365,y:this.canvasHeight*0.37},spot3:{x:this.canvasWidth*0.365,y:this.canvasHeight*0.67},spot4:{x:0,y:this.canvasHeight}},//闲2
        {spot1:{x:this.canvasWidth*0.365,y:this.canvasHeight*0.67},spot2:{x:this.canvasWidth*0.635,y:this.canvasHeight*0.67},spot3:{x:this.canvasWidth,y:this.canvasHeight},spot4:{x:0,y:this.canvasHeight}},//闲3
        {spot1:{x:this.canvasWidth*0.635,y:this.canvasHeight*0.37},spot2:{x:this.canvasWidth,y:this.canvasHeight*0.37},spot3:{x:this.canvasWidth,y:this.canvasHeight},spot4:{x:this.canvasWidth*0.635,y:this.canvasHeight*0.67}},//闲4
        {spot1:{x:this.canvasWidth*0.635,y:0},spot2:{x:this.canvasWidth,y:0},spot3:{x:this.canvasWidth,y:this.canvasHeight*0.37},spot4:{x:this.canvasWidth*0.635,y:this.canvasHeight*0.37}},//闲5
      ]
      this.$nextTick(() => {
		    let cass = document.getElementById('canvas');
        let cxtx = cass.getContext( '2d' );
        cxtx.clearRect(0, 0, cass.width, cass.height);
        // 闲1
    	  cxtx.strokeStyle = '#ccc'; //绘制线颜色
    	  cxtx.fillStyle = '#ccc';
        let xian1 = cxtx.rect( 0, 0, this.canvasWidth*0.365 , this.canvasHeight*0.37 );
        cxtx.stroke();
        // // 庄
        cxtx.beginPath();
        cxtx.strokeStyle = '#ccc';
        cxtx.fillStyle = '#ccc';
        let zhuang = cxtx.strokeRect( this.canvasWidth*0.365, 0, this.canvasWidth*0.27, this.canvasHeight*0.67 );
        // // 闲5
        cxtx.beginPath();
        cxtx.strokeStyle = '#ccc';
        cxtx.fillStyle = '#ccc';
        let xian5 = cxtx.strokeRect( this.canvasWidth*0.635, 0, this.canvasWidth*0.365, this.canvasHeight*0.37 );
        // // 闲2
        cxtx.beginPath();
        cxtx.lineStyle = 'blue';
        let xian2 = cxtx.moveTo(0, this.canvasHeight*0.37);
        cxtx.lineTo(this.canvasWidth*0.365, this.canvasHeight*0.37);
        cxtx.lineTo(this.canvasWidth*0.365, this.canvasHeight*0.67);
        cxtx.lineTo(0, this.canvasHeight);
        cxtx.stroke();
        // // 闲4
        cxtx.beginPath();
        cxtx.lineStyle = 'blue';
        let xian4 = cxtx.moveTo(this.canvasWidth*0.635, this.canvasHeight*0.37);
        cxtx.lineTo(this.canvasWidth, this.canvasHeight*0.37);
        cxtx.lineTo(this.canvasWidth, this.canvasHeight);
        cxtx.lineTo(this.canvasWidth*0.635, this.canvasHeight*0.67);
        cxtx.stroke();
        // // 闲3
        cxtx.beginPath();
        cxtx.lineStyle = 'red';
        let xian3 = cxtx.moveTo(this.canvasWidth*0.365, this.canvasHeight*0.67);
        cxtx.lineTo(this.canvasWidth*0.635, this.canvasHeight*0.67);
        cxtx.lineTo(this.canvasWidth, this.canvasHeight);
        cxtx.lineTo(0, this.canvasHeight);
        cxtx.stroke();
		  });
    },
    selectSort(k){
      this.index = k
    }
  },
}
</script>
<style lang='scss' scoped>
.niuniu {
  width: 1000px;
  margin: 20px auto 0;
  .nn {
    background-color: #fff;
    padding: 0 25px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    .title {
      text-align: center;
      line-height: 80px;
      font-size: 30px;
      color: #43362D;
    }
    >.info{
      span{
        display: block;
        width: 400px;
        text-align: center;
        background-color: #7F6047;
        color: #fff;
        line-height: 30px;
        margin: 0 auto;
        border-radius: 15px;
      }
    }
    .bet-top {
      display: flex;
      align-items: center;
      height: 24px;
      font-size: 14px;
      margin-top: 10px;
      .title {
        font-size: 14px;
        padding: 0 20px;
        background: url("~assets/img/game/bet-note-title.png") no-repeat left
          center;
      }
      .case {
        padding: 0 20px;
        background: url("~assets/img/game/bet-note-case.png") no-repeat left
          center;
        cursor: pointer;
      }
      .describe {
        padding: 0 20px;
        background: url("~assets/img/game/bet-note-describe.png") no-repeat left
          center;
        cursor: pointer;
      }
      .wrap-pop {
        width: 200px;
        white-space: pre-line;
      }
    }
    .number {
      width: 100%;
      // background-color: rgb(230, 230, 230);
      padding: 10px 10px 10px 40px;
      margin-top: 20px;
      border: 1px solid #D8D8D8;
      border-bottom: none;
      background:url('../../../assets/img/game/pk10/car/bgcar2.png') 2% 50% no-repeat,url('../../../assets/img/game/pk10/car/bgcar1.png') 82% 50% no-repeat rgb(230, 230, 230);
      .num{
        padding: 10px 0;
        display: inline-block;
        span{
          display: inline-block;
          width: 60px;
          height: 60px;
        }
        $car1:'1','2','3','4','5','6','7','8','9','10';
        @each $n in $car1{
          .car#{$n}{
            background: url('../../../assets/img/game/pk10/car/num'+$n+'.png') no-repeat;
            background-size: 100%;
          }
        }
      }
      >.info {
        display: inline-block;
        float: right;
        p{
          font-size: 14px;
          font-weight: 600;
          color: #000;
          &:last-child{
            margin-top: 10px;
          }
          span {
            color: red;
          }
          div {
            display: inline-block;
            color: red
          }
        }
      }
    }
    // 赛车
    .racing{
      height: 300px;
      background: url(../../../assets/img/game/pk10/car/bg1.png);
      background-size: auto 100%;
      overflow: hidden;
      position: relative;
      transition: all 0.5s linear;
      &.beg{
        animation: beg 10s linear infinite;
      }
      @keyframes beg{from{background-position-x: 0px;}
        to{background-position-x: 10000px;}
      }
      .start{
        height: 164px;
        position: absolute;
        bottom: 14px;
        right: 230px;
      }
      .end{
        height: 204px;
        position: absolute;
        bottom: 13px;
        left: -20px;
        transition: all 0.2s linear;
      }
      .carbox{
        height: 300px;
        .car{
          display: inline-block;
          width: 140px;
          height: 40px;
          position: absolute;
          transition: all 5s linear;
          span{
            display: inline-block;
            width: 25px;
            height: 25px;
            background:url(../../../assets/img/game/pk10/car/tyre.png) no-repeat;
            background-size: 100%;
            position: absolute;
          }
          .l_tyre{
            top: 18px;
            left: 15px;
          }
          .r_tyre{
            top: 18px;
            left: 96.5px;
          }
          .tyre{
            animation: rotate 1s linear infinite;
          }
          @keyframes lamp_1{
            0%{transform: rotate(-40deg)}
            50%{transform: rotate(40deg)}
            100%{transform: rotate(-40deg)}
          }
          @keyframes rotate{from{transform: rotate(0deg)}
            to{transform: rotate(-1080deg)}
          }
          @keyframes feng{
            0%{opacity: 1}
            50%{opacity: 0}
            100%{opacity: 1}
          }
          @keyframes fire{from{background:url(../../../assets/img/game/pk10/car/fire1.png) no-repeat;background-size: 100%;}
            to{background:url(../../../assets/img/game/pk10/car/fire2.png) no-repeat;background-size: 100%;}
          }
          i{
            display: inline-block;
            position: absolute;
          }
          &.speed{
            &::before{
              content:'';
              display: inline-block;
              width: 60px;
              height: 40px;
              background:url(../../../assets/img/game/pk10/car/feng.png) no-repeat;
              background-size: 100%;
              animation: feng 0.3s linear infinite;
              position:absolute;
              top: 0px;
              left: -5px;
            }
            &::after{
              content:'';
              display: inline-block;
              width: 45px;
              height: 12px;
              background:url(../../../assets/img/game/pk10/car/fire1.png) no-repeat;
              background-size: 100%;
              animation: fire 0.3s linear infinite;
              position:absolute;
              top: 20px;
              right: -44px
            }
          }
        }
        $car:'1','2','3','4','5','6','7','8','9','10';
        @each $n in $car{
          .c#{$n}{
            background: url('../../../assets/img/game/pk10/car/car_'+$n+'.png') no-repeat;
            background-size: 100%;
          }
        }
      }
      .count{
        width: 500px;
        height: 135px;
        background: url(../../../assets/img/game/pk10/car/num_bg.png) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        line-height: 135px;
        color: #fff;
        text-align: center;
        font-size: 100px;
        font-weight: 600;
      }
      .light {
        display: inline-block;
        position: absolute;
        top: 5px;
        right: 0;
        img {
          // position: absolute;
          // top: 5px;
          // right: 0;
          width: 100px;
        }
      }
    }
    .champion{
      // height: poTorem(150px);
      background: url(../../../assets/img/game/pk10/car/stage.png) no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      position: relative;
      visibility: hidden;
      &.show{
        visibility: visible;
        height: 300px;
      }
      .sort{
        >div{
          position:absolute;
        }
        .scale1{
          // animation: scale1 2s linear infinite;
          transform: translateX(-50%) scale(1.6) !important;
          transition: transform 2s linear;
        }
        .scale2{
          // animation: scale2 2s linear infinite;
          transform: translateX(-165%) scale(1.3) !important;
          transition: transform 2s linear;
        }
        .scale3{
          // animation: scale3 2s linear infinite;
          transform: translateX(65%) scale(1.3) !important;
          transition: transform 2s linear;
        }
        @keyframes scale1{
          from{transform: translateX(-50%) !important}
          to{transform: translateX(-50%) scale(1.6) !important}
        }
        @keyframes scale2{
          from{transform: translateX(-165%) !important}
          to{transform: translateX(-165%) scale(1.3) !important}
        }
        @keyframes scale3{
          from{transform: translateX(65%) !important}
          to{transform: translateX(65%) scale(1.3) !important}
        }
        .st1{
          width: 105px;
          height: 60px;
          top:55%;
          left:50%;
          transform: translateX(-50%);
          transform-origin:center;
          // -webkit-box-reflect: below;
        }
        .st2{
          width: 140px;
          height: 80px;
          top:65%;
          left:42%;
          transform: translateX(-165%);
        }
        .st3{
          width: 140px;
          height: 80px;
          top:65%;
          left:58%;
          transform: translateX(65%);
        }
        .sort1{
          background: url(../../../assets/img/game/pk10/car/front_car_1.png) no-repeat;
          background-size: 100%;
        }
        .sort2{
          background: url(../../../assets/img/game/pk10/car/front_car_2.png) no-repeat;
          background-size: 100%;
        }
        .sort3{
          background: url(../../../assets/img/game/pk10/car/front_car_3.png) no-repeat;
          background-size: 100%;
        }
        .sort4{
          background: url(../../../assets/img/game/pk10/car/front_car_4.png) no-repeat;
          background-size: 100%;
        }
        .sort5{
          background: url(../../../assets/img/game/pk10/car/front_car_5.png) no-repeat;
          background-size: 100%;
        }
        .sort6{
          background: url(../../../assets/img/game/pk10/car/front_car_6.png) no-repeat;
          background-size: 100%;
        }
        .sort7{
          background: url(../../../assets/img/game/pk10/car/front_car_7.png) no-repeat;
          background-size: 100%;
        }
        .sort8{
          background: url(../../../assets/img/game/pk10/car/front_car_8.png) no-repeat;
          background-size: 100%;
        }
        .sort9{
          background: url(../../../assets/img/game/pk10/car/front_car_9.png) no-repeat;
          background-size: 100%;
        }
        .sort10{
          background: url(../../../assets/img/game/pk10/car/front_car_10.png) no-repeat;
          background-size: 100%;
        }
      }
      .colour {
        width: 100%;
        height: 100%;
        background: url(../../../assets/img/game/pk10/car/colour_bar.png) no-repeat;
        background-size: 100%;
        position: absolute;
        top:-100%;
        left:0;
        transition: all 2s linear;
      }
      .colour.land{
        top: 100%;
      }
      .lamp{
        .lamp_1{
          width: 55px;
          height: 130px;
          background: url(../../../assets/img/game/pk10/car/lamp.png) no-repeat;
          background-size: 100%;
          position: absolute;
          left:18%;
          bottom:-10px;
          transform: rotate(-45deg);
          transform-origin: bottom;
          animation: lamp_1 1.5s linear infinite;
        }
        .lamp_2{
          width: 55px;
          height: 130px;
          background: url(../../../assets/img/game/pk10/car/lamp.png) no-repeat;
          background-size: 100%;
          position: absolute;
          left:38%;
          bottom:-10px;
          transform: rotate(45deg);
          transform-origin: bottom;
          animation: lamp_2 1.5s linear infinite;
        }
        .lamp_3{
          width: 55px;
          height: 130px;
          background: url(../../../assets/img/game/pk10/car/lamp.png) no-repeat;
          background-size: 100%;
          position: absolute;
          left:58%;
          bottom:-10px;
          transform: rotate(-45deg);
          transform-origin: bottom;
          animation: lamp_3 1.5s linear infinite;
        }
        .lamp_4{
          width: 55px;
          height: 130px;
          background: url(../../../assets/img/game/pk10/car/lamp.png) no-repeat;
          background-size: 100%;
          position: absolute;
          left:78%;
          bottom:-10px;
          transform: rotate(45deg);
          transform-origin: bottom;
          animation: lamp_4 1.5s linear infinite;
        }
        @keyframes lamp_1{
          0%{transform: rotate(-45deg)}
          50%{transform: rotate(45deg)}
          100%{transform: rotate(-45deg)}
        }
        @keyframes lamp_2{
          0%{transform: rotate(45deg)}
          50%{transform: rotate(-45deg)}
          100%{transform: rotate(45deg)}
        }
        @keyframes lamp_3{
          0%{transform: rotate(-45deg)}
          50%{transform: rotate(45deg)}
          100%{transform: rotate(-45deg)}
        }
        @keyframes lamp_4{
          0%{transform: rotate(45deg)}
          50%{transform: rotate(-45deg)}
          100%{transform: rotate(45deg)}
        }
      }
      .num1{
        width: 95px;
        height: 65px;
        background: url(../../../assets/img/game/pk10/car/1st.png) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%)
      }
      .num2{
        width: 80px;
        height: 50px;
        background: url(../../../assets/img/game/pk10/car/2nd.png) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 26%;
        left: 28%;
        transform: translateX(-50%)
      }
      .num3{
        width: 80px;
        height: 50px;
        background: url(../../../assets/img/game/pk10/car/3rd.png) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 26%;
        left: 72%;
        transform: translateX(-50%)
      }
    }
    // 扑克
    >.poker {
      margin-top: 10px;
      #canvas {
        border: 1px solid #ccc;
      }
      .niu{
        position: absolute;
        width: 602px;
        height: 270px;
        z-index: 10;
        top: 723px;
        >div{
          position: relative;
          color: #666;
          &:nth-child(4){
            p {
              line-height: 45px;
            }
          }
          p{
            font-size: 30px;
            text-align: center;
            line-height: 55px;
          }
          &:nth-child(1){
            p {
              color:#ccc;
              position:absolute;
              top: 50%;
              width: 100%;
              font-family: serif;
              font-size: 100px;
              line-height: 100px;
              text-align: center;
            }
            .poker {
              margin-top: 16px;
            }
          }
          .poker {
            position: relative;
            width: 140px;
            height: 80px;
            margin: 0 auto;
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            .item.sy{
              transform: rotateY(-180deg) translateZ(-2px);
            }
            .item {
              width: 60px;
              height: 80px;
              position: absolute;
              top:0;
              transform-style: preserve-3d;
              transition: all 1s;
              span,img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
              }
              span {
                transform: rotateY(-180deg) translateZ(1px);
              }
              &:nth-child(1){
                left:0px;
                transition: all 1s;
                z-index: 1;
              }
              &:nth-child(2){
                left:20px;
                transition: all 1s 0.1s;
                z-index: 2;
              }
              &:nth-child(3){
                left:40px;
                transition: all 1s 0.2s;
                z-index: 3;
              }
              &:nth-child(4){
                left:60px;
                transition: all 1s 0.3s;
                z-index: 4;
              }
              &:nth-child(5){
                left:80px;
                transition: all 1s 0.4s;
                z-index: 5;
              }
            }
            span{
              position: absolute;
              display: inline-block;
            }
            .rotate{
              transform: rotateY(180deg);
            }
            .niu{
              top: 50%;
              left: 32%;
              transform: translateX(-50%) translateZ(10px);
              width: 70px;
              height: 35px;
              z-index: 100;
              position:absolute;
            }
            .res{
              top: 15px;
              // right: 0.7rem;
              width: 0;
              height: 0;
              transition: all 1s;
              visibility: hidden;
              z-index: 100;
              right: -10%;
              position:absolute;
              transform: translateZ(10px);
              &.show{
                width: 67px;
                height: 60px;
                visibility: visible;
              }
            }
            .niu0_t{
              background: url(../../../assets/img/game/pk10/n0-t.png) no-repeat;
              background-size: 100%;
            }
            .niu0_w{
              background: url(../../../assets/img/game/pk10/n0-w.png) no-repeat;
              background-size: 100%;
            }
            .niu1_t{
              background: url(../../../assets/img/game/pk10/n1-t.png) no-repeat;
              background-size: 100%;
            }
            .niu1_w{
              background: url(../../../assets/img/game/pk10/n1-w.png) no-repeat;
              background-size: 100%;
            }
            .niu2_t{
              background: url(../../../assets/img/game/pk10/n2-t.png) no-repeat;
              background-size: 100%;
            }
            .niu2_w{
              background: url(../../../assets/img/game/pk10/n2-w.png) no-repeat;
              background-size: 100%;
            }
            .niu3_t{
              background: url(../../../assets/img/game/pk10/n3-t.png) no-repeat;
              background-size: 100%;
            }
            .niu3_w{
              background: url(../../../assets/img/game/pk10/n3-w.png) no-repeat;
              background-size: 100%;
            }
            .niu4_t{
              background: url(../../../assets/img/game/pk10/n4-t.png) no-repeat;
              background-size: 100%;
            }
            .niu4_w{
              background: url(../../../assets/img/game/pk10/n4-w.png) no-repeat;
              background-size: 100%;
            }
            .niu5_t{
              background: url(../../../assets/img/game/pk10/n5-t.png) no-repeat;
              background-size: 100%;
            }
            .niu5_w{
              background: url(../../../assets/img/game/pk10/n5-w.png) no-repeat;
              background-size: 100%;
            }
            .niu6_t{
              background: url(../../../assets/img/game/pk10/n6-t.png) no-repeat;
              background-size: 100%;
            }
            .niu6_w{
              background: url(../../../assets/img/game/pk10/n6-w.png) no-repeat;
              background-size: 100%;
            }
            .niu7_t{
              background: url(../../../assets/img/game/pk10/n7-t.png) no-repeat;
              background-size: 100%;
            }
            .niu7_w{
              background: url(../../../assets/img/game/pk10/n7-w.png) no-repeat;
              background-size: 100%;
            }
            .niu8_t{
              background: url(../../../assets/img/game/pk10/n8-t.png) no-repeat;
              background-size: 100%;
            }
            .niu8_w{
              background: url(../../../assets/img/game/pk10/n8-w.png) no-repeat;
              background-size: 100%;
            }
            .niu9_t{
              background: url(../../../assets/img/game/pk10/n9-t.png) no-repeat;
              background-size: 100%;
            }
            .niu9_w{
              background: url(../../../assets/img/game/pk10/n9-w.png) no-repeat;
              background-size: 100%;
            }
            .niu10_t{
              background: url(../../../assets/img/game/pk10/n10-t.png) no-repeat;
              background-size: 100%;
            }
            .niu10_w{
              background: url(../../../assets/img/game/pk10/n10-w.png) no-repeat;
              background-size: 100%;
            }
            .res_w{
              background: url(../../../assets/img/game/pk10/w.png) no-repeat;
              background-size: 100%;
            }
            .res_t{
              background: url(../../../assets/img/game/pk10/t.png) no-repeat;
              background-size: 100%;
            }
            $name1:'1-1','2-1','3-1','4-1','5-1','6-1','7-1','8-1','9-1','10-1';
            $name2:'1-2','2-2','3-2','4-2','5-2','6-2','7-2','8-2','9-2','10-2';
            $name3:'1-3','2-3','3-3','4-3','5-3','6-3','7-3','8-3','9-3','10-3';
            $name4:'1-4','2-4','3-4','4-4','5-4','6-4','7-4','8-4','9-4','10-4';
            @each $n in $name1{
              .poker#{$n}{
                background: url('../../../assets/img/game/pk10/'+$n+'.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            @each $n in $name2{
              .poker#{$n}{
                background: url('../../../assets/img/game/pk10/'+$n+'.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            @each $n in $name3{
              .poker#{$n}{
                background: url('../../../assets/img/game/pk10/'+$n+'.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            @each $n in $name4{
              .poker#{$n}{
                background: url('../../../assets/img/game/pk10/'+$n+'.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
        .xian1 {
          width: 36.5%;
          // height: 6.68rem;
          border-left: none;
          display: inline-block;
        }
        .zhuang {
          display: inline-block;
          width: 27%;
          // height: 12.2rem;
          position: absolute;
          top: 0;
          left: 36.5%;
        }
        .xian5{
          width: 36.5%;
          // height: 6.68rem;
          display: inline-block;
          float: right;
        }
        .xian2{
          width: 36.5%;
          // height: 0;
          display: inline-block;
          position: absolute;
          top:55%;
          left:0;
        }
        .xian4{
          width: 36.5%;
          // height: 0;
          display: inline-block;
          position: absolute;
          top:55%;
          right:0;
        }
        .xian3{
          width: 27%;
          // height: 5.86rem;
          margin: 0 auto;
          position: absolute;
          top: 100%;
          left: 36.5%;
          z-index: 1;
          .res{
            // right:-0.8rem !important;
          }
        }
      }
      .history{
        width: 330px;
        height: 402px;
        float: right;
        p {
          text-align: center;
          font-size: 18px;
          line-height: 30px;
          background-color: #D7D7D7;
          border: 1px solid #767676;
        }
        .item {
          width: 100%;
          height: 372px;
          border: 1px solid #C4C4C4;
          border-top: none;
          overflow: auto;
          >div {
            width: 448px;
            span{
              display: inline-block;
              width: 45px;
              text-align: center;
              line-height: 18px;
              &:nth-child(1){
                width: 50px;
              }
              &:nth-child(2){
                width: 125px;
              }
            }
          }
          .tit{
            background-color: #E7E7E7;
            border-bottom: 1px solid #767676;
            border-top: none;
            span {
              border-right: 1px solid #767676;
              padding: 0 10px;
              &:last-child{
                border-right: none;
              }
            }
          }
          .list {
            background-color: #E7E7E7;
            // border-left: 1px solid #C4C4C4;
            // border-right: 1px solid #C4C4C4;
            padding: 3px 0;
            &:nth-child(2n){
              background-color: #fff;
            }
            span {
              border-right: 1px solid #C4C4C4;
              padding: 0 10px;
              line-height: 15px;
              &:last-child{
                border-right: none;
              }
            }
          }
        }
      }
    }
    .bet {
      margin-top: 45px;
      border-top: 1px solid #eee;
      padding: 20px 5px;
      width: 900px;
      div {
        display: inline-block;
        line-height: 30px;
        font-size: 14px;
        .money {
          background-color: rgb(221, 221, 221);
          margin: 0 10px;
          padding: 5px 10px;
          border-radius: 8px;
          line-height: 18px;
          display: inline-block;
          border: none;
          color: #495060;
          width: 80px;
        }
        .tag {
          background-color: rgb(221, 221, 221);
          border-radius: 15px;
          padding: 2px 5px;
          span {
            display: inline-block;
            width: 35px;
            text-align: center;
            line-height: 26px;
            border-radius: 11px;
            cursor: pointer;
            margin: 0 2px;
            &:hover{
              color: #FB2D47;
            }
          }
          .active {
            color: #fff !important;
            background: linear-gradient(top , rgb(252, 88, 109) 50% , rgb(253, 67, 90) 50% , rgb(253, 67, 90) 100%);
            background: -o-linear-gradient(top , rgb(252, 88, 109) 50% , rgb(253, 67, 90) 50% , rgb(253, 67, 90) 100%);
            background: -ms-linear-gradient(top , rgb(252, 88, 109) 50% , rgb(253, 67, 90) 50% , rgb(253, 67, 90) 100%);
            background: -moz-linear-gradient(top , rgb(252, 88, 109) 50% , rgb(253, 67, 90) 50% , rgb(253, 67, 90) 100%);
            background: -webkit-linear-gradient(top , rgb(252, 88, 109) 50% , rgb(253, 67, 90) 50% , rgb(253, 67, 90) 100%);
          }
        }
      }
      .betting {
        float: right;

        span {
          cursor: pointer;
          display: inline-block;
          color: #fff;
          line-height: 38px;
          padding: 0 20px;
          font-size: 18px;
          border-radius: 5px;
        }
        .add {
          background-color: #E9363C;
        }
        .keyBet {
          background-color: #3EACDD;
          margin-left: 10px;
        }
      }
    }
  }
  .entBet {
    border-radius: 30px;
    padding: 20px 40px;
    background-color: #fff;
    margin-top: 20px;
    .info {
      display: inline-block;
      span {
        color: rgb(234, 55, 64);
      }
    }
    .ent {
      cursor: pointer;
      float:right;
      display: inline-block;
      width: 120px;
      text-align: center;
      line-height: 40px;
      background-color: rgb(252, 88, 109);
      color: #fff;
      font-size: 16px;
      border-radius: 20px;
      background: linear-gradient(top , rgb(255, 88, 108) 47% , rgb(253, 67, 90) 57% , rgb(253, 67, 90) 100%);
      background: -o-linear-gradient(top , rgb(255, 88, 108) 47% , rgb(253, 67, 90) 57% , rgb(253, 67, 90) 100%);
      background: -ms-linear-gradient(top , rgb(255, 88, 108) 47% , rgb(253, 67, 90) 57% , rgb(253, 67, 90) 100%);
      background: -moz-linear-gradient(top , rgb(255, 88, 108) 47% , rgb(253, 67, 90) 57% , rgb(253, 67, 90) 100%);
      background: -webkit-linear-gradient(top , rgb(255, 88, 108) 47% , rgb(253, 67, 90) 57% , rgb(253, 67, 90) 100%);
      box-shadow: 0px 0px 8px 1px #ff586c;
      transition: transform 0.1s linear;
    }
    .ent:hover{
      transform: scale(1.1);
    }
  }
}
</style>

<style lang="scss">

</style>