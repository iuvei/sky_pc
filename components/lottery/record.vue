<template>
  <div>
    <lot-head v-if="game" :game="game" @getDetail="getData" :data="data"></lot-head>
    <tab ref="tab" @setDay="getDay" @getDetail="getData" :game="game"></tab>
    <detail ref="table" :game="game" :data="data" :day="day"></detail>
    <k3 v-if="game && game.js_tag === 'k3'" :game="game"></k3>
    <lhc v-if="game && game.js_tag === 'lhc'" :game="game"></lhc>
    <ssc v-if="game && game.js_tag === 'ssc'" :game="game"></ssc>
    <pk10 v-if="game && game.js_tag === 'pk10'" :game="game"></pk10>
    <elevenx5 v-if="game && game.js_tag === '11x5'" :game="game"></elevenx5>
    <threed v-if="game && game.js_tag === '3d'" :game="game"></threed>
    <pcdd v-if="game && game.js_tag === 'pcdd'" :game="game"></pcdd>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import k3 from './k3';
import lhc from './lhc';
import ssc from './ssc';
import pk10 from './pk10';
import elevenx5 from './elevenx5';
import threed from './threed';
import pcdd from './pcdd';
import tab from './tab';
import detail from './table';
import LotHead from './LotHead';
import dayjs from 'dayjs';
export default {
  name: 'notice-record',
  props: ['game'],
  components: {
    k3,
    lhc,
    ssc,
    pk10,
    pcdd,
    elevenx5,
    threed,
    LotHead,
    tab,
    detail
  },
  watch: {
    game(val) {
      this.$refs.tab.curIndex = 0;
      this.$refs.table.spinShow = true;
    }
  },
  data() {
    return {
      info: {},
      day: '',
      data: [],
      kjList: []
    };
  },
  computed: {
    ...mapState('game', ['gameList'])
  },

  methods: {
    getDay(day) {
      this.$refs.table.spinShow = true;
      this.day = day;
    },
    getData(data) {
      this.data = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  padding-left: 20px;
  .container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .item {
      width: 315px;
      border: 1px solid #cacaca;
      border-radius: 6px;
      margin: 20px 20px 0 0;
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(1.06);
        box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.24);
      }
    }
  }
}
</style>


