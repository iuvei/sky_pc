<template>
  <div clsss="wrap">
    <div
      class="title"
      v-if="curNew"
    >{{curNew.title}}</div>
    <div class="sec">来源：{{curNew && curNew.source}}</div>
    <div
      class="content"
      v-if="curNew"
      v-html="htmlcontent"
    ></div>
    <div class="bottom">
      <div class="pre">
        <a @click.stop.prevent="toLink(preLink)">上一篇：{{preLink.title}}</a>
      </div>
      <div class="next">
        <a @click.stop.prevent="toLink(nextLink)">下一篇：{{nextLink.title}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import cheerio from 'cheerio';

export default {
  name: 'news-detail',
  computed:{
    ...mapState('sysinfo', ['news']),
     curNew() {
      const id = this.$route.params.id || this.$route.query.id
      if (this.news && Array.isArray(this.news) && this.news.length) {
        return this.news.find(x => x.id == id);
      } else {
        const news = this.$store.dispatch('sysinfo/getNews', 0);
        if(news && news.length) return news.find(x => x.id == id)
        return {}
      }
      return {};
    },
    curNewIndex() {
      if (this.news && Array.isArray(this.news) && this.news.length) {
        return this.news.findIndex(x => x.id == this.curNew.id);
      }
      return 1
    },
    htmlcontent() {
      let output = '';
      if (this.curNew && this.curNew.content) {
        let div = null;
        if (process.server) {
          div = cheerio.load('<div></div>')[0];
        } else {
          div = document.createElement('div');
        }
        if (div) {
          div.innerHTML = this.curNew.content;
          output = div.innerText || div.textContent;
          div = null;
        }

        return output;
      }
    },
    preLink() {
      return this.news[this.curNewIndex - 1] || { title: '没有了', link: '#' };
    },
    nextLink() {
      return this.news[this.curNewIndex + 1] || { title: '没有了', link: '#' }
    }
  },
  methods: {
    toLink(link) {
      if (link.id) {
        const path = process.env.static ? `/news?id=${link.id}` : `/news/${link.id}`
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 10px;
  border: 1px solid #ddd;
  .title {
    margin: 0px auto;
    font-size: 26px;
    line-height: 50px;
    text-align: center;
    color: #333;
    font-weight: 500;
    background: #fff;
  }
  .sec {
    margin: 0px auto;
    border-bottom: 1px dashed #ccc;
    color: #888;
    font-size: 14px;
    padding: 5px;
  }
  .content {
    padding: 15px 30px;
    width: auto;
    font-size: 14px;
    line-height: 2;
    img {
      margin: 10px auto;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > a {
        color: #666;
        &:hover {
          color: #f30;
        }
      }
      &:first-child {
        justify-content: flex-start;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  }
}
</style>
