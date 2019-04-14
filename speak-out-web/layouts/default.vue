<template>
  <main>
    <nav
      class="navbar header is-fixed-top has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="main-content">
        <nuxt-link class="logo button is-primary" to="/">speak out</nuxt-link>
        <nuxt-link class="button is-primary" to="user">登陆</nuxt-link>
      </div>
    </nav>
    <nuxt/>
  </main>
</template>

<script>
export default {
  data() {
    return {}
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

