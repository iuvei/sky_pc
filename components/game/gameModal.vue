<template>
  <div v-show="visible" class="app-modal">
    <div class="modal-mask"></div>
    <div class="modal-wrap" @click.self="clickMask">
      <div :class="[customClass,'modal']">
        <a class="ivu-modal-close" @click="clickMask">
          <i class="ivu-icon ivu-icon-ios-close-empty"></i>
        </a>
        <div class="head">
          <span>{{title}}</span>
        </div>
        <component :is="component" v-if="component" class="body"></component>
        <div v-else v-html="content" class="body"> </div>
        <div class="footer" v-show="showFoot">
          <button class="ivu-btn ivu-btn-info confirm" v-show="confirmType" @click="beforeClose(true)">{{confirmText}}</button>
          <button class="ivu-btn ivu-btn-error cancel" v-show="cancelType" @click="beforeClose(false)"> {{cancelText}}
            <span v-if='timer'>({{timer}})</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import { setInterval } from "timers";
export default {
  name: "GameModal",
  computed: {
    ...mapState("modal", [
      "visible",
      "customClass",
      "title",
      "content",
      "component",
      "componentData",
      "showFoot",
      "confirmText",
      "confirmType",
      "cancelText",
      "cancelType",
      "maskClosable",
      "delay",
      // "onOk",
      "beforeClose",
    ]),
  },
  data() {
    return {
      modal10: true,
      timer: 0,
    };
  },
  methods: {
    ...mapMutations("modal", ["changeModal"]),
    clickMask() {
      this.changeModal({ visible: false });
    },
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.delay) {
          this.timer = this.delay;
          clearInterval(window.modalTimer);
          window.modalTimer = setInterval(() => {
            this.timer--;
            if (!this.timer) {
              clearInterval(window.modalTimer);
              this.changeModal({ visible: false, delay: 0 });
            }
          }, 1000);
        }
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.app-modal {
  .modal {
    z-index: 1004;
    width: 500px;
    margin: 0 auto;
    position: relative;
    outline: none;
    top: 100px;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
    overflow: hidden;
    .ivu-modal-close .ivu-icon {
      transition: all 0.5s ease-in-out;
      color: #fff;
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 41px;
    background-color: #e93248;
    padding: 0 16px;
    font-size: 16px;
    color: #fff;
  }
  .body {
    padding: 6px 10px;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    // height: 42px;
    padding: 6px 40px 16px;
    button {
      margin-right: 10px;
      font-size: 14px;
    }
  }
  .modal-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1002;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
  }
}
</style>