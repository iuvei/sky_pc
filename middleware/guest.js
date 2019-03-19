export default function({ store, route, redirect }) {
  // console.error(route.fullPath)
  // console.error(store.state.agent.isAgent)
  let guest = '/user/guest';
  let whiteList = [guest, '/user/betting/betrecord', '/user/betting/tracenumber'];
  if (
    !store.state.userinfo ||
    (store.state.userinfo.accountInfo.test === 2 &&
      route.fullPath.includes('/user') &&
      !whiteList.some(el => route.fullPath.includes(el)))
  ) {
    return redirect(guest);
  }
}
