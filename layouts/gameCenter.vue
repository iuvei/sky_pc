<template >
  <div class="app" :class="{'game-hall':!showFooter}">
    <IndexHeader></IndexHeader>
    <nuxt class="game-layout" />
    <IndexFooter class="footer" v-show="showFooter"></IndexFooter>
    <gameModal> </gameModal>
  </div>

</template>
<script>
import components from "~/components/index/";
import gameModal from "~/components/game/gameModal";
export default {
  name: "user",
  components: { ...components, gameModal },
  data(){
    return {
      showFooter: true
      }
  },
  created() {
    if (process.browser) {
      this.$Message.config({
        top: window.screen.availHeight / 3
      });
    }

    if (process.browser) {
      let web_title =
        this.$store.state.sysinfo.sysinfo.web_title ||
        window.localStorage.getItem("web_title") ||
        " ";
      web_title && window.localStorage.setItem("web_title", web_title);
      window.document.title = web_title;
    }
    // console.log(object);
  },
  mounted() {
    this.showFooter = !(this.$route.name==='game');
  },
  watch:{
    '$route'(val){
      //  console.log(this.$route.name,this.$route.name==='game',this.$route);
       this.showFooter = !(this.$route.name==='game');
    },
  }

};
</script>


<style lang="scss">
.app {
  min-width: 1000px;

  .game-layout {
    // overflow-y: scroll;
    margin: 5px auto;
    padding-top: 5px;
    background-color: rgb(209, 209, 209);
  }
}
.game-hall {
  height: 100vh;
  overflow: hidden;
  .game-menu {
    max-height: calc(100vh-150px);
    overflow-y: scroll;
  }
  .game-layout {
    height: calc(100vh-115px);
    .content {
      overflow: hidden;
      padding-bottom: 30px;
    }
  }
  .game-view {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
