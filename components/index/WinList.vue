<template>
  <div class="index-userwinlist">
    <Card>
      <p slot="title" class="title">
        <i></i>中奖信息</p>
      <div>
        <rollnotice autoplay="2000" :height="220" :itemHeight="45">
          <rollnotice-item v-for="(item, index) in list" :key="index">
            <div>
              <img src="~/assets/img/user_head_icon_head.jpg" alt="">
              <span>
                {{item.username}}*** <br>喜中
              </span>
              <span>
                在{{item.gamename}}<br>
                <span style="color:red">￥ {{item.win}}</span>
              </span>
            </div>
          </rollnotice-item>
        </rollnotice>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import rollnotice from "./rollnotice";
import rollnoticeItem from "./rollnotice-item";

export default {
  name: "index-userwinlist",
  components: {
    rollnotice,
    rollnoticeItem
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions({
      getUserWinList: "game/getUserWinList"
    })
  },
  async created() {
    this.list = await this.getUserWinList();
  }
};
</script>

<style scoped>
/* .index-userwinlist p {
  font-size: 12px;
} */
/* .index-userwinlist p > span {
  color: red;
} */
.title {
  display: flex;
  font-size: 14px;
}
.title i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-position: -323px -37px;
  background-repeat: no-repeat;
  background-image: url(~/index_footer.png);
  margin-right: 4px;
}

.ivu-card {
  height: 290px;
  width: 230px;
}
.index-userwinlist .ivu-card-body > div {
  overflow: hidden;
  height: 220px;
}
.index-userwinlist .yd-rollnotice-item div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.index-userwinlist .yd-rollnotice-item div > span {
  margin: 0 0 0 18px;
}
</style>
<style>
.index-userwinlist .ivu-card-body {
  padding: 10px 16px;
}
.yd-rollnotice-item img {
  width: 34px;
  height: 34px;
}
</style>

