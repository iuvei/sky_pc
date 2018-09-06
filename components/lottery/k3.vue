<template>
  <div>
    <table class="shuoming">
      <tbody>
        <tr class="color_hui">
          <td colspan="2">玩法</td>
          <td>开奖号码示例</td>
          <td>投注号码示例</td>
          <td>中奖规则</td>
        </tr>
        <tr>
          <td rowspan="2">三同号</td>
          <td>单选</td>
          <td>1 1 1</td>
          <td>1 1 1</td>
          <td>至少选择一个三同号投注，猜中即中奖</td>
        </tr>
        <tr>
          <td>通选</td>
          <td>1 1 1</td>
          <td>三通号通选</td>
          <td>至少选择一个三同号投注，猜中即中奖</td>
        </tr>
        <tr>
          <td rowspan="2">三不同号</td>
          <td>标准</td>
          <td>1 2 3</td>
          <td>1 2 3</td>
          <td>竞猜开奖号码的3个号码</td>
        </tr>
        <tr>
          <td>胆选</td>
          <td>1 2 3</td>
          <td>1 2 3</td>
          <td>竞猜开奖号码中的3个号码，胆码(1-2个),拖码(1-5个)</td>
        </tr>
        <tr>
          <td>二同号</td>
          <td>复选</td>
          <td>1 1 5</td>
          <td>1 1</td>
          <td>竞猜开奖号码中的二同号数字(即对子号码),非对子不中奖</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "lottery-k3",
  props: ["game"],
  created() {
  }
};
</script>

<style>

</style>
