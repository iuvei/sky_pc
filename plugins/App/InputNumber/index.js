import InputNumber from './InputNumber';
import InputNumberSide from './InputNumberSide';
InputNumber.install = Vue => {
  Vue.component(InputNumber.name, InputNumber);
};
InputNumberSide.install = Vue => {
  Vue.component(InputNumberSide.name, InputNumberSide);
};
export default [InputNumber, InputNumberSide];
