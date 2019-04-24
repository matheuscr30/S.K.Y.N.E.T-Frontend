/*
USE WITH CAUTION
DEFINE THE VARIABLE WITH A DOLLAR SIGN, SO WE CAN
IDENTIFY WHAT VARIABLES ARE GLOBAL
*/

export default {
  computed: {
    $isMobile() {
      // If it's rendering in the server, there isn't breakpoint
      if (this.$store.getters.isHydrated) {
        return (
          this.$vuetify.breakpoint.name === 'xs' ||
          this.$vuetify.breakpoint.name === 'sm'
        )
      } else {
        return true
      }
    },
    $isUserLogged() {
      return this.$store.getters['auth/isUserLogged']
    }
  }
}
