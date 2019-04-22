export const state = () => ({
  isHydrated: false
})

export const getters = {
  isHydrated(state) {
    return state.isHydrated
  }
}

export const mutations = {
  SET_IS_HYDRATED(state, isHydrated) {
    state.isHydrated = isHydrated
  }
}

export const actions = {
  setIsHydrated({ commit }, isHydrated) {
    commit('SET_IS_HYDRATED', isHydrated)
  }
}
