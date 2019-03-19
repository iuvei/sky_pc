<template>
  <Modal v-model="show" width="30" class="remark-modal" :mask-closable="false" :transfer="false">
    <p slot="header" style="color:#f60;text-align:center">
      设置备注
    </p>
    <div style="text-align:center">
      <p>请输入备注</p>
      <p>
        <Input type="text" placeholder="请输入备注..." v-model="row.remark" />
      </p>
    </div>
    <div slot="footer" style="text-align:center">
      <Button type="error" :loading="modal_loading" @click="okClick">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    show: {
      get() {
        return this.modal;
      },
      set(v) {
        this.$emit('updateModelValue', v);
      }
    },
    row() {
      return Object.assign({}, this.data);
    }
  },
  methods: {
    ...mapActions('agent', ['setTuiguangRemark']),
    async okClick() {
      if (!this.row.remark || this.row.remark.length > 50) {
        this.$Message.error('备注不能为空,且不得高于50个字符!');
        return;
      }
      this.modal_loading = true;

      let data = await this.setTuiguangRemark(this.row);
      // console.error(data);
      this.modal_loading = false;
      this.$emit('updateModelValue', false);
    }
  }
};
</script>

<style lang="scss">
.remark-modal {
}
</style>


