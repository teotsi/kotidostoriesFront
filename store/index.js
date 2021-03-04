export const state = () => ({
  active: 'dashboard',
  categories: {
    love: 'Love 💖',
    funny: 'Funny 😂',
    poem: 'Poem 🧾',
    'sci-fi':'Sci-fi 👾',
    horror: 'Horror 👻',
    whodunit: 'Mystery 🕵️‍'
  },
  options: ['hey', 'new', 'test'],
  reactions: {
    like: {
      icon: 'thumbs-up',
      enabled: false
    },
    love: {
      icon: 'heart',
      enabled: false
    },
    inspiring: {
      icon: 'lightbulb',
      enabled: false
    },
    laugh: {
      icon: 'laugh-beam',
      enabled: false
    }
  },
  reset_token: null,
  users: [],
  valid_token: true
});
export const mutations = {
  SET_TOKEN(state, reset_token) {
    state.reset_token = reset_token
  },
  SET_VALID_TOKEN(state, valid_token) {
    state.valid_token = valid_token;
  },
  SET_ACTIVE(state, active) {
    state.active = active;
  },
  SET_USERS(state, users) {
    state.users = users;
  }
};

export const actions = {
  async getUsers({commit}) {
    const userResponse = await this.$axios.$get('user/')
    commit('SET_USERS', userResponse.users);
  }
}
