<template>
  <main>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="logo navbar-item" to="/">speak out</nuxt-link>
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
.notification {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
}
.logo {
  text-transform: uppercase;
}
</style>

