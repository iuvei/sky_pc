<template>
  <div class="wrap" :class="{'minheight': !data.length}">
    <ul v-if="(data && data.length) && !$route.params.id">
      <li v-for="(item, index) in data" :key="index" @click="setCurNew(item)">
        <em>【 {{item && item.source}} 】</em>
        <a @click.stop.prevent="setCurNew(item)">{{item.title}}</a>
        <span class="time">{{item.time | format}}</span>
      </li>
    </ul>
    <div class='nothing' v-if="!(data && data.length) && !$route.params.id">
      暂无资讯
    </div>
    <nuxt-child v-if="$route.params.id" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "news",
  data() {
    return {
      pageid: 0,
      curNew: null,
      data: []
    };
  },
  async asyncData({ store }) {
    let _data = await store.dispatch("sysinfo/getNews", 0);
    return {
      data: _data.reverse()
    };
  },
  methods: {
    async getData() {
      this.data = await store.dispatch("sysinfo/getNews", 0);
    },
    setCurNew(item) {
      this.curNew = item;
      this.$router.push(`/news/${item.id}`);
    }
  },
  filters: {
    format(val) {
      if (val) {
        return dayjs(val * 1000).format("YYYY-MM-DD HH:mm:ss");
      }
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


