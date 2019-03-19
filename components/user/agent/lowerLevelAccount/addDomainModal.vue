<template>
  <Modal v-model="show" width="30" class="remark-modal" :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center">
      域名添加
    </p>
    <div style="text-align:center;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="域名:" prop="enom">
          <Input v-model="formValidate.enom" placeholder="请输入域名,不用带http://...."></Input>
        </FormItem>

        <FormItem label="邀请码:" prop="ptype">
          <Select v-model="formValidate.ptype">
            <Option value="0">不填</Option>
            <Option value="1">必填</Option>
          </Select>
        </FormItem>

        <FormItem label="解析IP:" prop="ip">
          <Select v-model="formValidate.ip" placeholder="-- 请选择IP --">
            <Option v-for="ip in IPS" :key="ip.id" :value="ip.id">{{ip.ip}}</Option>
          </Select>
        </FormItem>

        <FormItem label="备注:" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
        </FormItem>
      </Form>
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
      modal_loading: false,
      IPS: [],
      formValidate: {
        enom: '',
        ptype: '0',
        ip: '-1',
        remark: ''
      },
      ruleValidate: {
        enom: [
          {
            required: true,
            message: '请输入域名地址',
            trigger: 'blur'
          }
          // { type: "url", message: "Incorrect url format", trigger: "blur" }
        ]
        // time: [
        //     { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        // ]
      }
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
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions('agent', ['modifyField', 'getEnomLIplist', 'addNewUserEnom']),
    handleSubmit(name) {
      console.error(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.handleOk();
          // this.$Message.success("Success!");
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async handleOk() {
      let data = (await this.addNewUserEnom(this.formValidate)) || [];
      this.show = false;
      // console.error(data);
    },
    async initData() {
      let data = (await this.getEnomLIplist()) || [];
      this.IPS = data;
      // console.error(data);
    }
  }
};
</script>

<style lang="scss">
.remark-modal {
}
</style>


