export const state = () => ({
    reset_token : null,
    valid_token: true
})
export const mutations = {
    SET_TOKEN(state, reset_token){
        state.reset_token=reset_token
    },
    SET_VALID_TOKEN(state, valid_token){
        state.valid_token=valid_token
        console.log(state.valid_token)
    },
}
