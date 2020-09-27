
export default async function ({store, $axios}) {
  const userResponse  =await $axios.$get('user/')
  await store.commit('SET_USERS', userResponse.users)

}
