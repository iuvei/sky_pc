<template>
  <div class="marquee">
    <span class="sprite-index_footer index_footer-gonggao"></span>
    <marquee scrollamount="3 " v-if="syscontent && syscontent.length">
      <span v-for="(item, index) in syscontent" :key="index" v-html="item.content"></span>
    </marquee>
    <div v-if="!syscontent || !syscontent.length" class="no_content">暂无公告</div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import decodeFunc from '~/plugins/App/Utils/decode.js'
export default {
  name: 'index-marqueue',
  serverCacheKey() {
    return Math.floor(Date.now() / 1000 * 60 * 60 * 24);
  },
  data() {
    return {
      syscontent: []
    }
  },
  methods: {
    ...mapActions('user', ['getSystemNotice'])
  },
  async beforeMount() {
    let temp = await this.getSystemNotice()
    let arr = Array.isArray(temp) && temp.length ? temp : []
    if(arr && arr.length){
      arr.forEach(x=>{
        x.content = decodeFunc(x.content) || ''
      })
    }

    this.syscontent = arr;
  }
};
</script>

<style>
.marquee {
  position: relative;
  height: 28px;
  background-color: #efefef;
}
.marquee .index_footer-gonggao {
  height: 17px;
  width: 17px;
  display: block;
  float: left;
  position: absolute;
  left: 8px;
  top: 5px;
  background-position: -348px -1px;
}
.sprite-index_footer {
  display: inline-block;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url(~/index_footer.png);
}

/* .marquee span {
  height: 17px;
  width: 17px;
  display: block;
  float: left;
  position: absolute;
  left: 8px;
  top: 5px;
} */

.marquee marquee {
  width: 480px;
  line-height: 28px;
  color: rgb(233, 50, 72);
  font-family: microsoft yahei;
  font-size: 12px;
  margin-left: 26px;
}
.marquee .no_content {
  text-align: center;
  line-height: 28px;
}
</style>
