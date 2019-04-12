<template>
  <main>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="return-container">
        <nuxt-link class="navbar-item" to="/">
          <b-icon icon="chevron-left" type="is-white"></b-icon>
        </nuxt-link>
      </div>
    </nav>
    <nuxt/>
  </main>
</template>

<style lang="scss" scoped>
.return-container {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 3.25rem;
  max-width: 640px;
  margin: 0 auto;
}
</style>


