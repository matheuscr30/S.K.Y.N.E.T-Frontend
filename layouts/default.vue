<template>
  <div v-show="$store.getters.isHydrated" id="app">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('setIsHydrated', true)
  }
}
</script>

<style></style>
