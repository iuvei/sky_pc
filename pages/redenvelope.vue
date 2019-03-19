<template>
  <div class="redenvelope">
    <img class="index-bgimg" src="~/assets/img/rob/red-background.jpg" alt="">
    <grabred></grabred>
    <characterList></characterList>
    <eventDetails></eventDetails>
  </div>
</template>
<script>
import grabred from '~/components/redenvelope/head'
import characterList from '~/components/redenvelope/characterList'
import eventDetails from '~/components/redenvelope/eventDetails'
export default {
  name: 'redenvelope',
  layout: 'index',
  components: {
    grabred,
    characterList,
    eventDetails
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.redenvelope {
  position: relative;
  width: 100%;
  min-width: 1200px;
  min-height: 800px;
  margin: 0 auto;
  .index-bgimg {
    position: absolute;
    display: inline-block;
    width: 100% !important;
    height: 1080px;
    z-index: -10;
  }
}
</style>


