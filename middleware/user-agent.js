export default function({ store, route, redirect }) {
  // console.error(route.fullPath)
  // console.error(store.state.agent.isAgent)

  const user = store.state.userinfo.accountInfo,
    hasNoLevel = user.hasOwnProperty('level') && !user.level;
  let noAgentPath = '/user/agent';
  if (
    // !store.state.userinfo.accountInfo.level &&
    hasNoLevel &&
    route.fullPath.includes(noAgentPath) &&
    route.fullPath !== noAgentPath &&
    route.fullPath !== '/user/agent/cashTransaction' &&
    route.fullPath !== '/user/agent/agentThat'
  ) {
    return redirect(noAgentPath);
  }
}
