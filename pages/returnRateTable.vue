<template>
  <div class="returnRateTable_main_body">
    <ul class="tab-tag">
      <li :class="{'tab-selected': tab_tag === el.tag}" @click="changeTag(el.tag)" v-for="el in lotteryOptions" :key="el.tag">{{el.label}}</li>
    </ul>
    <div class="returnRateTable_main_content">
      <ul class="left">
        <li class="title">
          <span>玩法</span>
          <p></p>
          <span>返点</span>
        </li>
        <li v-for="(item, index) in rowsTitle" :key="index">{{item.wanfa}}</li>
      </ul>
      <div class="right">
        <ul>
          <li v-for="(el,index) in renderCol" :key="index">
            {{el}}
            <span @click="toggleClick(el)" class="toggle-action">{{renderActionText(el)}}</span>
          </li>
        </ul>
        <ul v-for="(item, index) in rowsTitle" :key="index" class="content">
          <li v-for="(value, indexs) in renderCol" :key="indexs">
            赔率:{{item.list['fp_'+value]}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import http from "~/api/http";
export default {
  layout: "index",
  components: {},
  data() {
    return {
      tab_tag: "ssc",
      lotteryOptions: [
        {
          label: "时时彩",
          tag: "ssc"
        },
        {
          label: "PK拾",
          tag: "pk10"
        },
        {
          label: "快3",
          tag: "k3"
        },
        {
          label: "11选5",
          tag: "11x5"
        },
        {
          label: "PC蛋蛋",
          tag: "pcdd"
        },
        {
          label: "3D",
          tag: "3d"
        },
        {
          label: "六合彩",
          tag: "lhc"
        }
      ],
      rowsTitle: [],
      interval: 0, // 区间值，默认显示整数
      rowsContent: [] // 渲染列
    };
  },
  computed: {
    renderCol() {
      let data = this.rowsContent;
      if (this.interval === 0) {
        data = data.filter(el => {
          return el % 10 === 0;
        });
        if (data[0] !== this.rowsContent[0]) {
          data.unshift(this.rowsContent[0]);
        }
      } else {
        let minRate = Math.floor(this.interval / 10) * 10 + 1;
        if (minRate > this.interval) minRate -= 10;
        data = data.filter(el => {
          return el - minRate >= 0 && el - this.interval <= 0;
        });
      }
      return data;
    }
  },
  mounted() {
    this.getBaseData();
  },
  methods: {
    changeTag(tag) {
      this.interval = 0;
      this.tab_tag = tag;
      this.getBaseData();
    },
    toggleClick(rate) {
      this.interval = this.interval === rate ? 0 : rate;
    },
    renderActionText(rate) {
      let s = "";
      if (this.interval === 0 && rate != 0) {
        s = "展开";
      } else if (this.interval === rate) {
        s = "收回";
      }
      return s;
    },
    getBaseData() {
      http({
        loading: true,
        ac: "getFPInfoBy0",
        tag: this.tab_tag
      }).then(res => {
        this.rowsTitle = res;
        const cols = Object.keys(res[0].list)
          .map(el => el.replace(/fp_/, ""))
          .sort((a, b) => b - a);
        this.rowsContent = cols;
        // console.error(Object.getOwnPropertyNames(this.rowsContent))
        // console.error(Object.keys(this.rowsContent))
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.returnRateTable_main_body {
  padding: 20px 0;
  .tab-tag {
    padding-left: 30px;
    li {
      display: inline-block;
      width: 173px;
      line-height: 44px;
      text-align: center;
      color: #ffffff;
      background-image: url(~/assets/img/returnRateTable-tab-default.png);
      margin-right: -30px;
      cursor: pointer;
    }
    .tab-selected {
      color: #666666;
      background-image: url(~/assets/img/returnRateTable-tab-selected.png);
    }
  }
  .returnRateTable_main_content {
    display: flex;
    .left {
      width: 148px;
      list-style: none;
      li {
        width: 148px;
        height: 40px;
        font-size: 13px;
        line-height: 40px;
        color: #333;
        font-weight: 500;
        text-align: center;
        border: 1px solid #dbdbdb;
      }
      .title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        span {
          width: 70px;
          line-height: 25px;
          &:first-child {
            align-self: flex-end;
          }
          &:last-child {
            align-self: flex-start;
          }
        }
        p {
          position: absolute;
          border: 1px solid #dbdbdb;
          width: 150px;
          transform: rotate(14deg);
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      ul {
        flex-wrap: nowrap;
        display: flex;
        li {
          width: 120px;
          text-align: center;
          height: 40px;
          font-size: 13px;
          line-height: 40px;
          color: #333;
          border: 1px solid #dbdbdb;
          position: relative;
          .toggle-action {
            position: absolute;
            top: -9px;
            right: 3px;
            cursor: pointer;
            color: #aaa;
          }
        }
      }
      .content {
        li {
          height: 40px;
        }
      }
    }
  }
}
</style>


