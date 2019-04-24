const API = require('../proto/APIV1_pb')

export const state = () => ({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
  maxAgeCookie: 60 * 60 * 24 * 30,
  isUserLogged: false
})

export const getters = {
  auth(state) {
    return {
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      expiresIn: state.expiresIn
    }
  },
  isUserLogged(state) {
    return state.isUserLogged
  }
}

export const mutations = {
  CLEAR_AUTH(state) {
    state.accessToken = ''
    state.refreshToken = ''
    state.expiresIn = 0
  },
  SET_AUTH(state, data) {
    state.accessToken = data.accessToken
    state.refreshToken = data.refreshToken
    state.expiresIn = data.expiresIn
  },
  SET_IS_USER_LOGGED(state, isUserLogged) {
    state.isUserLogged = isUserLogged
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken
  }
}

export const actions = {
  async logout({ commit }) {
    await this.$cookies.removeAll()
    commit('CLEAR_AUTH')
    commit('SET_IS_USER_LOGGED', false)
    this.$router.push({ name: 'index' })
  },
  async login({ commit, dispatch, state }, data) {
    const authRequest = new API.AuthRequest()

    authRequest.setGrantType('password')
    authRequest.setClientId(state.clientId)
    authRequest.setClientSecret(state.clientSecret)
    authRequest.setUsername(data.email)
    authRequest.setPassword(data.password)

    const bytes = authRequest.serializeBinary()

    let errMessage
    const response = await this.$axios
      .$post('o/token/', bytes, {
        responseType: 'arraybuffer'
      })
      .catch(err => {
        if ('hasError' in err) {
          const errorProto = API.Error.deserializeBinary(err.response.data)
          const error = errorProto.toObject(API.Error)
          errMessage = error.message
        }
      })

    if (errMessage !== undefined) return errMessage

    const authResponseProto = API.AuthResponse.deserializeBinary(response)
    const authResponse = authResponseProto.toObject(API.AuthResponse)

    const obj = {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
      expiresIn: authResponse.expiresIn
    }

    commit('SET_AUTH', obj)

    await this.$cookies.set('ACCESS_TOKEN', obj.accessToken, {
      path: '/',
      maxAge: state.maxAgeCookie
    })
    await this.$cookies.set('REFRESH_TOKEN', obj.refreshToken, {
      path: '/',
      maxAge: state.maxAgeCookie
    })
    commit('SET_IS_USER_LOGGED', true)

    return null
  },
  setIsUserLogged({ commit }, isUserLogged) {
    commit('SET_IS_USER_LOGGED', isUserLogged)
  },
  setAccessToken({ commit }, accessToken) {
    commit('SET_ACCESS_TOKEN', accessToken)
  },
  setRefreshToken({ commit }, refreshToken) {
    commit('SET_REFRESH_TOKEN', refreshToken)
  }
}
