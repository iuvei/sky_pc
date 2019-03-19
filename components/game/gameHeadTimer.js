export default {
  name: 'gameHeadTimer',
  props: ['str'],
  render() {
    let str = this.str.split(':');
    return (
      <div>
        <div>str[0]</div>
        <div>str[1]</div>
        <div>str[2]</div>
      </div>
    );
  }
};
 