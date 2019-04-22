<template>
  <div>
    <v-app>
      <v-toolbar clipped-left dark fixed height="50" flat color="primary">
        <v-icon>home</v-icon>
        <v-toolbar-title>S.K.Y.N.E.T</v-toolbar-title>
      </v-toolbar>

      <v-content id="landingContent">
        <section style="height: 94%">
          <v-layout row wrap justify-center>
            <v-flex xs11 sm6 md5 mt-5>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  height="200px"
                >
                </v-img>

                <v-card-text>
                  <v-form
                    ref="loginForm"
                    v-model="validation.validLogin"
                    lazy-validation
                  >
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="validation.models.email"
                          autocomplete="new-password"
                          tabindex="1"
                          :rules="validation.rules.email"
                          label="Email"
                          required
                        />
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                          v-model="validation.models.password"
                          autocomplete="new-password"
                          tabindex="2"
                          :append-icon="
                            validation.auxiliary.showPassword
                              ? 'visibility_off'
                              : 'visibility'
                          "
                          :rules="validation.rules.password"
                          :type="
                            validation.auxiliary.showPassword
                              ? 'text'
                              : 'password'
                          "
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          required
                          @keyup.enter="login"
                          @click:append="
                            validation.auxiliary.showPassword = !validation
                              .auxiliary.showPassword
                          "
                        />
                      </v-flex>

                      <v-layout row wrap pt-3>
                        <v-flex text-xs-right>
                          <v-btn
                            tabindex="3"
                            color="success"
                            :disabled="!validation.validLogin"
                            :loading="loadingLogin"
                            @click="login"
                          >
                            Login
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-layout>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </section>

        <v-footer dark style="height: 6%;">
          <v-layout row wrap align-center>
            <v-flex xs12>
              <div class="white--text ml-3">
                Made with
                <v-icon class="red--text">favorite</v-icon>
                by Matheus Cunha Reis
              </div>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-content>

      <app-snackbar
        v-if="snackbar.active"
        :visible="snackbar.active"
        :data="snackbar.data"
        @close="snackbar.active = false"
      />
    </v-app>
  </div>
</template>

<script>
import Snackbar from '@/components/Helpers/Snackbar'

export default {
  name: 'Landing',
  components: {
    'app-snackbar': Snackbar
  },
  data() {
    return {
      loadingLogin: false,
      snackbar: {
        active: false,
        data: {}
      },
      validation: {
        validLogin: false,
        models: {
          password: '',
          email: ''
        },
        rules: {
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Min 8 characters'
          ],
          email: [
            v => !!v || 'Email is required',
            // eslint-disable-next-line
            v => /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(v) || 'E-mail must be valid'
          ]
        },
        auxiliary: {
          showPassword: false
        }
      }
    }
  },
  methods: {
    activateSnackbar(text, hasError) {
      this.snackbar.data.text = text

      if (hasError) {
        this.snackbar.data.color = this.$vuetify.theme.danger
      } else {
        this.snackbar.data.color = this.$vuetify.theme.success
      }

      this.snackbar.active = true
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        this.loadingLogin = true
        const data = {
          email: this.validation.models.email,
          password: this.validation.models.password
        }

        const res = await this.$store.dispatch('auth/requestToken', data)
        if (res) {
          this.activateSnackbar(res, true)
        } else {
          this.$router.push({ name: 'o-dashboard' })
        }
        this.loadingLogin = false
      }
    },
    clear() {
      this.$refs.registerForm.reset()
    }
  }
}
</script>

<style>
#landingContent {
  margin-top: 50px;
  background: linear-gradient(
    to bottom,
    var(--v-primary-base) 0%,
    var(--v-secondary-base) 100%
  );
}
</style>
