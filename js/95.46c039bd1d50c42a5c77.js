webpackJsonp([95],{1070:function(t,e,a){a(1304);var i=a(3)(a(1306),a(1307),"data-v-07bfcd76",null);t.exports=i.exports},1304:function(t,e,a){var i=a(1305);"string"==typeof i&&(i=[[t.i,i,""]]),a(2)(i,{}),i.locals&&(t.exports=i.locals)},1305:function(t,e,a){(t.exports=a(1)(void 0)).push([t.i,".addNewDomain_main_body[data-v-07bfcd76]{height:100%;background-color:#eee}.addNewDomain_main_body .addNewDomain_main_content[data-v-07bfcd76]{padding:1.25rem}.addNewDomain_main_body .addNewDomain_main_content .form_ipt[data-v-07bfcd76]{overflow:hidden;border:.0625rem solid #bfbfbf;border-radius:.3125rem;height:auto}.addNewDomain_main_body .addNewDomain_main_content .form_ipt .verify1[data-v-07bfcd76]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}.addNewDomain_main_body .addNewDomain_main_content .form_ipt .verify1_input[data-v-07bfcd76]{width:60%}.addNewDomain_main_body .addNewDomain_main_content .form_ipt .verify1_img[data-v-07bfcd76]{text-indent:0;-webkit-box-flex:1;-ms-flex:1;flex:1}.addNewDomain_main_body .addNewDomain_main_content .form_ipt .verify1_img img[data-v-07bfcd76]{width:100%}.addNewDomain_main_body .addNewDomain_main_content .tips[data-v-07bfcd76]{margin:1.625rem 0;text-align:center;font-size:.8125rem;color:#7d7d7d}.addNewDomain_main_body .addNewDomain_main_content .btn[data-v-07bfcd76]{margin-top:3.75rem;text-align:center}.addNewDomain_main_body .addNewDomain_main_content .btn button[data-v-07bfcd76]{width:18.75rem;height:2.5rem;font-size:1rem;line-height:1rem;color:#fff;background-color:#ff7c34;border-radius:.3125rem;outline:none;border:none}",""])},1306:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(1155),n=a.n(i),o=a(10),d=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e.default={components:{publicHead:n.a},data:function(){var t=this;return{funcName:"添加域名",verifyImg:"",verifyNum:"",isShow:!0,domainAdd:"",remark:"",vcode:"",IPIndex:0,IP:"请选择IP地址",invitationCode:[{label:"不填",callback:function(){t.vcode=0}},{label:"必填",callback:function(){t.vcode=1}}],invitationCodeShow:!1,parseIPShow:!1,parseOptions:[{label:"369caidns1.bxvip.com",callback:function(){t.IP="369caidns1.bxvip.com",t.IPIndex=1}},{label:"369caidns2.bxvip.co",callback:function(){t.IP="369caidns2.bxvip.com",t.IPIndex=2}},{label:"369caidns3.bxvip.co",callback:function(){t.IP="369caidns3.bxvip.com",t.IPIndex=3}},{label:"369caidns4.bxvip.co",callback:function(){t.IP="369caidns4.bxvip.com",t.IPIndex=4}}]}},mounted:function(){var t=this;this.$route.params.ip&&(this.domainAdd=this.$route.params.enom,this.vcode=this.$route.params.param_type,this.IP=this.$route.params.ip,this.remark=this.$route.params.remark),this.getVerify(this.randomNum()),this.getEnomLIplist().then(function(e){e&&(t.parseOptions=e.map(function(e){return{label:e.ip,callback:function(){t.clickEnomLIpList(e)}}}))})},methods:d({},Object(o.b)("agent",["getEnomLIplist"]),{clickEnomLIpList:function(t){this.IP=t.ip,this.IPIndex=t.id},getVerify:function(t){var e=this;this.$ajax("request",{ac:"getVerifyImage"}).then(function(t){e.verifyImg=t.img,e.$dialog.loading.close()})},randomNum:function(){return Math.floor(1e4*Math.random())+""},submitData:function(){var t=this;this.$ajax("request",{ac:"addNewUserEnom",enom:this.domainAdd,remark:this.remark,ptype:this.vcode,ip:this.IPIndex}).then(function(e){t.$dialog.alert({mes:"添加成功"}),t.$router.push("/agency/openAccount")})}})}},1307:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"addNewDomain_main_body"},[i("publicHead",{attrs:{title:t.funcName,type:5}}),t._v(" "),i("div",{staticClass:"addNewDomain_main_content"},[i("yd-cell-group",{staticClass:"form_ipt"},[i("yd-cell-item",[i("span",{slot:"left"},[t._v("域名地址")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.domainAdd,expression:"domainAdd"}],attrs:{type:"text",placeholder:"请输入域名，不用带http://"},domProps:{value:t.domainAdd},on:{input:function(e){e.target.composing||(t.domainAdd=e.target.value)}},slot:"right"})]),t._v(" "),i("yd-cell-item",{nativeOn:{click:function(e){t.invitationCodeShow=!0}}},[i("span",{slot:"left"},[t._v("邀请码")]),t._v(" "),i("span",{slot:"left"},[t._v(t._s(0==t.vcode?"不填":"必填"))]),t._v(" "),i("img",{staticClass:"img",attrs:{src:a(291),alt:""},slot:"right"})]),t._v(" "),i("yd-cell-item",{nativeOn:{click:function(e){t.parseIPShow=!0}}},[i("span",{slot:"left"},[t._v("IP地址")]),t._v(" "),i("span",{slot:"left"},[t._v(t._s(t.IP))]),t._v(" "),i("img",{staticClass:"img",attrs:{src:a(291),alt:""},slot:"right"})]),t._v(" "),i("yd-cell-item",[i("span",{slot:"left"},[t._v("域名备注")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],attrs:{type:"text",placeholder:"请输入域名备注"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}},slot:"right"})]),t._v(" "),i("yd-cell-item",[i("span",{slot:"left"},[t._v("验证码")]),t._v(" "),i("div",{staticClass:"verify1",slot:"right"},[i("div",{staticClass:"verify1_input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyNum,expression:"verifyNum"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:t.verifyNum},on:{input:function(e){e.target.composing||(t.verifyNum=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"verify1_img"},[i("img",{attrs:{src:t.verifyImg,alt:""},on:{click:function(e){t.getVerify(t.randomNum())}}})])])])],1),t._v(" "),i("p",{staticClass:"btn"},[i("button",{on:{click:t.submitData}},[t._v("立即添加")])])],1),t._v(" "),i("yd-actionsheet",{staticClass:"changePeriod",attrs:{items:t.invitationCode},model:{value:t.invitationCodeShow,callback:function(e){t.invitationCodeShow=e},expression:"invitationCodeShow"}}),t._v(" "),i("yd-actionsheet",{staticClass:"changePeriod",attrs:{items:t.parseOptions},model:{value:t.parseIPShow,callback:function(e){t.parseIPShow=e},expression:"parseIPShow"}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=95.46c039bd1d50c42a5c77.js.map?46c039bd1d50c42a5c77