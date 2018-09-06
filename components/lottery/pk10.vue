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
          <td>前一</td>
          <td>直选复式</td>
          <td>05 06 ...</td>
          <td>05</td>
          <td>选号与开奖号码按位猜对一位即中奖</td>
        </tr>
        <tr>
          <td>前二</td>
          <td>直选复式</td>
          <td>05 06 07 ...</td>
          <td>05 06</td>
          <td>选号与开奖号码按位猜对两位即中奖</td>
        </tr>
        <tr>
          <td>前三</td>
          <td>直选复式</td>
          <td>05 06 07 08 ...</td>
          <td>05 06 07</td>
          <td>选号与开奖号码按位猜中三位即中奖</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "lottery-pk10",
  props: ["game"]
};
</script>

<style>

</style>
