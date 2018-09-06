<template>
  <div>
    <table class="shuoming">
      <tbody>
        <tr class="color_hui">
          <td colspan="2">玩法</td>
          <td>开奖示例</td>
          <td>投注示例</td>
          <td>中奖规则</td>
        </tr>
        <tr>
          <td rowspan="7">三星</td>
          <td>直选(复式)</td>
          <td rowspan="2">6 7 8</td>
          <td rowspan="2">6 7 8</td>
          <td rowspan="2">猜中全部号码且顺序相同</td>
        </tr>
        <tr>
          <td>直选(单式)</td>
        </tr>
        <tr>
          <td>直选(和值)</td>
          <td>13</td>
          <td>13</td>
          <td>猜中三个号码的和值</td>
        </tr>
        <tr>
          <td>组选(组三)</td>
          <td>1 1 3</td>
          <td>1 1 3</td>
          <td>猜中全部号码且开奖号码为组三形态, 顺序不限</td>
        </tr>
        <tr>
          <td>组选(组六)</td>
          <td>1 2 3</td>
          <td>1 2 3</td>
          <td>猜中全部号码且开奖号码为组六形态，顺序不限</td>
        </tr>
        <tr>
          <td>组选和值(组三)</td>
          <td>5(1 1 3)</td>
          <td>5(1 1 3)</td>
          <td>猜中号码和值且开奖号码为组三形态，顺序不限</td>
        </tr>
        <tr>
          <td>组选和值(组六)</td>
          <td>6(1 2 3)</td>
          <td>6(1 2 3)</td>
          <td>猜中号码和值且开奖号码为组六形态，顺序不限</td>
        </tr>
        <tr>
          <td rowspan="2">二星</td>
          <td>直选</td>
          <td>7 8</td>
          <td>7 8</td>
          <td>猜中全部号码，且顺序相同</td>
        </tr>
        <tr>
          <td>组选</td>
          <td>7 8</td>
          <td>6 7 8</td>
          <td>猜中2个或2个以上号码，顺序不限</td>
        </tr>
        <tr>
          <td colspan="2">大小单双</td>
          <td>6 7 8</td>
          <td>大单</td>
          <td>猜前(后)2位奖号的大小单双组合特征</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "lottery-3d",
  props: ["game"]
};
</script>

<style>

</style>
