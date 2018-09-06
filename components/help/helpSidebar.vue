<template>
  <section class="sidebar-c">
    <div v-for="(item,key) in category" :key="key" class="item">
      <div class="item-title">
        <div>{{item.title}}</div>
      </div>
      <ul v-toggle="collapse[key]">
        <nuxt-link v-for="(v,k) in item.li" :key="k" :to="'/help/'+item.icon+'/'+v.url">
          <li :class="{active:liActive===('/help/'+item.icon+'/'+v.url)}">{{v.label}}</li>
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>
import category from './helpSidebarData.js'
import { toggle } from '~/directives/user/index'
export default {
    name: 'helpSidebar',
    data() {
        return {
            category,
            collapse: new Array(category.length).fill(true)
        }
    },
    directives: {
        toggle: toggle
    },
    computed: {
        liActive() {
            return this.$route.path
        }
    },
    methods: {
        toggle(key) {
            this.$set(this.collapse, key, !this.collapse[key])
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.collapse-transition {
    transition: 500 height ease-in-out, 500 padding-top ease-in-out,
        500 padding-bottom ease-in-out;
}
.sidebar-c {
    border: 1px solid #ddd;
    margin-top: 20px;
    .item {
        .item-title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            line-height: 42px;
            background: #e40e0e;
            font-size: 19px;
            font-weight: bolder;
            color: #fff;
            border-bottom: 1px Solid #d9d9d9;
            cursor: pointer;
            > div {
                text-align: center;
            }
        }
        li {
            height: 38px;
            display: flex;
            font-size: 13px;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #ddd;
            font-size: 15px;
            color: #5e5959;
        }
        .active {
            background: url(~assets/img/user_center_icons.png) no-repeat -8px -153px;
            color: #f13131;
        }
    }
}
</style>


