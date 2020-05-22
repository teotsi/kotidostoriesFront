
export default async function ({store, $axios}) {
  console.log("load")
  const userResponse  = $axios.get('user')
  store.commit('SET_USERS', userResponse.users)

}
