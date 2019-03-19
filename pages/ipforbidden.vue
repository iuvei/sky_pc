<template>
  <div class="container">
    <img class="logo" v-if="error && error.data" :src="error.data.pc_logo" alt="">
    <img class="logo" style="width:166px;height:237px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAADtCAYAAAA1Fw7YAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAFbBJREFUeJztnXmYFNW5h99pdkTmAlLKRRSD0eSCmiuCeoNx47pcYxJjxF0Tl2iiEhOXxOW6XONKjEaTuGuM16hxjSIqRkMUN1xQIIoGFBGEKQQEFBRlJn983UzTdvd0dy3fOafO+zz1MF3T3fWbqh+n6pzzne9ramlpwVOWDYEhwOD8timwARAA/YC+QPf81q3ks58Cn+S3JcBiIAQ+AN4F5uS3t4GFCf4NxhMEQdn9nVPWYSI5YCiwPbAVsE3+374RvrNbfmtGDF6NpcC0ou0F4B9Aa4TjW09TBlvMHDACGA2MAnZEDGQSy4DngMnAX4EXcdSolVrMrBizGfgmsDewF3IrtonFwKPAI8B4xLhOkEVj9gK+AxwI7AF01ZUTG6uBicCfgb8Ay3XlRCNLxtwJOBoYA/RQ1pI0q4C7gRuBp5W1NITrxuwFHAUcD3xVWYsWM4HrEJN+pKylZlw15r8DYxFDmtaB0WIZYtCrgPnKWjqkkjFzKeuIi02Aa5GxwJ/jTVlMM3A68A5yjjbRldMYthlzAPAbYBZwHNBFV47RdEHO0Szgt8i5swZbjNkDOAc5yWPxhqyHLsAJwGzgPCzpEJpuzCZkuOdN4Hygp64cq+kBnIucy4ORc2ssJhtzCPA4cCcwSFmLSwwC/gQ8AWyurKUiJhqzM3AqMB3YXVmLy+yKzM3/HANjJkwz5hbAs8A4LHkWspwewCXIvPwWylrWwSRjHgO8ggRYeNJlO2Aq8ENtIQVMMGZv4B7gBmA9ZS1ZpicyMH8f8G/KWtSNORR4CdhfWYennf2QMLthmiI0jTkGCYr9sqIGT3k2R67NQVoCNIzZhAyW34W/dZtMT+AOZPw49THPtI3ZFbgF+WM9dnAOcCspx7OmacxmJAL7yBSP6YmHw4HHSDFYJi1j9kGirndL6Xie+NkFuYapLEtJw5j9gaeAkSkcy5MsI4FJyDVNlKSN2R/4O8pDD55YGYbMFCVqziSN2Qd4kuwudXCZIci1Tey2npQxm5Hlpr6ldJdhwAQS6hAlYcyuyLSWf6Z0n5HAAyQwlBS3MZuQOW/f+84OuyArM2MdhI/bmOcAR8T8nR7zORxZthEbcRpzDDGL81jFOcQ4tx6XMYcCN8f0XR57uYmYOrxxGLM3cD8+IMMjgR/3E0M8ZxzGvAUfuuZpZ3NiuHtGNeYxwHejivA4x35EXKYRxZhbAFdGObjHaa4gwgK3Ro3ZGbgd/1zpqUxPxCMNLQ1u1Jg/RVbWeTzV2A44pZEPNpKGcAiSjMCv+/bUwidIsYVZ5X4ZVxrCJuB6vCk9tdMd8UxdU5b1GvNA/Dy4p352pc5ZoXqM2QO4rC45Hk87l1JHtr56jHkaPuuap3EGIZmOa6LWzs8AJPGnf7b0RGEV0nleUNgRtfNzBt6Unuj0AM6u5Y21GHMTpCqExxMHx1JDwYJajHkmPue5Jz66AGd19KaOnjEHImU5vDHl+Wgy8DqSx3wmMBcp97yi6H2dkNWD/ZG54i3z23BkoNkDnwGbAfMbLQt9Etk25TRkYd0TwBSkjmNHrEHMGiLlnYvpj6yR2QP4HgbkoVSiC/ATqvTSq7WYvYB5ZK+4Uwjclt9eS/A43ZCKwEcA+yAtbZZYBmwcBEHZ8oLVnjGPIVumnI08mG+KFCdI0pQAnwL3At9GAq2vRm5xWaEZ8VhZqhnTmHzcCfMBcCKSMeRGJOggbd5BCmttDvxR4fhaVBztqWTMnchGapfrkdbqd5jRWs1F0jTuCMxQ1pIGW4ZhuFO5X1QyZsUm1hHmA6ORWosfKmspx/PAtkipk1ZlLUlzbLmd5To/6wMtuDvT8xhwCLBEW0iN7I5Uh9tAW0hCrAIGBEGwrHhnuRbzO7hryl8hPWBbTAkyVDUcd2/tPYBvle4sZ8wxyWtRYSwSIbVGW0gDzAVGAX/TFpIQX/Bc6a28GRnHSzURfAochax/t52ewHgk8NYlVgNB8e28tMX8Ju6Z8se4YUqAlcg1ekpbSMx0BfYt3lFqzL3T05IKFwLXaIuImZXIoPxMbSEx8z/FL4pv5TnkNp5KVYIUuB8pBdimLSQhvgS8jDvz7YuR23krrNtijsAdU85CBqpdNSXA28Bh2iJipB9FlZeLjTk6fS2J8DkyTrmiozc6wMPIrJUrrPVgsTFHKQhJgsuQ6rFZ4XRkrt0F1nqw8IyZQwadbY8mehtJIqsRiKHJnkiVENtZBvQNgqC10GIOxX5TguTJyZopQaZZH9YWEQPNiBfX3sq319MSGy8gpT2yyum40dnbHtqNubWikLg4T1uAMq8D92iLiIGtwR1jTkduZ1lnnLaAGHDKmNfgxm0sKi8CL2mLiMhaY26EFCS1ldXAXdoiDOL/tQVEpE8YhgNyyNSWzYzHrvjKpPkTMslgM5vlgMHaKiLiW8t1WYT9cZuDbTdmG/ZfhCR4XFtARKw35jSkhfCsi+3/WQfnsDuiaJK2AEOZCizXFhGBfjmgfFYjO3hVW4ChrEHuJrYS2N5ivqUtwGBsPjf9bDema8sL4uQNbQER6JdDso7ZyDL8+GU1bI7R7JZDCgTZSKgtwHDqLnlnEN1tbjHL5lX0rMXm89Mtar1yTWweDkmDldoComCzMT3VsTraymZj9tYWYDhW15K32ZhWn/gUsPr85ICPtUU0SH9tAYZj84zexzns7UT0wZ30KElgc5zt8hwyUG0rW2oLMBibz80y2435FW0BBmO9MRd0+DZz8SXwypPD7gWGC3LAQm0VEdhFW4ChbI3dz98Lc0hpEVvZFuirLcJAdtMWEJH5OeBdbRURaAJ21hZhILtrC4jIuzkkQ5rNHKQtwDD6Yn+u09k54J/aKiLyLdzIVBcXB2J/gYdZhbzrS7WVRKA7cIC2CIM4QltARJYGQRAW5sptXrgEUhPSI73xHbRFRGQatAdxTFcUEgfb4V5RpkY4TVtADEyHdmO6sAz2XG0BymwBHKwtIgamQrsxn1MUEhc7A3tpi1DkIqCTtogYeB7ajTkTN8qPXAF00RahwM5IsS3bWU5+SXbBmK3As2py4uMrwC+0RaRMN+A6bREx8Vy5ymi2J2IqcBZ2BzDUy/nYHUlUzBOFH3LldlpONyR5aU9tISmwO1KtwhXWNo7FxpyKO5kthuLO7a0Sg4A7kHgBF1hCvkcO6xpzDTAhdTnJcRjuPm/2Ah7ErXVPE4IgWFN4UbpK0oXqWsVcjFsVakHmwe8BvqYtJGYeKn5RasxHkCoQLnErbgw8Q7sp99QWEjOrKanTVGrMZcDE1OSkQw4pMXKktpCI9ATuA/bVFpIAjwRBsM7as3IJD25PSUya5IA/AP+LnZ2FDZG03vso60iKO0t3lDPmeOzOFFaN/wPuBtbXFlIH2wMvAyO0hSTER5Q8X0J5Y36EXDxX2R8ZlhipLaQDcsiowmRgoLKWJLkrCIIvZIOplLvo5oTFaDMEmYL9FWYOxG+F6LsY6KysJWluKbezkjEnI2WGXaYTcAqSRP9QzEgwtgFwNdKiu1BDviNmBEHwTLlfVLsYVyckxjQGIr32acAYdFqoDYFLgDnAibgRvlYLFT3W1NJSMVX3esA87F443whzkB78bSS7gjSHrGY8HFmzZGvK8Ub5EBgYBEHZzMfVWsyPgWsTkWQ2g4HzgNnA08DJwDbEM8zUCwlmvhx4DxlUPozsmRKkxnzFdNzVWkyQW8wc7K1sEScfIEadgTyXvoEki1iCxLMW0x3JT/llJCRtS2A4MhKQxUDmUj4BNgXCICifxrOj56kWpNf0o3h1WckGwH75rZTiWYsumNnTN4mb6KAcTkctJsDGSFIE32p64uATZLjufYBKLWYtQyTzcD+20ZMe15I3ZTVqHbu7CHenKT3psQK4sJY31mrMEDGnxxOFi5BOZIfUM9txBXanLPToMge4stY312PMT5ApPI+nEU5FPFQT9c4P34tb64I86TAB8U7NNBK4cCKwqoHPebLJKsQzddGIMd8Bzmzgc55scibimbpoNNTrKiQ0zuOpxmTEK3XTqDFbgaOBzxr8vMd9ViMeKY0jqIkowbFvAZdF+LzHbS5DPNIQUaO2LwBei/gdHvd4BfFGw0Q15qdIkKutFXw98bMcWQkQKXFGHOtc/ok8S3g8AD9AgqwjEdcCrHtosPflcYrfINlCIhPnysDTgBdj/D6PXTxPjLk64zTmauR50+ZiVp7GWIpUZIstIVvca6nfxf7kVZ76ORSYG+cXJrHI/yH8+GaWuBRJXxkrSWWfOAsom2HB4xRPIdc6dpIy5ufIWNaihL7fo0+IJMRd09EbGyHJfD3vI4v5G5or9RhNK3AINSwqa5SkE0lNJOLUlMdILiDh8jtpZDi7AHgyheN40uFxJAFuoqRhzDXIs8iCFI7lSZbUHs/SygmZ6IOyJxXWIIPoVVO7xEWayUr/Dpyd4vE88XImKa5aSDuL7qX4VZY2Mh4Yl+YB0zZmG5Ko9L2Uj+tpnMI0c1uaB9XIO74ECfbw64XM5zNkoiT14rdaCfFfwK1yxq5yKjBF48CalRpiCyr1JMK9KAZ/axqzDTiKZBPwexpjFnJt1NCubbMM+B6yqM1jBkYsMNQ2JkixpZO1RXjWchLwqrYIE4wJkv7Yxaq/tnE7cIO2CDDHmADHA29qi8gwrwPHaYsoYJIxP0Iq41YsSuRJjJXIeOUXquBqYZIxAf4BnKAtIoMch5x7YzDNmCB1HG/SFpEhbkKKvBqFicYE6RlO1xaRAV6jgWy/aWCqMVchz5u+tlByrEDGK2tO2J8mphoTJFnXMdoiHOYo5BwbicnGBLgL+J22CAe5GkmEZiymGxOkttBL2iIc4kUkashobDDmp8gY24faQhwg9uRXSWGDMUHKcXxfW4QDHEkDpU00sMWYAH8BLtcWYTHjkIRnVmCTMQHOAJ7VFmEhz2BZ0TDbjPkZ8oy0WFuIRSxCztnn2kLqwTZjAsxDEoWmumrPUtqQzBnztYXUi43GBHgMKcruqc4FSGIz67DVmADn4pN1VeNJUkh+lRQ2G3MNcktv0RZiIAuQ/JXW5oqy2ZgAC4GD8Mlhi2lFEphZ/R/WdmMCTEJu6x7hbCSBmdW4YEyAC4FHtUUYwKPAJdoi4sAVYxaSdc3TFqLIezg0jOaKMQE+QII9rBpIjonCxEPqya+SwiVjAjwH/EJbhAKnI3+7M7hmTIBfAw9oi0iRB5AEZU7hojELybqsCO+KyNtIOKATz5XFuGhMkIDYA7AgIDYChQDqZdpCksBVYwK8DPxUW0SCnIz8jU7isjEBfo8saHONO5BEZM7iujEBjgXe0hYRI28CP9QWkTRZMOYKJDmskQv762Ql8uzsfCKILBgTJN3Mj7VFxMAJZCR1TlaMCXALcKu2iAjcgiQcywRZMiZIqzlDW0QDzCBj6RmzZszCM5oxCUproJDQdpW2kDTJmjEBZmJXsi7XRhVqIovGBLgTuE5bRA38HtGaObJqTICfAK9oi6jCK8DPtEVokWVjmjzX/CEZL8yVZWMCzAZ+oC2iDFmJjqpI1o0JcD9wpbaIIi5HNGUab0zhdOB5bRGIhjO0RZiAN6ZgwpqZxcgY62eKGozBNmNuCQxM6LvnIgmoNEhjledA5PxZgS3GHER71rIkM5c9Alyc4PdX4qL8sZOkcO4ORc6n0TS1tBifSeQwoC9wVUrH64QkpPpGSsebBIwm3TxDY5FHB/WKx0EQlN1vcovZFbgRGEx6pgQxyEGkk/unBckzlHbyq6uALyHnt2vKx64JU43ZjOTA7AX8UuH4C5BbXpLJulqRjGwLEzxGNS4AeiPnuVlJQ0VMNGYfYDKwLbqhXk8A5yf4/Sbk9/wRMAI5332UtayDacbsCjwIDEOqwmrnWv8l8HgC32tKRuTFwA3I+X4Qg27rphlzHDAq/7MJpT9akVt6nCMB85EOnSk5PQvneRRy/o3AJGN+A+ktFjAlBnER0hmKo4PyOTKQ/0EM3xUXs4t+Hkt6oxFVMcmYvy553V1FRXkmE0+yrjOQmjsm0aXkdel1UMEUY+4CDC/Zt42CjmpcDoyP8HlTK7ttXfJ6OHI9VDHFmGPK7Ds4dRXVaQOOAOY08Nk5SHidicmvDimzr9z1SBVTjLlzmX37I0NGJlGoXltPoMVqJDhjaSKKojEc+G6Z/eWuR6qYYswtyuxrQtaBr5eylo6YQn1LHkytt74e8EfkPJdS7nqkiinG7Fxh/zDgbgwaX8vzW+CeGt735/x7TaMrov8/Kvy+0vVIDVOMWe3WuDdSjaFfSlpq5ShgVpXfz8LMZcIbIGX89qryHvWYUFOMObOD3+8KTAW2T0FLrRSSdS0v87vlyLPbilQVdcwOyOrLjp4hO7oeiWOKMSfV8J5ByBjglUjwgQm8BuwITEA6OauBh5H/QCYlv+qN5Gl/htpiMSclqqYGmtra9EcwwjD8L+obeF6AFPC8GeV01pXiCWslDMOYlJSlK/LIcS6wUR2f+3oQBM8mI6k2jGgx8yehHmMOAK5BnuPGYmDYljLNyMjB28h5qseUz2ibEgwxZp6fUX9gwyDkFvU+EvQ6Im5RljECOQ/vI7NM9a6PasWQ7B/GGDMIgik0Ht3SEzgaGWOcjdRTHE75MTqXaEL+zkuQv3sKch56Nvh94/LXQR0jnjELhGHYGek87BHTVy5EhkYeQ4JyY48WV3jG3AjYDRnu2QPYMJKAdiYC+wRBYETJQ6OMCRCG4frAX4GRCXz9O0hpu2eQ4afpRMxnnrAxewFbAf8JfB0ZAdgs0gHLMwUYHQSBMcNbxhkTIAzDZmTWJK6WsxJtiFmnIdUgZiMdhtnIGu8OW48YjNkZ2BgYgiwQG4Ks/94aMWHSjyMTgTFBEBiVXMxIYwKEYdgFeYA/SVMGcvtfgAQML0UGz5cjWeI+Rcxd7qI2I6bqlv+5d37rA/RHRhY2AqI5OxpXA6cEQaA+01OKscYsEIbhAUixpb7aWhxiCXA8cHfUFj8pjOmVVyIIgruRYI7btLU4wm3AUCQ4xliMbzGLCcNwFHL7+Zq2FguZikxGTC7e6VvMGAiCoLDefD/gVWU5tvAqcr6GU2JKk7GqxSwmDMMmYF+kczRaWY6JPI7Egj5ElSUdpraY1hqzQH4ccHOk8Of3kR5vVgmRqP/rqR4ruhZvzIQoGaDuhKzwOwCJh8yCSRcB9yGdmUnUuf7dGzMhqsycdEIW7/83sCcye+LC3HkbEuw7Mb89TYRkDN6YCVHHXHM/JBJ+h/y2LdAjIVlxsgox4vP57W/EmNPJGzMhIgTadkbmobcBvprfhiH5ODVa1jZk/fkM4I389hoyn59YYIWpxlRfDafI58jY3tSS/d2QuetNkHjPQfnXfYq2vvl/OyEpVsqFma1EFnWtQaYyl+T/LWzzgPfy29z868wWnCrlX12ZNxlsIbafAAAAAElFTkSuQmCC">
    <div class="content">
      <h1 class="title center">非常抱歉给您带来了不便..</h1>
      <p class="center">由于您的IP所在地不在我们的服务区范围内</p>
      <p class="center">我们暂时无法为您服务。</p>
      <p class="center">如有误判，请点击联系在线客服 谢谢！</p>
    </div>
    <a class="service" v-if="error && error.data" :href="error.data.service_host_url.replace(/\\u0026amp;/g,'&').replace(/&amp;/g,'&')" target="_blank">在线客服</a>
    <div style="display:none" v-if="error && error.data">{{error.data.ip}}</div>
  </div>
</template>

<script>
import mcache from 'memory-cache'
;
export default {
  name:'ipforbidden',
  layout: 'index',

  data() {
    return {
      error: {}
    };
  },
  asyncData({ store, route, redirect, req }) {
    if(process.env.static) return
    const sysErr = mcache.get('system_error');
    if(sysErr){
      return {
        error: sysErr
      }
    }
  },
  created(){
    if(!process.browser) return
    if(process.env.static){
      const system_error = JSON.parse(sessionStorage.getItem('system_error'))
      const storeError = this.$store.state.sysinfo.error
      if(storeError && Object.keys(storeError).length){
        this.error = storeError
        sessionStorage.setItem('system_error', JSON.stringify(this.$store.state.sysinfo.error))
      }else if(system_error){
        this.error = JSON.parse(system_error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 420px;
  margin: 0 auto;
  .logo {
    width: 210px;
    height: auto;
    display: block;
    margin: 60px auto 0 auto;
  }
  .position {
    width: 166px;
    height: 218px;
  }
  .content {
    widows: 420px;
    margin: 0 auto;
    border-bottom: 1px solid #e7e7e7;
  }
  .title {
    color: #d81616;
    margin: 40px auto;
    font-size: 32px;
  }
  p {
    color: #8a8a8a;
    font-size: 18px;
    margin: 20px auto;
    &:last-child() {
      margin-bottom: 40px;
    }
  }
  .center {
    text-align: center;
  }
  .service {
    color: #ff0000;
    width: 268px;
    height: 60px;
    background: #ffe8e6;
    border-radius: 4px;
    border: 1px solid #ff0000;
    display: block;
    font-size: 24px;
    margin: 30px auto;
    line-height: 60px;
    text-align: center;
  }
}
</style>
