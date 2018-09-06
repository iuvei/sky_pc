export default function({ store, route, redirect }) {
  // console.error(route.fullPath)
  // console.error(store.state.agent.isAgent)
  let noAgentPath = "/user/agent";
  if (
    !store.state.userinfo.accountInfo.level &&
    route.fullPath.includes(noAgentPath) &&
    route.fullPath !== noAgentPath &&
    route.fullPath !== '/user/agent/cashTransaction'
  ) {
    return redirect(noAgentPath);
  }
}
