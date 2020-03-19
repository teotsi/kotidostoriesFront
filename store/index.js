export const state = () => ({
    reset_token : null
})
export const mutations = {
    SET_TOKEN(state, reset_token){
        state.reset_token=reset_token
    }
}