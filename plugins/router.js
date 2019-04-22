// const routesWithoutProtection = ['index']

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    next()
    /* const accessToken = await app.$cookies.get('ACCESS_TOKEN')

    if (
      accessToken !== undefined &&
      accessToken !== '' &&
      !app.store.getters.isUserLogged
    ) {
      app.store.dispatch('setAccessToken', accessToken)
      app.store.dispatch(
        'setRefreshToken',
        await app.$cookies.get('REFRESH_TOKEN')
      )

      const bytes = cryptoJS.AES.decrypt(
        app.$cookies.get('USER_EMAIL'),
        process.env.CLIENT_SECRET
      )
      const userEmail = bytes.toString(cryptoJS.enc.Utf8)

      await app.store.dispatch('loadUser', userEmail)
    }

    if (accessToken === undefined) {
      if (routesWithoutProtection.indexOf(to.name) !== -1) return next()

      await app.$cookies.set('REDIRECT_URL', to.fullPath, {
        path: '/',
        maxAge: app.store.getters.maxAgeCookie
      })
      return next({ name: 'index' })
    } else {
      if (to.name === 'index') return next({ name: 'o-dashboard' })
      return next()
    } */
  })
}
