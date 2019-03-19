import Vue from 'vue';
import AppModalVue from './AppModal';
let instance, curOpts;
let initData = () => ({
  visible: true,
  customClass: 'game-modal',
  title: '温馨提示',
  confirmText: '确定',
  showFoot: true,
  confirmType: true,
  cancelText: '取消',
  cancelType: true,
  content: '',
  component: '',
  componentData: '',
  maskClosable: true,
  delay: false,
  // onOk() {},
  beforeClose() {}
});
const AppModalVueConstructor = Vue.extend(AppModalVue);
const initInstance = options => {
  instance = new AppModalVueConstructor({
    el: document.createElement('div'),
    data() {
      return {
        ...options
      };
    }
  });
};

const AppModal = function(options = {}, callback) {
  if (Vue.prototype.$isServer || process.server) return;
  curOpts = Object.assign(initData(), options);
  initInstance(curOpts);
  // console.log(curOpts);
  instance.action = '';
  document.body.appendChild(instance.$el);
  document.body.style.overflow = 'hidden';
  Vue.nextTick(() => {
    instance.visible = curOpts.visible;
  });
  return instance;
};
export default AppModal;
