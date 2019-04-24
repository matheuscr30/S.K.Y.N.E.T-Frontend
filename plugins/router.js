const routesWithoutProtection = ['index']

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const accessToken = app.$cookies.get('ACCESS_TOKEN')

    if (accessToken !== undefined && !app.store.getters.isUserLogged) {
      app.store.dispatch('auth/setAccessToken', accessToken)
      app.store.dispatch(
        'auth/setRefreshToken',
        app.$cookies.get('auth/REFRESH_TOKEN')
      )
      app.store.dispatch('auth/setIsUserLogged', true)
    }

    if (accessToken === undefined) {
      if (routesWithoutProtection.indexOf(to.name) !== -1) return next()
      return next({ name: 'index' })
    } else {
      if (to.name === 'index') return next({ name: 'o-dashboard' })
      return next()
    }
  })
}
