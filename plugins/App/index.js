import Vue from "vue";
import AppTimer from "./Timer/index";
import AppCollapse from "./Collapse/index";
import AppLottery from "./Lottery/index";
import AppInputNumber from "./InputNumber/index";
import AppSelect from "./Select/index";
import AppModal from "./Modal/index";
import Throttle from "./Utils/throttle";
import Decode from "./Utils/decode";

const plugins = [
  AppTimer,
  AppCollapse,
  AppLottery,
  ...AppInputNumber,
  AppSelect
];

plugins.forEach(plugin => Vue.use(plugin));

Vue.prototype.$Throttle = new Throttle();
Vue.prototype.$AppModal = AppModal;

Vue.prototype.decode = Decode;
