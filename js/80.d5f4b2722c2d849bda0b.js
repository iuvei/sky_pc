webpackJsonp([80],{1113:function(e,t,a){a(1610);var i=a(3)(a(1612),a(1613),"data-v-8119975c",null);e.exports=i.exports},1610:function(e,t,a){var i=a(1611);"string"==typeof i&&(i=[[e.i,i,""]]),a(2)(i,{}),i.locals&&(e.exports=i.locals)},1611:function(e,t,a){(e.exports=a(1)(void 0)).push([e.i,".adviceFeedlist_main_body .adviceFeedlist_main_content[data-v-8119975c]{background-color:#fff;border-radius:.3125rem;border-left:.0625rem solid #d7d9da;border-right:.0625rem solid #d7d9da}.adviceFeedlist_main_body .adviceFeedlist_main_content div[data-v-8119975c]{border-bottom:.0625rem solid #d7d9da;padding:.625rem}.adviceFeedlist_main_body .adviceFeedlist_main_content div[data-v-8119975c]:last-child{border-bottom:none}.adviceFeedlist_main_body .adviceFeedlist_main_content div span[data-v-8119975c]{display:block;font-size:.9375rem;line-height:1.875rem;color:#626364}.adviceFeedlist_main_body .adviceFeedlist_main_content div p[data-v-8119975c]{font-size:.9375rem;line-height:1.5625rem;color:#000;text-indent:2em}",""])},1612:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(1155),n=a.n(i);t.default={components:{publicHead:n.a},data:function(){return{funcName:"投诉",allData:"",recordTime:"",replyer:!1}},activated:function(){this.allData=this.$route.params,0!=this.allData.answer.length&&(this.replyer=!0),this.funcName=this.allData.title;var e=1e3*this.allData.send_time,t=new Date(e),a=t.getFullYear(),i=t.getMonth()+1,n=t.getDate(),d=t.getHours(),s=t.getMinutes(),o=t.getSeconds(),r=function(e){return e>9?e:"0"+e};this.recordTime=a+"-"+r(i)+"-"+r(n)+" "+r(d)+":"+r(s)+":"+r(o),this.$dialog.loading.open(" "),this.$ajax("request",{ac:"ReadOpinion",id:this.allData.id}).then(function(e){}),this.$dialog.loading.close()},methods:{}}},1613:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"adviceFeedlist_main_body"},[a("publicHead",{attrs:{title:e.funcName,type:5}}),e._v(" "),a("div",{staticClass:"adviceFeedlist_main_content"},[a("div",[a("span",[e._v(e._s(new Date(1e3*parseInt(e.allData.send_time)).toLocaleString("chinese",{hour12:!1}).replace(/\//g,"-")))]),e._v(" "),a("span",[e._v("反馈内容：")]),e._v(" "),a("p",[e._v(e._s(e.allData.content))])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.replyer,expression:"replyer"}]},[a("span",[e._v(e._s(new Date(1e3*parseInt(e.allData.reply_time)).toLocaleString("chinese",{hour12:!1}).replace(/\//g,"-")))]),e._v(" "),a("span",[e._v("回复：")]),e._v(" "),a("p",[e._v(e._s(e.allData.answer))])])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=80.d5f4b2722c2d849bda0b.js.map?d5f4b2722c2d849bda0b