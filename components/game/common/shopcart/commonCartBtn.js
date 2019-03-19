export default {
  name: 'CartShopLogBtn',
  props: ['status', 'id'],
  data() {
    return {
      txt: '',
      isClick: false,
      statusTxt: [
        '待开奖',
        '已中奖',
        '未中奖',
        '已撤单',
        '正在撤单',
        '撤单失败'
      ],
      statusClass: ['gray', 'green', 'red', 'black']
    };
  },
  computed: {
    btnTxt() {
      if ([4, 5].includes(this.status)) {
        return this.statusTxt[this.status];
      }
      return this.txt || this.statusTxt[this.status];
    }
  },
  methods: {
    click() {
      if (this.idClick || this.status) {
        return;
      }
      this.txt = '正在撤单';
      this.isClick = true;
      this.$emit('rollback');
    }
  },
  render(h) {
    return (
      <div class="table-status-btn">
        <div
          class={[this.statusClass[this.status], { active: this.isClick }]}
          onMouseover={() => {
            if (this.status || this.isClick) return;
            this.txt = '撤单';
          }}
          onMouseleave={() => {
            if (this.status || this.isClick) return;
            this.txt = '';
          }}
          onClick={this.click}
        >
          {this.btnTxt}
        </div>
      </div>
    );
  }
};
