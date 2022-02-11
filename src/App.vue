<template>
  <v-app>
    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer"  
    >

        <v-list>
          <v-list-item
            v-for="link of links"
            :key="link.title"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon
                v-if="link.icon"
                color="primary"
              >
                {{ link.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title text-color="primary" v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="onLogout"
            v-if="isUserLoggedIn"
          >
            <v-list-item-icon>
              <v-icon
                color="primary"
              >mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title text-color="primary">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      >
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <!-- <router-link to="/" tag="span" class="pointer">Ad Application</router-link>-->
        <router-link to="/" custom v-slot="{ navigate }">
          <span class="pointer" @click="navigate" @keypress.enter="navigate" role="link">Ad Application</span>
        </router-link>

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items  
        class="hidden-sm-and-down"
      >
        <v-btn 
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          text
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn 
          v-if="isUserLoggedIn"
          @click="onLogout"
          text
        >
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
        <router-view></router-view>
    </v-main>

    <template v-if="error">
      <v-snackbar
        color="error"
        @input="closeError"
        :timeout="timeout"
        :value="true"
      > 
        {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click.native="closeError"
            dark
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      timeout: 5000,
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    links() {
      if(this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
          {title: 'New Ad', icon: 'mdi-calendar-text', url: '/new'},
          {title: 'My Ads', icon: 'mdi-format-list-bulleted-square', url: '/list'},
        ]
      }

      return [
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration', icon: 'mdi-emoticon', url: '/registration'},
      ]
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
    onLogout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
