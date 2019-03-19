<template>
  <section>
    <div class="head">热门彩种推荐</div>
    <div class="main">
      <div v-for="(item,key) in hotData" :key="key" class="item">
        <div class="item-icon"><img :src="item.icon" alt=""></div>
        <div class="item-info">
          <div class="name">{{item.game_name}}</div>
          <div class="btn" @click="click(item)">基本走势</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'trendHot',
  computed: {
    ...mapState('game', ['gameList']),
    hotData() {
      //  为热门标识 且不为体彩 且 不是扑克、梯子, 电子
      let excludeArr = ['xypk', 'tzyx']
      return this.gameList.filter(
        v =>
          v.hot === 1 &&
          v.js_tag !== 'sport_key' &&
          !excludeArr.includes(v.js_tag) &&
          v.tag !== 'mg'
      )
    }
  },
  methods: {
    click(item) {
      this.$emit('callback', item)
    }
  }
}
</script>
<style lang='scss' scoped>
.trend-hot {
  .head {
    margin-left: 20px;
    border-left: 2px solid #e93248;
    padding-left: 8px;
    height: 26px;
    font-size: 18px;
    text-align: left;
    color: #313131;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 195px;
      height: 80px;
      display: flex;
      padding: 10px;
      margin: 20px 0 0 28px;
      border: 1px solid #f1f0f0;
      border-radius: 8px;
      &:hover {
        border-color: red;
      }
      &-icon {
        height: 70px;
        img {
          height: 62px;
          width: 62px;
        }
      }
      &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .name {
          font-size: 16px;
        }
        .btn {
          width: 66px;
          height: 26px;
          border-radius: 3px;
          background-color: #e93248;
          color: #fff;
          text-align: center;
          line-height: 26px;
          cursor: pointer;
          &:hover {
            background-color: red;
          }
        }
      }
    }
  }
}
</style>