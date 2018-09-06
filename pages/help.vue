<template>
    <div class="main">
        <helpSidebar class="sidebar"></helpSidebar>
        <div class="agent_that">
            <div class="top_content">
                <h2>{{topIcon.label}}</h2>
            </div>
            <nuxt-child/>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import helpSidebar from "~/components/help/helpSidebar.vue";
import category from "~/components/help/helpSidebarData.js";
import { find, compact } from "lodash";
export default {
  layout: "user",
  name: "help",
  data() {
    return {};
  },
  computed: {
    topIcon() {
      let s = compact(this.$route.path.split("/"));
      let item = find(category, o => o.icon === s[1]);
      item = item || {};
      item = find(item.li, o => o.url === s[2]);
      item = item || {};
      return item;
    }
  },
  components: {
    helpSidebar
  },
  methods: {
    test() {
      this.$store.dispatch("http");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  .sidebar {
    width: 20%;
  }
  .agent_that {
    margin-top: 20px;
    width: 100%;
    margin-left: 15px;
    border: 1px solid #cccccc;
    background-color: #fff;
    color: rgba(26, 25, 25, 0.851);
    .top_content {
      width: 90%;
      height: 32px;
      h2 {
        height: 35px;
        margin-top: 50px;
        margin-left: 60px;
        color: rgba(0, 0, 0, 0.893);
        border-bottom: solid 1px #dbdbdb;
      }
    }
  }
}
</style>
