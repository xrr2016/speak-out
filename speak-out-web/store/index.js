export const state = () => ({
  authUser: null,
  accessToken: ''
})

export const mutations = {
  SET_AUTH_USER(state, user) {
    state.authUser = user
  },
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token
  }
}

export const actions = {
  // async register({ commit }, { username, password }) {
  // },
  // async login({ commit }, { username, password }) {
  //   try {
  //     const { data } = await axios.post('/api/login', { username, password })
  //     commit('SET_USER', data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // },
  // async logout({ commit }) {
  //   await axios.post('/api/logout')
  //   commit('SET_USER', null)
  // }
}
