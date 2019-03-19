export default ({ req, store }) => {
  if (process.server) {
    // https://github.com/nuxt/nuxt.js/issues/2914
    const ip = req.connection.remoteAddress || req.socket.remoteAddress;
    // store.commit('SET_IP', ip);
    // console.error('middleware_ip', req.headers);

    store.state.ip = req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0]
      : req.headers['x-real-ip'];
    // console.error('middleware_ip', store.state.ip);
  }
  // if (process.client) {
  //   localStorage.setItem('ip', store.getters.ip);
  // }
};
