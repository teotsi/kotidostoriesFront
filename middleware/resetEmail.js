export default async function (store, from) {
  let token = store.route.query.token
  if (token){
    await store.commit('SET_TOKEN',token)
  }
}