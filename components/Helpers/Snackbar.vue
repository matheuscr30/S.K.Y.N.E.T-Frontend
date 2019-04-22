<template>
  <v-snackbar
    v-model="show"
    top
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    class="subheading"
    multi-line
    auto-height
  >
    {{ snackbar.text }}
    <v-btn flat dark @click="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    visible: Boolean,
    data: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      snackbar: {
        text: '',
        color: '',
        timeout: 3000,
        active: false
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  created() {
    this.snackbar.text = this.data.text
    this.snackbar.color = this.data.color
    this.snackbar.timeout = this.data.timeout
  }
}
</script>

<style scoped></style>
