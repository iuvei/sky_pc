webpackJsonp([13],{1141:function(t,e,a){a(1947);var i=a(3)(a(1949),a(1960),"data-v-28e6fd0e",null);t.exports=i.exports},1947:function(t,e,a){var i=a(1948);"string"==typeof i&&(i=[[t.i,i,""]]),a(2)(i,{}),i.locals&&(t.exports=i.locals)},1948:function(t,e,a){(t.exports=a(1)(void 0)).push([t.i,"",""])},1949:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(1950),s=a.n(i);a(10),e.default={data:function(){return{data:[]}},mounted:function(){},watch:{},created:function(){},components:{heads:s.a},methods:{}}},1950:function(t,e,a){a(1951);var i=a(3)(a(1953),a(1959),"data-v-4d09fa4f",null);t.exports=i.exports},1951:function(t,e,a){var i=a(1952);"string"==typeof i&&(i=[[t.i,i,""]]),a(2)(i,{}),i.locals&&(t.exports=i.locals)},1952:function(t,e,a){(t.exports=a(1)(void 0)).push([t.i,".heads[data-v-4d09fa4f]{height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.heads .heads_con[data-v-4d09fa4f],.heads[data-v-4d09fa4f]{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.heads .heads_con[data-v-4d09fa4f]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:url("+a(177)+");height:3rem;position:relative;z-index:1000!important;top:0}.heads .heads_con a[data-v-4d09fa4f]{position:relative;width:20%;height:3rem}.heads .heads_con .icon[data-v-4d09fa4f]{background:url("+a(174)+") no-repeat;width:2.5rem;height:2.1875rem;position:absolute;top:30%;left:30%;background-size:1.25rem 1.25rem}.heads .heads_con .title[data-v-4d09fa4f]{width:60%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:1.125rem;color:#fff;font-weight:bolder}.heads .heads_con .title .center_box[data-v-4d09fa4f]{text-align:center}.heads .heads_con .switch[data-v-4d09fa4f]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:20%}.heads .heads_con .switch span[data-v-4d09fa4f]{font-size:1.0625rem;color:#fff;font-weight:bolder}.heads .heads_con .switch i[data-v-4d09fa4f]{display:inline-block;background:url("+a(298)+");width:1.125rem;height:1.125rem;background-size:1.125rem 1.125rem;transition:all .3s ease}.heads .heads_con .switch .rotate_pos[data-v-4d09fa4f]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}",""])},1953:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),a(184),a(10);var i=a(299),s=a.n(i),n=a(310),o=a.n(n),r=a(1954),d=a.n(r);e.default={data:function(){return{listType:[],gameId:[],routeList:[],data:[],val:"",isRotate:!1}},components:{lotteryHistory:o.a,selectGame:s.a,countdown:d.a},activated:function(){this.$route.params.lotter_id&&this.getDataFromRoute()},methods:{getDataFromRoute:function(){this.routeList=this.$route.params,this.listType={lotter_id:this.routeList.lotter_id,js_tag:this.routeList.js_tag,name_tag:this.routeList.name_tag,game_name:this.routeList.game_name,speed:this.routeList.speed,enable:this.routeList.enable}},switchKaiJiang:function(t){this.$refs.lotteryHis.activeIndex=0,t&&(this.listType={lotter_id:t.game_id,js_tag:t.js_tag,name_tag:t.tag,game_name:t.game_name,speed:t.speed,enable:t.enable}),this.routeList.game_name=t.game_name,this.$refs.kaijiangOptions.self_show=!1},openOptions:function(){this.$refs.kaijiangOptions.self_show=!this.$refs.kaijiangOptions.self_show,this.isRotate=!this.isRotate},greet:function(t){this.val=t}}}},1954:function(t,e,a){a(1955);var i=a(3)(a(1957),a(1958),"data-v-486b70ed",null);t.exports=i.exports},1955:function(t,e,a){var i=a(1956);"string"==typeof i&&(i=[[t.i,i,""]]),a(2)(i,{}),i.locals&&(t.exports=i.locals)},1956:function(t,e,a){(t.exports=a(1)(void 0)).push([t.i,".devote_to_remind .kaijiang_times[data-v-486b70ed]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;height:3rem;position:fixed;z-index:12;bottom:0;background-color:hsla(0,4%,5%,.9)}.devote_to_remind .kaijiang_times .jiezhi[data-v-486b70ed],.devote_to_remind .kaijiang_times[data-v-486b70ed]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}.devote_to_remind .kaijiang_times .jiezhi[data-v-486b70ed]{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;color:hsla(0,0%,100%,.8);line-height:3rem;font-size:1rem;margin-left:1rem;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.devote_to_remind .kaijiang_times .haoma[data-v-486b70ed]{margin-right:.625rem;font-size:1rem;color:#d31a30}.devote_to_remind .kaijiang_times .haoma span[data-v-486b70ed]{width:2.5rem;letter-spacing:.0625rem;text-indent:.1875rem}.devote_to_remind .kaijiang_times .haoma i[data-v-486b70ed]{margin:0 .125rem}.devote_to_remind .kaijiang_times .rapid_betting[data-v-486b70ed]{width:6.25rem;height:3rem;padding:0;background-color:#d31a30}.devote_to_remind .kaijiang_times .rapid_betting span[data-v-486b70ed]{line-height:3rem;color:#fff;font-size:1.125rem;display:block;text-align:center}",""])},1957:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(47),s=(a.n(i),a(10)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e.default={props:["listType"],data:function(){return{openless:"",routeLists:{},nexts:[],timer:Function,closeIsShow:!0,val:"",qishu:""}},components:{},computed:n({},Object(s.e)({gameName:function(t){return t.trend.gameName},gameId:function(t){return t.trend.gameId},jsTag:function(t){return t.trend.js_tag},nameTag:function(t){return t.trend.name_tag},speed:function(t){return t.trend.speed}})),activated:function(){this.getData()},deactivated:function(){clearInterval(this.$refs.openless.timer)},watch:{listType:function(t){this.getData()}},methods:n({},Object(s.b)(["setBetCurent"]),{toBetting:function(){2!=this.listType.enable?this.$router.push({name:this.listType.js_tag,params:{lotter_id:this.listType.lotter_id,name_tag:this.listType.name_tag,game_name:this.listType.game_name,js_tag:this.listType.js_tag,speed:this.listType.speed}}):this.$dialog.toast({mes:"该彩种正在维护中···"})},getData:function(){var t=this;this.$ajax("request",{ac:"getCplogList",tag:this.listType.name_tag}).then(function(e){t.qishu=e[0].next[0].qishu,e[0].next[0].stopless>0?t.openless=e[0].next[0].stopless:t.openless=e[0].next[1].stopless,clearInterval(t.$refs.openless.timer),t.$refs.openless.run()})}})}},1958:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"devote_to_remind"},[a("div",{staticClass:"kaijiang_times"},[a("div",{staticClass:"jiezhi"},[t._v("\n      距离 \n      "),a("i",[t._v(t._s((t.qishu+"").substr(-4)))]),t._v("\n       期投注截止:\n    ")]),t._v(" "),a("div",{staticClass:"haoma"},[a("yd-countdown",{ref:"openless",attrs:{time:t.openless,timetype:"second",format:"{%h}:{%m}:{%s}","done-text":"正在开奖",callback:t.getData}})],1),t._v(" "),a("div",{staticClass:"rapid_betting"},[a("div",{on:{click:t.toBetting}},[a("span",[t._v("去投一注")])])])])])},staticRenderFns:[]}},1959:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"heads"},[a("div",{staticClass:"heads_con"},[a("router-link",{attrs:{to:"/lottery"}},[a("div",{staticClass:"icon"})]),t._v(" "),a("div",{staticClass:"title"},[a("div",{staticClass:"center_box"},[t._v("\n                "+t._s(t.listType.game_name)+"\n            ")])]),t._v(" "),a("div",{staticClass:"switch",on:{click:t.openOptions}},[a("i",{class:[{rotate_pos:t.isRotate}]}),t._v(" "),a("span",[t._v("彩种")])])],1),t._v(" "),a("select-game",{ref:"kaijiangOptions",attrs:{gameId:t.$route.params.lotter_id},on:{afterSelectGame:t.switchKaiJiang}}),t._v(" "),a("lotteryHistory",{ref:"lotteryHis",attrs:{listType:t.listType,iosKaijiang:"true"}}),t._v(" "),a("countdown",{attrs:{listType:t.listType}})],1)},staticRenderFns:[]}},1960:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"kjxq"},[e("heads")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=13.905f978637116a9d6f68.js.map?905f978637116a9d6f68