<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="$isUserLogged"
      v-model="drawerMenu"
      clipped
      :temporary="$isMobile"
      :stateless="!$isMobile"
      app
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile
            v-if="item.ref"
            :key="item.title"
            @click="$router.push({ name: item.ref })"
          >
            <v-list-tile-action>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-else-if="item.action"
            :key="item.title"
            @click="handleAction(item.action)"
          >
            <v-list-tile-action>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-else-if="item.divider" :key="index" class="ma-2" />
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar clipped-left dark app fixed height="64" color="primary">
      <v-toolbar-side-icon @click.stop="drawerMenu = !drawerMenu" />

      <v-btn icon large @click="redirectDashboard">
        <v-icon medium>wb_incandescent</v-icon>
      </v-btn>

      <v-toolbar-title>S.K.Y.N.E.T</v-toolbar-title>

      <v-spacer />

      <v-btn icon large @click="logout">
        <v-icon medium>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-alert
        v-model="alert.active"
        dismissible
        class="alertText"
        :color="alert.color"
      >
        {{ alert.text }}
      </v-alert>

      <v-container fluid grid-list-md class="pa-0">
        <main class="content">
          {{ $isMobile }}
          <nuxt-child />
        </main>

        <app-snackbar
          v-if="snackbar.active"
          :visible="snackbar.active"
          :data="snackbar.data"
          @close="snackbar.active = false"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'O',
  data() {
    return {
      drawerMenu: false,
      items: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          ref: 'o-dashboard',
          params: {},
          restricted: false
        },
        {
          icon: 'devices_other',
          title: 'Devices',
          ref: 'o-devices',
          params: {},
          restricted: false
        },
        {
          icon: 'meeting_room',
          title: 'Rooms',
          ref: 'o-rooms',
          params: {},
          restricted: false
        },
        { divider: true },
        {
          icon: 'email',
          title: 'Contact',
          action: 'loadSupportEmail',
          restricted: false
        },
        {
          icon: 'help',
          title: 'Help',
          ref: 'o-help',
          params: {},
          restricted: false
        }
      ],
      alert: {
        text: '',
        color: '',
        active: false
      },
      snackbar: {
        active: false,
        data: {}
      }
    }
  },
  methods: {
    redirectDashboard() {
      this.$router.push({ name: 'o-dashboard' })
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
    handleAction(action) {
      if (action === 'loadSupportEmail') {
        this.loadSupportEmail()
      }
    },
    loadSupportEmail() {
      if (process.client)
        window.location.href = 'mailto:matheuscunhareis30@gmail.com'
    },
    activateAlert(text, hasError) {
      this.alert.text = text

      if (hasError) {
        this.alert.color = this.$vuetify.theme.danger
      } else {
        this.alert.color = this.$vuetify.theme.success
      }

      this.snackbar.active = false
      this.alert.active = true
    },
    activateSnackbar(text, hasError) {
      this.snackbar.data.text = text

      if (hasError) {
        this.snackbar.data.color = this.$vuetify.theme.danger
      } else {
        this.snackbar.data.color = this.$vuetify.theme.success
      }

      this.snackbar.active = true
    }
  }
}
</script>

<style scoped>
.alertText {
  font-size: 18px;
}
</style>
