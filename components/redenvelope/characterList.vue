<template>
  <div class="characterList">
    <div class="characterlist_rphb">
      <div class="characterlist_list">
        <div class="titex">
          人品榜单
        </div>
        <div class="titex_list">
          <ul>
            <li class="titex_list_top">
              <span>排名</span>
              <span>账号</span>
              <span>红包类型</span>
              <span>金额</span>
            </li>
            <Scroll height="530" v-if="characterList.length">
              <Card>
                <li v-for="(v,k) in characterList" :key="k">
                  <div class="rppm">
                    <div class="bjwo" v-if="(k + 1) * 1 === 1">
                      <img src="~/assets/img/rob/1.png" alt="">
                    </div>
                    <div class="bjto" v-else-if="(k + 1) * 1 === 2">
                      <img src="~/assets/img/rob/2.png" alt="">
                    </div>
                    <div class="bjsr" v-else-if="(k + 1) * 1 === 3">
                      <img src="~/assets/img/rob/3.png" alt="">
                    </div>
                    <div v-else>{{k + 1}}</div>
                  </div>
                  <span>{{v.username}}</span>
                  <span>{{v.reward_type}}</span>
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
      <myredpackets></myredpackets>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import myredpackets from './myRedPackets'
export default {
  name: 'characterList',
  components: {
    myredpackets
  },
  data() {
    return {}
  },
  mounted() {
    this.RobGiftUserRankingList()
  },
  methods: {
    ...mapActions('redenvelope', ['RobGiftUserRankingList'])
  },
  watch: {},
  computed: {
    ...mapState('redenvelope', ['characterList'])
  }
}
</script>
<style lang="scss">
.characterList {
  .ivu-scroll-wrapper {
    width: 100%;
    .ivu-scroll-container {
      .ivu-scroll-loader:first-child {
        display: none;
      }
      .ivu-scroll-content {
        .ivu-card-body {
          padding: 0;
          background: rgb(241, 234, 221) !important;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.characterList {
  width: 100%;
  height: 640px;
  min-height: 640px;
  background: #f7daae;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  .characterlist_rphb {
    width: 960px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    .characterlist_list {
      min-width: 424px;
      display: flex;
      flex-direction: column;
      align-content: center;
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
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
        background: rgb(241, 234, 221);
        border-radius: 10px;
        color: rgb(104, 25, 30);
        ul {
          width: 100%;
          height: 100%;
          li {
            width: 100%;
            min-height: 48px;
            font-size: 16px;
            line-height: 48px;
            border-bottom: 1px solid rgb(242, 219, 180);
            display: flex;
            justify-content: space-around;
            span:nth-child(1) {
              width: 16%;
            }
            span:nth-child(2) {
              flex: 1;
            }
            span:nth-child(3) {
              width: 22%;
            }
            span:nth-child(4) {
              width: 28%;
            }
            .rppm {
              width: 16%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-content: center;
              .bjwo,
              .bjto,
              .bjsr {
                width: 100%;
                height: 100%;
                padding-top: 7px;
                display: flex;
                justify-content: center;
                align-content: center;
                img {
                  width: 32px;
                  height: 32px;
                }
              }
            }
          }
          .titex_list_top {
            min-height: 52px;
            line-height: 52px;
            width: 96%;
          }
          .zwimg {
            margin: 0 auto;
            padding-top: 163px;
          }
        }
      }
    }
  }
}
</style>
