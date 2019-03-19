<template>
  <div class="myredpackets">
    <div class="myredpackets_list">
      <div class="titex">
        我的红包
      </div>
      <div class="titex_list">
        <div class="titex_list_top">
          <div class="titex_list_top_left">
            <span>红包总额:<i>{{myredPackets.sum_price * 1 || 0 }}</i></span>
          </div>
          <div class="titex_list_top_right">
            <span>红包个数:<i>{{myredPackets.number * 1 || 0 }}</i></span>
          </div>
        </div>
        <ul>
          <li class="titex_list_center">
            <span>时间</span>
            <span>红包类型</span>
            <span>金额</span>
          </li>
          <Scroll :on-reach-bottom="handleReachBottom" :height="462" v-if="myredPackets.list">
            <Card>
              <li v-for="(v,k) in myredPackets.list" :key="k">
                <span>{{v.date}}</span>
                <span>{{v.type}}</span>
                <span>{{v.price}}</span>
              </li>
            </Card>
          </Scroll>
          <div v-else>
            <img class="zwimg" src="~/assets/img/rob/no-record.png" alt="">
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'myredpackets',
  components: {},
  data() {
    return {
      pageid: 0,
      count: ''
    }
  },
  mounted() {
    this.getMyGiftList()
  },
  methods: {
    ...mapActions('redenvelope', ['getMyGiftList']),
    // 获取红包分页列表
    async handleReachBottom() {
      let params = {
        pageid: this.pageid++
      }
      return new Promise(resolve => {
        setTimeout(() => {
          this.getMyGiftList(params)
          resolve()
        }, 1000)
      })
    }
  },
  watch: {},
  computed: {
    ...mapState('redenvelope', ['myredPackets'])
  }
}
</script>
<style lang="scss">
.myredpackets {
  .ivu-scroll-wrapper {
    width: 100%;
    .ivu-scroll-container {
      .ivu-scroll-loader:last-child {
        padding-top: 30px;
      }
      .ivu-scroll-content {
        .ivu-card-bordered {
          border: 0 solid #dcdee2;
          border-color: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.myredpackets {
  min-width: 400px;
  min-height: 640px;
  background: #f7daae;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  .myredpackets_list {
    min-width: 424px;
    display: flex;
    flex-direction: column;
    .titex {
      width: 100%;
      color: #000;
      font-size: 24px;
      height: 56px;
      display: flex;
      justify-content: center;
    }
    .titex_list {
      width: 100%;
      height: 591px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      background: rgb(241, 234, 221);
      border-radius: 10px;
      color: rgb(104, 25, 30);
      .titex_list_top {
        width: 100%;
        height: 60px;
        font-size: 20px;
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        i {
          font-style: normal;
          color: rgb(207, 69, 60);
          padding-left: 8px;
        }
        .titex_list_top_left {
          margin-left: 20px;
        }
        .titex_list_top_right {
          margin-right: 20px;
        }
      }
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 47px;
          font-size: 16px;
          line-height: 47px;
          border-bottom: 1px solid rgb(242, 219, 180);
          display: flex;
          justify-content: space-around;
          span:nth-child(1) {
            flex: 1;
          }
          span:nth-child(2) {
            width: 22%;
          }
          span:nth-child(3) {
            width: 26%;
          }
        }

        .titex_list_center {
          width: 96%;
          height: 60px;
          line-height: 60px;
        }
        .zwimg {
          margin: 0 auto;
          padding-top: 100px;
        }
      }
    }
  }
}
</style>
