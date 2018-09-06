<template>
  <section class="sidebar-c">
    <div v-for="(item,key) in category" :key="key" class="item">
      <div class="item-title" @click="toggle(key)">
        <div class="icon" :class="item.icon"></div>
        <div>{{item.title}}</div>
        <div class="arrow" :class="{'close':!collapse[key]}"></div>
      </div>
      <ul v-toggle="collapse[key]">
        <nuxt-link v-for="(v,k) in item.li" :key="k" :to="'/user/'+item.icon+'/'+v.url">
          <li :class="{active:liActive===('/user/'+item.icon+'/'+v.url)}">{{v.label}}</li>
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>
import category from "./userSidebarData.js";
import { toggle } from "~/directives/user/index";
export default {
  name: "userSidebar",
  data() {
    return {
      category,
      collapse: new Array(category.length).fill(true),
    };
  },
  directives: { toggle: toggle },
  computed: {
    liActive() {
      return this.$route.path;
    },
  },
  methods: {
    toggle(key) {
      this.$set(this.collapse, key, !this.collapse[key]);
      // if (this.keyActive.includes(key)) {
      //   this.keyActive.splice(this.keyActive.indexOf(key), 1);
      // } else {
      //   this.keyActive.push(key);
      // }
    },
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.collapse-transition {
  transition: 500 height ease-in-out, 500 padding-top ease-in-out,
    500 padding-bottom ease-in-out;
}
.sidebar-c {
  border: 1px solid #ddd;
  .item {
    // height: 31px;
    .item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      line-height: 35px;
      padding: 0 4px;
      background: #f3f3f3;
      font-size: 14px;
      color: rgba(79, 80, 80, 1);
      border-bottom: 1px Solid #d9d9d9;
      cursor: pointer;
      > div {
        text-align: center;
      }
      .icon {
        width: 30px;
        height: 30px;
        background: url("~assets/img/user_center_icons.png") no-repeat;
      }
      .arrow {
        width: 30px;
        height: 24px;
        background: url("~assets/img/select_arrow.png") center center no-repeat;
        background-size: 10px 10px;
        transition: all 0.5s;
      }
      .close {
        transform: rotate(90deg);
      }

      .acount {
        background-position: 0px 0px;
      }
      .betting {
        background-position: 0px -31px;
      }
      .promotion {
        background-position: -26px -60px;
      }
      .property {
        background-position: 0px -62px;
      }
      .agent {
        background-position: 0px -93px;
      }
      .message {
        background-position: 0px -124px;
      }
    }

    li {
      height: 31px;
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
    }
    .active {
      background: url(~assets/img/user_center_icons.png) no-repeat 15px -155px;
      color: #f13131;
    }
  }
}
</style>


