import Vue from 'vue';
import AppTimer from './Timer/index';
import AppCollapse from './Collapse/index';
import AppLottery from './Lottery/index';
import AppInputNumber from './InputNumber/index';
import AppSelect from './Select/index';
import AppModal from './Modal/index';
import Throttle from './Utils/throttle';
import Decode from './Utils/decode';
import EXIF from 'exif-js'
const plugins = [
  AppTimer,
  AppCollapse,
  AppLottery,
  ...AppInputNumber,
  AppSelect
];

plugins.forEach(plugin => Vue.use(plugin));
Vue.directive('drag', {
  bind(el) {
    const oDiv = el // 当前元素
    // const self = this  // 上下文
    oDiv.onmousedown = e => {
      // console.log(e)
      let downTime = new Date().getTime()
      let isDown = true
      // 判断默认行为是否可以被禁用
      // e.cancelBubble = true
      // e.stopPropagation()
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop
      document.body.onmousemove = e => {
        // e.cancelBubble = true
        // e.stopPropagation()
        // 通过事件委托，计算移动的距离
        let l = e.clientX - disX
        let t = e.clientY - disY
          // 移动当前元素
          if (isDown) {
            oDiv.style.left = l + 'px'
            oDiv.style.top = t + 'px'
          }
        return false
      }
      oDiv.onmouseup = e => {
        // e.cancelBubble = true
        // e.stopPropagation()
        let upTime = new Date().getTime()
        if(upTime - downTime < 300) {
          window && window.open('/redenvelope')
        }
        isDown = false
        return false
      }
      return false
    }
  }
})
Vue.prototype.$Throttle = new Throttle();
Vue.prototype.$AppModal = AppModal;
Vue.prototype.$exif = EXIF;
Vue.prototype.decode = Decode;
