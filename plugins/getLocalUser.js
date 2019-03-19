import cookies from 'js-cookie';

const getLocalUser = () => {
  if (process.browser && process.env.static) {
    let obj = {};
    let sessionUserinfo = sessionStorage.getItem('accountInfo');
    const cookie_userinfo = cookies.get('vuex');
    if (
      cookie_userinfo &&
      Object.keys(cookie_userinfo).length &&
      sessionUserinfo
    ) {
      const _obj = JSON.parse(cookie_userinfo).Login.userEncode;
      if (_obj && Object.keys(_obj).length) {
        obj = Object.assign(JSON.parse(sessionUserinfo), _obj);
        sessionStorage.setItem('accountInfo', JSON.stringify(obj));
        cookies.remove('vuex');
        return obj;
      } else return (obj = JSON.parse(sessionStorage.getItem('accountInfo')));
    } else return (obj = JSON.parse(sessionStorage.getItem('accountInfo')));
  }
  return null;
};

export default getLocalUser;
