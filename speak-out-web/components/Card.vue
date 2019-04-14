<template>
  <div class="box">
    <article class="media">
      <div class="media-left box-left">
        <figure class="image is-64x64">
          <img class="avatar" src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>

        <button class="button is-white">
          <b-icon size="is-small" icon="thumb-up"></b-icon>
          <span>{{ post.vote }}</span>
        </button>
      </div>
      <div class="media-content">
        <div class="content">
          <strong>{{ post.title }}</strong>
          <p>{{ post.content }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box-left {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  .image {
    margin-bottom: 0.5rem;
  }
}
</style>

