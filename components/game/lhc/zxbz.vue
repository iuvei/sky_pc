<template>
  <div class="special" style="padding:20px 0">
    <div class="head" style="width:600px;border-bottom:1px solid #ffd5d5;">
      <div class="tr">
        <div>种类</div>
        <div>六不中</div>
        <div>七不中</div>
        <div>八不中</div>
        <div>九不中</div>
        <div>十不中</div>
        <div>十一不中</div>
      </div>
      <div class="tr">
        <div>赔率</div>
        <div v-for="(item,index) in odds" :key="index" :class="{active:odd === item}">
          {{item}}
        </div>
      </div>
    </div>

    <div class="head col-5" style="margin-top:20px;">
      <div class="tr" v-for="k in 5" :key="k">
        <div>号码</div>
        <div>选择</div>
      </div>
    </div>

    <div class="body col-5">
      <div class="tr" v-for="(item,key) in dataSource[0].option" :key="key" @click="selectItem(item)">
        <div class="wave-ball">
          <color-ball :num="item.label"></color-ball>
        </div>
        <div v-if="item.label">
          <Checkbox v-model="item.selected" size="large"></Checkbox>
        </div>
      </div>
      <div class="tr" v-for="(item,index) in pushdata" :key="'d'+index">

        <div class="wave-ball">

        </div>
        <div v-if="item.label">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ColorBall from "./ColorBall";
export default {
  name: "zxbz",
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    odd: {
      type: [Number, String],
      default() {
        return "";
      }
    },
    odds: {
      type: Array,
      default() {
        return [];
      }
    },
    pushdata: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ColorBall
  },
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>




