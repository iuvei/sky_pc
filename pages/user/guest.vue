<template>
  <div class="guest">
    <div class="one-block">
      游客身份,无权访问。
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
export default {
  name: 'guest',
  data() {
    return {};
  },
  components: {},
  computed: {},
  fetch({ store }) {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.guest {
  .one-block {
    text-align: center;
    padding: 20px;
  }
}
</style>
