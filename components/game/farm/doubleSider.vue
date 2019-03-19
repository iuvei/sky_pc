<template>
  <div class="double_sider">
    <ul>
      <li v-for="(item, index) in dataSource" :key="index" :class="[{'zh': index==0}, 'else']">
        <div class="title">
          <span>{{item.name}}</span>
        </div>
        <ul>
          <li v-for="(x, y) in item.data" :key="y">
            <div>{{x.name}}</div>
            <div>{{x.peilv}}</div>
            <input type="number" v-model="x.price">
          </li>
        </ul>
      </li>
    </ul>
    <div class="all_control">
      设置下注金额
      <input type="number" v-model="allPrice">
      元
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataSource"],
  data() {
    return {
      allPrice: ''
    }
  }
}
</script>
<style lang="scss">
.double_sider {
  padding: 20px;
  font-size: 14px;
  >ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >li {
      border: 1px solid #ffd5d5;
      width: 23%;
      // margin-right: 20px;
      margin-bottom: 20px;
      .title {
        font-weight: 500;
        background-color: #f5f5f5;
        span {
          background-color: #e93248;
          color: #fff;
          display: inline-block;
          text-align: center;
          width: 75px;
          height: 36px;
        }
      }
      ul {
        li {
          border-top: 1px solid #ffd5d5;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-weight: 500;
          div, input {
            width: 30%;
            text-align: center;
          }
          input {
            height: 27px;
            border-radius: 8px;
            border: 1px solid #cacaca;
          }
        }
      }
      .title, ul > li {
        height: 36px;
        line-height: 36px;
      }
    }
    .zh {
      width: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          width: 25%;
          border-right: 1px solid #ffd5d5;
          &:nth-child(4n) {
            border-right: none;
          }
          &:nth-child(32) {
            border-bottom: 1px solid #ffd5d5;
          }
        }
      }
    }
  }
  .all_control {
    text-align: center;
    width: 100%;
    border: 1px solid #ffd5d5;
    height: 48px;
    line-height: 48px;
    font-weight: 400;
    color: rgb(102,102,102);
    input {
      text-align: center;
      height: 27px;
      border-radius: 8px;
      border: 1px solid #cacaca;
    }
  }
}
</style>

