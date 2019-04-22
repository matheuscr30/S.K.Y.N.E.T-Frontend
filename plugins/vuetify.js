import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
  theme: {
    primary: '#1565C0',
    secondary: '#42A5F5',
    accent: '#009fe3',
    error: '#b71c1c',
    success: '#0f9d58',
    danger: '#ac2f2f'
  },
  options: {
    customProperties: true
  }
})
