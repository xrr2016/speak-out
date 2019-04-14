<template>
  <div class="box">
    <article class="media">
      <div class="media-left box-left">
        <figure class="image is-32x32 avatar">
          <img class="is-rounded" :src="post.author.avatar" :alt="post.author.username">
        </figure>

        <button class="button is-white" @click="voteUp">
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
  },
  methods: {
    voteUp() {
      const post = this.post

      this.$axios
        .put(`/api/post/${post._id}`, { vote: post.vote + 1 })
        .then(result => {
          post.vote += 1
        })
        .catch(err => {
          this.$toast.open({
            message: '出错了，请重试',
            type: 'is-danger'
          })
        })
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

