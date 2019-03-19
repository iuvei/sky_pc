import Lottery from './Lottery.js';
Lottery.install = Vue => {
  Vue.component(Lottery.name, Lottery);
};
export default Lottery;
