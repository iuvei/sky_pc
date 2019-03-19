<template>
  <div class="wrap minheight">
    <ul v-if="(data && data.length) && !($route.params.id || $route.query.id)">
      <li
        v-for="(item, index) in data"
        :key="index"
        @click="setCurNew(item)"
      >
        <em>【 {{item && item.source}} 】</em>
        <a @click.stop.prevent="setCurNew(item)">{{item.title}}</a>
        <span class="time">{{item.time | format}}</span>
      </li>
    </ul>
    <div
      class='nothing'
      v-if="!(data && data.length) && !($route.params.id || $route.query.id)"
    >
      暂无资讯
    </div>
    <nuxt-child v-if="$route.params.id" />
    <news-content v-if="$route.query.id"></news-content>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
;
import newsContent from './news/_id.vue'
export default {
  name: 'news',
   
  data() {
    return {
      pageid: 0,
      curNew: null,
      data: []
    };
  },

  components:{
    newsContent
  },

  methods: {
    ...mapActions('sysinfo',['getNews']),
    setCurNew(item) {
      this.curNew = item;
      if(process.env.static){
        this.$router.push(`/news?id=${item.id}`);
      }else{
        this.$router.push(`/news/${item.id}`);
      }
    }
  },
  filters: {
    format(val) {
      if (val) {
        return dayjs(val * 1000).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  },
  async asyncData({ store }) {
    if(process.env.static) return
    const _data = await store.dispatch('sysinfo/getNews', 0);
    let __data = []
    if(Array.isArray(_data) && _data.length){
      __data = JSON.parse(JSON.stringify(_data))
    }
    return {
      data: __data.reverse()
    };
  },
  async created() {
    if(process.browser && process.env.static){
      const _data = await this.$store.dispatch('sysinfo/getNews', 0);
      let __data = []
      if(Array.isArray(_data) && _data.length){
        __data = JSON.parse(JSON.stringify(_data))
      }
      this.data = __data.reverse()
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 10px;
  border: 1px solid #ddd;
  ul {
    li {
      width: inherit;
      padding: 10px;
      font-size: 14px;
      line-height: 22px;
      border-bottom: 1px dashed #ddd;
      &:hover {
        background: #fffdfa;
      }
      em {
        color: #e93248;
        font-style: inherit;
      }
      a {
        width: inherit;
        padding-left: 10px;
        color: #333333;
        font-size: 14px;
        text-decoration: none;
      }
      span {
        width: inherit;
        display: inline-block;
        float: right;
        color: #797979;
      }
    }
  }
}

.minheight {
  min-height: calc(100vh - 402px);
}

.wrap ul li:hover em,
.wrap ul li:hover a,
.wrap ul li:hover span {
  color: #e93248;
}
.nothing {
  text-align: center;
  font-size: 24px;
  color: #ccc;
}
</style>


