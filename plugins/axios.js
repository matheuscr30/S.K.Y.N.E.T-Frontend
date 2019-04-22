export default function({ $axios, redirect, store }) {
  $axios.onResponseError(error => {
    const {
      response: { status }
    } = error

    const auth = store.getters.auth

    if (status === 403 && auth.accessToken !== '')
      return store.dispatch('auth/logout')

    error.hasError = true
    return Promise.reject(error)
  })
}
