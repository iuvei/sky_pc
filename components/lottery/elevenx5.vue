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
          <td rowspan="4">三星</td>
          <td>直选(复式)</td>
          <td rowspan="4">* * 6 7 8</td>
          <td rowspan="4">* * 6 7 8</td>
          <td rowspan="2">猜开奖号码的(前/中)后三位,顺序须一致</td>
        </tr>
        <tr>
          <td>直选(单式)</td>
        </tr>
        <tr>
          <td>组选(复式)</td>
          <td rowspan="2">猜开奖号码的(前)后三位, 顺序不限</td>
        </tr>
        <tr>
          <td>组选(单式)</td>
        </tr>
        <tr>
          <td rowspan="4">二星</td>
          <td>直选(复式)</td>
          <td rowspan="4">* * * 7 8</td>
          <td rowspan="4">* * * 7 8</td>
          <td rowspan="2">猜开奖号码的(前)后两位,顺序须一致</td>
        </tr>
        <tr>
          <td>直选(单式)</td>
        </tr>
        <tr>
          <td>组选(复式)</td>
          <td rowspan="2">猜开奖号码的(前)后两位，顺序不限</td>
        </tr>
        <tr>
          <td>组选(单式)</td>
        </tr>
        <tr>
          <td colspan="2">任选一</td>
          <td>04 05 06 07 08</td>
          <td>06</td>
          <td>猜开奖号码的任意一位</td>
        </tr>
        <tr>
          <td colspan="2">任选二</td>
          <td>04 05 06 07 08</td>
          <td>04 07</td>
          <td>猜开奖号码的任意两位</td>
        </tr>
        <tr>
          <td colspan="2">任选三</td>
          <td>04 05 06 07 08</td>
          <td>04 07 08</td>
          <td>猜开奖号码的任意三位</td>
        </tr>
        <tr>
          <td colspan="2">任选四</td>
          <td>04 05 06 07 08</td>
          <td>04 05 07 08</td>
          <td>猜开奖号码的任意四位</td>
        </tr>
        <tr>
          <td colspan="2">任选五</td>
          <td>04 05 06 07 08</td>
          <td>04 05 06 07 08</td>
          <td>猜开奖号码的任意五位</td>
        </tr>
        <tr>
          <td colspan="2">任选六</td>
          <td>04 05 06 07 08</td>
          <td>01 04 05 06 07 08</td>
          <td>猜开奖号码的任意六位</td>
        </tr>
        <tr>
          <td colspan="2">任选七</td>
          <td>04 05 06 07 08</td>
          <td>01 02 04 05 06 07 08</td>
          <td>猜开奖号码的任意七位</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'lottery-11x5',
  props: ['game']
};
</script>

<style>
</style>
