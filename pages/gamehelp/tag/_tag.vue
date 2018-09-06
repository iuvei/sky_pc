<template>
  <div class="agent_thatw">
    <Table :columns="tableKsColumns" :data="tableks" border highlight-row></Table>
    <nuxt/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "playks",
    data() {
        return {
            tableks: [],
            tableKsColumns: [
                { title: "玩法群", key: "name" },
                {
                    title: "玩法组",
                    // key: "submenu",
                    render(h, { row }) {
                        let items = row.submenu || [];
                        return h(
                            "ul",
                            items.map(function(item) {
                                return h("li", item.name);
                            })
                        );
                    }
                },
                {
                    title: "玩法",
                    render: (h, { row }) => {
                        let items = row.submenu || [];
                        return h(
                            "ul",
                            items.map(function(item) {
                                let data = item.playlist || [];
                                return data.map(function(el) {
                                    return h("li", el.playname);
                                });
                            })
                        );
                    }
                },
                {
                    title: "玩法说明",
                    width: 496,
                    render: (h, { row }) => {
                        let items = row.submenu || [];
                        return h(
                            "ul",
                            items.map(function(item) {
                                let data = item.playlist || [];
                                return data.map(function(el) {
                                    return h("li", el.play_shuoming);
                                });
                            })
                        );
                    }
                }
            ]
        };
    },
    components: {},
    computed: {
        ...mapState("gamehelp", ["gametxt", "gameList"])
    },
    watch: {
        "$route.fullPath"(v) {
            this.getGamePlayConfigks();
        }
    },
    mounted() {
        this.getGamePlayConfigks();
    },
    methods: {
        ...mapActions("gamehelp", ["getGamePlayConfig"]),
        // 获取彩种玩法内容介绍
        async getGamePlayConfigks() {
            let js_tag = this.$route.path.split("/").pop();
            let ret = (await this.getGamePlayConfig({ js_tag })) || {};
            ret = ret.list || [];
            this.tableks = ret;
        }
    }
};
</script>
<style lang="scss" scoped>
.agent_thatw {
    width: 100%;
    margin-top: 12px;
}
</style>
<style lang="scss">
.agent_thatw {
    th .ivu-table-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }
    .ivu-table-tbody,
    .ivu-table-row {
        height: 100%;
        .ivu-table-cell {
            width: 100%;
            height: 100%;
            display: flex;
            font-size: 14px;
            padding: 0;
            align-items: center;
            justify-content: center;
            span {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            ul {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                li {
                    width: 100%;
                    height: 165px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:nth-child(n + 2) {
                        border-top: solid 1px #dbdbdb;
                    }
                }
            }
        }
    }
}
</style>
