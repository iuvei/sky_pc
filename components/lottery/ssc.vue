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
          <td>五星</td>
          <td>直选</td>
          <td>4 5 6 7 8</td>
          <td>4 5 6 7 8</td>
          <td>猜开奖号码的全部五位</td>
        </tr>
        <tr>
          <td>四星</td>
          <td>直选</td>
          <td>* 5 6 7 8</td>
          <td>5 6 7 8</td>
          <td>猜开奖号码的后四位</td>
        </tr>
        <tr>
          <td rowspan="5">三星</td>
          <td>直选复式</td>
          <td>* * 6 7 8</td>
          <td>6 7 8</td>
          <td>猜开奖号码的(前/中)后三位</td>
        </tr>
        <tr>
          <td>直选和值</td>
          <td>* * 6 7 8</td>
          <td>21</td>
          <td>猜开奖号码的(前/中)后三位的和值</td>
        </tr>
        <tr>
          <td>直选跨度</td>
          <td>1 2 1 7 8</td>
          <td>7</td>
          <td>猜开奖号码后三位最大值与最小值之差</td>
        </tr>
        <tr>
          <td>组选三</td>
          <td>1 2 1 1 3</td>
          <td>1 1 3</td>
          <td>猜开奖号码(前/中)后三位，形态为组三</td>
        </tr>
        <tr>
          <td>组选六</td>
          <td>1 2 1 2 3</td>
          <td>1 2 3</td>
          <td>猜开奖号码的(前/中)后三位, 形态为组六</td>
        </tr>
        <tr>
          <td rowspan="3">二星</td>
          <td>直选复式</td>
          <td>4 5 6 7 8</td>
          <td>4 5</td>
          <td>猜开奖号码的前(后)两位</td>
        </tr>
        <tr>
          <td>直选和值</td>
          <td>4 5 6 7 8</td>
          <td>9</td>
          <td>猜开奖号码的前(后)两位的和值</td>
        </tr>
        <tr>
          <td>直选跨度</td>
          <td>4 5 6 7 8</td>
          <td>1</td>
          <td>猜开奖号码的前(后)两位的差值</td>
        </tr>
        <tr>
          <td>大小单双</td>
          <td>前(后)二</td>
          <td>4 5 6 7 8</td>
          <td>双大/小单/双单</td>
          <td>猜开奖号码的前(后)两位</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "lottery-ssc",
  props: ["game"]
};
</script>

<style>

</style>
