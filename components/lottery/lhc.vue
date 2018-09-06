<template>
  <div>
    <table class="shuoming">
      <tbody>
        <tr class="color_hui">
          <td>玩法名称</td>
          <td>投注案例</td>
          <td>中奖条件</td>
        </tr>
        <tr>
          <td>特码</td>
          <td>48</td>
          <td>该期开奖号码中的特码为48</td>
        </tr>
        <tr>
          <td>色波</td>
          <td>红波</td>
          <td>该期开奖号码中的特码是以下号码之一：01 02 07 08 12 13 18 19 23 24 29 30 34 35 40 45 46</td>
        </tr>
        <tr>
          <td>特肖</td>
          <td>牛</td>
          <td>该期开奖号码中的特码为以下号码之一：09 21 33 45</td>
        </tr>
        <tr>
          <td>合肖</td>
          <td>鼠&amp;牛</td>
          <td>该期开奖号码中的特码为以下号码之一：09 10 21 22 33 34 45 46</td>
        </tr>
        <tr>
          <td>头尾数</td>
          <td>0头</td>
          <td>该期开奖号码中的特码为以下号码之一：01 02 03 04 05 06 07 08 09</td>
        </tr>
        <tr>
          <td>正码</td>
          <td>01</td>
          <td>该期开奖号码中的正码（第1-6位为正码）包含01</td>
        </tr>
        <tr>
          <td>正码特</td>
          <td>正一特01</td>
          <td>该期开奖号码中的第一位为01</td>
        </tr>
        <tr>
          <td>正码特1-6</td>
          <td>正码一单码</td>
          <td>该期开奖号码中的第一位为单数,如01,03等</td>
        </tr>
        <tr>
          <td>五行</td>
          <td>金</td>
          <td>该期开奖号码中的特码为以下号码之一：03 04 17 18 25 26 33 34 47 48</td>
        </tr>
        <tr>
          <td>平特肖一尾数</td>
          <td>鼠</td>
          <td>该期开奖号码包含以下号码之一：10 22 34 46</td>
        </tr>
        <tr>
          <td>正肖</td>
          <td>鼠</td>
          <td>该期开奖号码前六为包含以下号码之一：10 22 34 46</td>
        </tr>
        <tr>
          <td>七色波</td>
          <td>红波</td>
          <td>该期开奖号码中颜色最多的为红色</td>
        </tr>
        <tr>
          <td>总肖</td>
          <td>2肖</td>
          <td>该期开奖号码总共包含2个生肖</td>
        </tr>
        <tr>
          <td>自选不中</td>
          <td>01 02 03 04 05 06</td>
          <td>该期开奖号码不包含以下号码的任何一个：01 02 03 04 05 06</td>
        </tr>
        <tr>
          <td>连肖连尾</td>
          <td>2连肖-鼠&amp;牛</td>
          <td>该期开奖号码对应的生肖必须包含鼠和牛</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "lottery-lhc",
  props: ["game"]
};
</script>

<style>

</style>
