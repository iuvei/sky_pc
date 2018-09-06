<template>
  <div class="common-menu " v-switchClass="{key:$route.params.id,class:'shake'}">
    <div class='bet-menu '>
      <div class="left">
        <div v-for="(item,idx) in data" :key="idx" :class="{active:idx==menuIdx}" @click="switchMenu(item,idx)">{{item.name}}</div>
      </div>
      <div class="right" v-show="!hideDouble && !hide">
        <div class="right-btn" :class="{active:officialType==0}" @click="switchOfficial(0)">
          <span>官方</span>
        </div>
        <div class="left-btn" :class="{active:officialType==1}" @click="switchOfficial(1)">
          <span>双面</span>
        </div>

      </div>
    </div>
    <div class="bet-submenu" v-if="data.length">
      <div class="item" v-for="(item,idx) in data[menuIdx].submenu" :key="idx">
        <div class="title">{{item.name}}：</div>
        <div v-for="(val,key) in item.playlist" :key="key" @click="playName(val)" class="td" :class="getPlayClass(val.playid)?'active':''">{{val.playname}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import switchClass from '../utils/directiveClass.js'
export default {
    name: 'betMenu',
    props: {
        animateKey: {
            default: 0
        },
        playConfig: '',
        hideDouble: {
            default: false
        }
    },
    directives: { switchClass },
    computed: {
        data() {
            this.showSwitch()
            const currentBet = this.$route.name.split('-')[1]
            const singleArr = ['k3', 'lhc', 'pcdd'],
                multiArr = ['ssc', '11x5', 'pk10', 'f3d']
            if (singleArr.includes(currentBet)) {
                return this.playConfig
            } else if (multiArr.includes(currentBet)) {
                let data = this.playConfig.filter(
                    item => item.showofficial == this.officialType
                )
                return data
            }
        }
    },
    data() {
        return {
            officialType: 0,
            menuIdx: Number,
            playId: 0,
            subMenu: [],
            hide: false
        }
    },
    methods: {
        getPlayClass(id) {
            return id == this.playId
        },
        resetActive() {
            if (!this.data.length) {
                this.playId = ''
                return
            }
            this.$nextTick(() => {
                this.playId = this.data[
                    this.menuIdx
                ].submenu[0].playlist[0].playid
            })
        },
        switchOfficial(k) {
            // if (!this.data.length) return;
            this.officialType = k
            this.menuIdx = 0
            this.resetActive()
        },
        switchMenu(item, idx) {
            this.menuIdx = idx
            this.resetActive()
        },

        playName(val) {
            this.playId = val.playid
            this.$nextTick(() => {})
        },
        showSwitch() {
            let officialCount = 0,
                doubleCount = 0
            this.playConfig.forEach(x => {
                x.showofficial ? officialCount++ : doubleCount++
            })
            if (officialCount === 0 || doubleCount === 0) {
                this.hide = true
                this.officialType = doubleCount ? 1 : 0
            } else {
                this.hide = false
            }
        }
    },
    watch: {
        playId(val) {
            let arr = []
            if (val) {
                this.data[this.menuIdx].submenu.forEach(v => {
                    arr = [...arr, ...v.playlist]
                })
            } else {
                this.$store.commit('gameBet/setBetPlay', {})
                return
            }
            this.$store.commit(
                'gameBet/setBetPlay',
                arr.filter(item => item.playid == val)[0]
            )
        },
        data: {
            deep: true,
            handler(val) {
                this.menuIdx = 0
                this.resetActive()
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@mixin menuRightSpan() {
    display: inline-block;
    width: 60px;
    height: 35px;
    text-align: center;
    background: #fff;
    color: #666;
}
.common-menu {
    background-color: #feffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .bet-menu {
        display: flex;
        align-items: center;
        height: 47px;
        background-color: #f5f5f5;
        font-size: 14px;
        border-radius: 8px;
        box-shadow: 4px 4px 1px rgba(183, 183, 183, 0.75),
            -4px 4px 1px rgba(183, 183, 183, 0.75);
        overflow: hidden;
        .left {
            display: flex;
            width: 820px;
            > div {
                height: 47px;
                line-height: 47px;

                padding: 0 20px;
                margin-right: 10px;
                font-size: 16px;
                cursor: pointer;
                &:hover {
                    // background-color: #fbd294;
                    background: linear-gradient(to bottom, #fbd294, #e23a20);
                    color: #fff;
                }
            }
            .active {
                background: linear-gradient(to bottom, #fbd294, #e23a20);
                // background-color: #fbd294;
                color: #fff;
            }
        }
        .right {
            display: flex;
            justify-content: center;
            width: 150px;
            height: 35px;
            > div {
                cursor: pointer;
                line-height: 35px;
            }
            .left-btn span {
                @include menuRightSpan();
                border-radius: 0 8px 8px 0;
                border-right: 1px solid #f3f3f3 !important;
            }
            .right-btn span {
                @include menuRightSpan();
                border-radius: 8px 0 0 8px;
                border-right: 0 solid #f3f3f3 !important;
            }
            .active span {
                background: #e93248;
                color: #fff;
            }
        }
    }
    .bet-submenu {
        padding: 10px 0;
        .item {
            display: flex;
            padding: 10px 20px;
            font-size: 14px;
            .title {
                display: flex;
                align-items: center;
                width: 80px;
                margin-right: 16px;
            }
            .td {
                min-width: 70px;
                padding: 4px 5px;
                text-align: center;
                border: 1px solid transparent;
                border-radius: 6px;
                cursor: pointer;
            }
            .active {
                border: 1px solid green;
            }
        }
    }
}
</style>
