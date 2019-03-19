<template>
  <div class="eventdetails">
    <div class="eventdetails_box">
      <div class="eventdetails_boxnr">
        <p class="redhdxq">活动详情:</p>
        <div v-html="redeventdetails.detail">
        </div>
        <div v-if="!redeventdetails.detail" style="text-align: center;padding-top: 120px;">
          <img class="zwimg" src="~/assets/img/rob/no-record.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'eventDetails',
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.RobEventGiftIndex()
  },
  methods: {
    ...mapActions('redenvelope', ['RobEventGiftIndex'])
  },
  watch: {},
  computed: {
    ...mapState('redenvelope', ['redeventdetails'])
  }
}
</script>

<style lang="scss" scoped>
.eventdetails {
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-content: center;
  background: #f7daae;
  .eventdetails_box {
    width: 1000px;
    margin-top: 36px;
    margin-bottom: 50px;
    min-height: 600px;
    border-radius: 10px;
    background: rgb(241, 234, 221);
    border: 1px solid rgb(241, 234, 221);
    .eventdetails_boxnr {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      padding: 20px;
      overflow: auto;
      .redhdxq {
        height: 30px;
        font-size: 20px;
        color: rgb(104, 25, 30);
        margin-bottom: 20px;
      }
    }
  }
}
</style>
