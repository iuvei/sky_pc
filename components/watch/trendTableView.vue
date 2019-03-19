<template>
  <div class='table-view'>
    <div class="left line" :style="{width:viewData.width+'px'}">
      <div v-for="(v,k) in map" :key="k" class="b">{{v}}</div>
    </div>
    <div class="right">
      <div class="group" v-for="(group,idx) in data" :key="idx">
        <div v-for="(item,key) in map" :key="key" class="tr">
          <div v-for="(v,k) in group" :key="k" class="td b">{{v[key]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tableView',
  props: ['viewData', 'change'],
  data() {
    return {
      data: [],
      map: {
        total: '总出现次数',
        omitAvg: '平均遗漏值',
        omitMax: '最大遗漏值',
        togetherMax: '最大连出',
      },
    };
  },
  methods: {
    togetherMax(arr) {
      let n = 0;
      arr.reduce((t, v, k) => {
        if (v + 1 == arr[k + 1]) {
          return ++t;
        } else {
          t > n && (n = t);
          return 1;
        }
      }, 1);
      return n;
    },
    omitMax(arr) {
      let n = 0;
      arr = arr.sort((a, b) => a - b);
      arr.forEach((v, k) => {
        if (!k) return;
        let s = v - arr[k - 1];
        s > n && (n = s);
      });
      return n - 1;
      // return arr[1] ? n : n - 1;
    },
    setData() {
      let data = this.viewData.data;
      let mLength = this.viewData.totalrows;
      this.data = data.map(item =>
        item.map(v => {
          let vLength = v.length;
          let arr = v.map(z => z.k * 1 + 1);
          return {
            total: vLength,
            // omitAvg: vLength ? Math.ceil(mLength / vLength) : 0,
            omitAvg: Math.ceil(mLength / (vLength + 1)),
            omitMax: this.omitMax([0, mLength + 1, ...arr]),
            togetherMax: this.togetherMax(arr),
          };
        })
      );
      // console.log(data[0], this.data[0]);
    },
  },
  mounted() {
    this.setData();
  },
  watch: {
    change() {
      this.setData();
    },
  },
};
</script>
<style lang='scss' scoped>
.table-view {
  display: flex;
  .left {
    .b {
      height: 30px;
    }
  }
  .right {
    display: flex;
    .group {
      flex: 1;
    }
  }
}
</style>