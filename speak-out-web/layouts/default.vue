<template>
  <main>
    <nav
      class="navbar header is-fixed-top has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="main-content">
        <nuxt-link class="logo button is-primary" to="/">speak out</nuxt-link>

        <template v-if="authUser !== null">
          <b-dropdown aria-role="list">
            <button class="button is-primary" slot="trigger">
              <figure class="image is-24x24 avatar">
                <img class="is-rounded" :src="authUser.avatar">
              </figure>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem" @click="logout">登出</b-dropdown-item>
          </b-dropdown>
        </template>

        <nuxt-link class="button is-primary" to="user" v-else>登陆</nuxt-link>
      </div>
    </nav>
    <nuxt/>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['authUser'])
  },
  methods: {
    logout() {
      this.$store.commit('SET_AUTH_USER', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 3.25rem;
  .button {
    height: 3.25rem;
  }
  .logo {
    text-transform: uppercase;

    @media screen and (min-width: 652px) {
      transform: translateX(-12px);
    }
  }
}
</style>

