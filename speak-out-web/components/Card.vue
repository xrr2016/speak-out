<template>
  <div class="box">
    <article class="media">
      <div class="media-left box-left">
        <figure class="image is-48x48 avatar">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>

        <button class="button is-white">
          <b-icon size="is-small" icon="thumb-up"></b-icon>
          <span>{{ post.vote }}</span>
        </button>
      </div>
      <div class="media-content">
        <div class="content">
          <small class="is-text username">{{ post.author.username }}</small>
          <p>
            <strong>{{ post.title }}</strong>
          </p>
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
.box:not(:last-child) {
  margin-bottom: 0.8rem;
}
.box-left {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  .avatar {
    margin-bottom: 0.5rem;
  }
  .username {
    max-width: 4em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

