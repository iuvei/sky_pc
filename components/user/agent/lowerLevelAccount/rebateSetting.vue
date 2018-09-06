<template>
  <section class="rebate-setting">
    <div class="one-block">
      开户类型：
      <div :class="['check_box',{active: selectedAccountType === 1}]" @click="changeSelectedAccountType(1)">代理</div>
      <div :class="['check_box',{active: selectedAccountType === 0}]" @click="changeSelectedAccountType(0)">会员</div>
    </div>

    <div class="two-block">
      <div>下级返点赔率设置</div>
      <a href="#" @click="viewPl">点击查看返点赔率表</a>
    </div>

    <div class="three-block">
      <Row>
        <Col span="3">时时彩</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_ssc" :min="0" :step="0.1" v-model="rateSetting.vssc"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_ssc}},可为下级设置返点范围:0-{{rateSetting.fp_ssc}}</div>
        </Col>
        <Col span="3">快三</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_k3" :min="0" :step="0.1" v-model="rateSetting.vk3"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_k3}},可为下级设置返点范围:0-{{rateSetting.fp_k3}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="3">11选5</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_11x5" :min="0" :step="0.1" v-model="rateSetting.v11x5"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_11x5}},可为下级设置返点范围:0-{{rateSetting.fp_11x5}}</div>
        </Col>
        <Col span="3">3D</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_3d" :min="0" :step="0.1" v-model="rateSetting.v3d"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_3d}},可为下级设置返点范围:0-{{rateSetting.fp_3d}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="3">PK10</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_pk10" :min="0" :step="0.1" v-model="rateSetting.vpk10"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_pk10}},可为下级设置返点范围:0-{{rateSetting.fp_pk10}}</div>
        </Col>
        <Col span="3">PC蛋蛋</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_pcdd" :min="0" :step="0.1" v-model="rateSetting.vpcdd"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_pcdd}},可为下级设置返点范围:0-{{rateSetting.fp_pcdd}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="3">六合彩</Col>
        <Col span="9">
        <InputNumber :max="rateSetting.fp_lhc" :min="0" :step="0.1" v-model="rateSetting.vlhc"></InputNumber>
        <div class="desc">自身返点{{rateSetting.fp_lhc}},可为下级设置返点范围:0-{{rateSetting.fp_lhc}}</div>
        </Col>
        <!-- <Col span="3">使用域名: </Col>
        <Col span="9">
        <Select v-model="selectedDomain" style="width:200px">
          <Option v-for="item in domainList" :value="item.id" :key="item.id">{{ item.enom }}</Option>
        </Select>
        </Col> -->
      </Row>
    </div>

    <div class="four-block">
      <div class="check_box active" @click="generateCode">生成邀请码</div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "rebateSetting",
  data() {
    return {};
  },
  mounted() {
  },
  computed: {
    ...mapGetters("agent", ["rateSetting"]),
    ...mapState("agent", ["lowerLevelAccount"]),
    selectedAccountType() {
      return this.lowerLevelAccount.selectedAccountType;
    },
    domainList() {
      return this.lowerLevelAccount.domainList;
    },
    selectedDomain: {
      get() {
        return this.lowerLevelAccount.selectedDomain;
      },
      set(v) {
        let obj = {
          prefix: "lowerLevelAccount",
          params: { selectedDomain: v }
        };
        this.modifyField(obj);
      }
    }
  },
  methods: {
    ...mapActions("agent", ["modifyField", "createJoinCode"]),
    changeSelectedAccountType(n) {
      let obj = {
        prefix: "lowerLevelAccount",
        params: { selectedAccountType: n }
      };
      this.modifyField(obj);
    },
    async generateCode() {

      let { vssc, vk3, v11x5, v3d, vpk10, vpcdd, vlhc } = this.rateSetting;
      let data = await this.createJoinCode({
        vssc,
        vk3,
        v11x5,
        v3d,
        vpk10,
        vpcdd,
        vlhc
      });
      // console.error(data);
      if (data) {
        this.$Modal.success({
          title: "温馨提示",
          content: "创建成功!",
          onOk: () => {
            let obj = {
              prefix: "lowerLevelAccount",
              params: { view: "codeManage" }
            };
            this.modifyField(obj);
          }
        });
      }
    },
    viewPl(){
      window.open('/returnRateTable','_blank','width=1500,height=800,left=200,top=100')
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.rebate-setting {
  .ivu-input-number {
    width: 80%;
  }
}
</style>

<style lang="scss" scoped>
.rebate-setting {
  .two-block {
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px dashed #999;
    a {
      color: #2d8cf0;
    }
  }
  .three-block {
    padding: 10px 0;
    border-bottom: 1px dashed #999;
  }
  .four-block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>


