<template>
  <div>
    {{str}}
  </div>
</template>

<script>
export default {
  name: 'AppTimer',
  props: {
    // 开奖时间集合
    openTime: {
      default: []
    },
    // 初始集合个数
    repeat: {
      default: '3'
    },
    // 使用封盘时间
    offset: {
      default: false
    },
    // 回调函数
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      str: '00:00:00',
      oldOpen: 0,
      timer: 0
    }
  },
  computed: {
    time() {
      return this.offset
        ? this.openTime[0].stopless || this.openTime[1].stopless
        : this.openTime[0].openless || this.openTime[1].openless
    },
    offsetSize() {
      return 4
    }
  },
  methods: {
    run() {
      this.lastTime = Math.floor(new Date() / 1000) + ~~this.time
      this.doRun()
      clearInterval(this.timer)
      this.timer = setInterval(this.doRun, 1000)
    },
    doRun() {
      let leftTime = this.lastTime - Math.floor(new Date().getTime() / 1000)
      if (leftTime > 0) {
        this.str = this.timestampTotime(leftTime)
      } else {
        clearInterval(this.timer)
        this.callback && this.callback(this.openTime.length, 0)
        this.str = '00:00:00'
      }
    },
    timestampTotime(time) {
      let t = {},
        str = ''
      t.s = time % 60
      time = Math.floor(time / 60)
      t.m = time % 60
      time = Math.floor(time / 60)
      t.h = time >= 10 ? time : ('0' + time)
      // t.d = Math.floor(time / 24);
      const ment = function(a) {
        if (a <= 0) return '00'
        return a < 10 ? '0' + a : a
      }
      const arr = ['d', 'h', 'm', 's']
      str += t.h ? t.h : '00'
      str += `:${ment(t.m)}`
      str += `:${ment(t.s)}`
      return str
    }
  },
  watch: {
    openTime(val) {
      if (val.length === this.repeat) {
        this.oldOpen = 0
      }
      // console.log('header watch run~~~~~~~~~~~~~', val.length, this.repeat)
      val.length && this.run()
    }
  },
  mounted() {
    this.run()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  activated() {
    this.run()
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>

