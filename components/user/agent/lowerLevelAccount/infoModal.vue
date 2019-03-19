<template>
  <Modal v-model="show" width="50" class="remark-modal" :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center">
      赔率详情
    </p>
    <div style="text-align:center">
      <div class="three-block">
        <Row>
          <Col span="3">时时彩</Col>
          <Col span="9">
          <Input readonly :value="data.fp_ssc"></Input>
          <div class="desc">自身返点{{rateSetting.fp_ssc}},可为下级设置返点范围:0-{{rateSetting.fp_ssc}}</div>
          </Col>
          <Col span="3">快三</Col>
          <Col span="9">
          <Input readonly :value="data.fp_k3"></Input>
          <div class="desc">自身返点{{rateSetting.fp_k3}},可为下级设置返点范围:0-{{rateSetting.fp_k3}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="3">11选5</Col>
          <Col span="9">
          <Input readonly :value="data.fp_11x5"></Input>
          <div class="desc">自身返点{{rateSetting.fp_11x5}},可为下级设置返点范围:0-{{rateSetting.fp_11x5}}</div>
          </Col>
          <Col span="3">3D</Col>
          <Col span="9">
          <Input readonly :value="data.fp_3d"></Input>
          <div class="desc">自身返点{{rateSetting.fp_3d}},可为下级设置返点范围:0-{{rateSetting.fp_3d}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="3">PK10</Col>
          <Col span="9">
          <Input readonly :value="data.fp_pk10"></Input>
          <div class="desc">自身返点{{rateSetting.fp_pk10}},可为下级设置返点范围:0-{{rateSetting.fp_pk10}}</div>
          </Col>
          <Col span="3">PC蛋蛋</Col>
          <Col span="9">
          <Input readonly :value="data.fp_pcdd"></Input>
          <div class="desc">自身返点{{rateSetting.fp_pcdd}},可为下级设置返点范围:0-{{rateSetting.fp_pcdd}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="3">六合彩</Col>
          <Col span="9">
          <Input readonly :value="data.fp_lhc"></Input>
          <div class="desc">自身返点{{rateSetting.fp_lhc}},可为下级设置返点范围:0-{{rateSetting.fp_lhc}}</div>
          </Col>
          <Col span="3">其他</Col>
          <Col span="9">
          <Input readonly :value="data.fp_other"></Input>
          <div class="desc">自身返点{{rateSetting.fp_other}},可为下级设置返点范围:0-{{rateSetting.fp_other}}</div>
          </Col>
        </Row>
      </div>
    </div>
    <div slot="footer" style="text-align:center">
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'remarkModal',
  model: {
    prop: 'modal',
    event: 'updateModelValue'
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      modal_loading: false
    };
  },
  computed: {
    ...mapGetters('agent', ['rateSetting']),
    show: {
      get() {
        return this.modal;
      },
      set(v) {
        this.$emit('updateModelValue', v);
      }
    }
  },
  methods: {
    ...mapActions('agent', ['modifyField', 'getUserJoinCodeList']),
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modal2 = false;
        this.$Message.success('Successfully delete');
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
.remark-modal {
}
</style>


