const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_AUTH_USER(state, user) {
    state.authUser = user
    if (process.client) {
      Cookie.set('authUser', user)
    }
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      commit('SET_AUTH_USER', JSON.parse(parsed.authUser))
    }
  }
}
