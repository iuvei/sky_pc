// const mcache = require("memory-cache");

const gameRoutes = ["pk10", "k3", "pcdd", "ssc", "11x5", "lhc", "3d"];
const authRoutes = ["user"];
const whiteList = ["login"];

const routerIsIncludeGame = route => {
  let result = false;
  for (let i = 0, len = gameRoutes.length; i < len; i++) {
    if (
      route.path.includes(gameRoutes[i]) ||
      route.name.includes(gameRoutes[i])
    ) {
      result = true;
    }
  }
  return result;
};

export default function(context) {
  if (!process.server || !context.req) return;
  const isAjax = context.req.xhr, //判断是否是ajax请求
    target = context.route.name,
    isPost = context.req.method.toLowerCase() === "post",
    routeName = context.route.name ? context.route.name.split("-")[0] : "";

  // 判断是否已经登录，如果没登录访问用户中心，则跳转到登录页
  if (
    !isAjax &&
    !isPost &&
    authRoutes.includes(routeName) &&
    !whiteList.includes(routeName) &&
    !context.req.session.authUser
  ) {
    if (context.store.state.userinfo.isLogin) {
      context.store.commit("userinfo/logout");
    }
    return context.redirect("/login");
  }

  // 判断是否已经登录到下注，如果没有登录而且是下注页面，则跳出
  if (
    !isAjax &&
    !isPost &&
    ["game"].includes(routeName) &&
    routerIsIncludeGame(context.route) &&
    !context.req.session.authUser
  ) {
    if (context.store.state.userinfo.isLogin) {
      context.store.commit("userinfo/logout");
    }
    return context.redirect("/login");
  }

  //如果是IE浏览器或者是火狐浏览器，跳转到警告页面

  if (isAjax && !isPost) {
    return;
  }
}
