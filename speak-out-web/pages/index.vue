<template>
  <section class="section">
    <div class="main-content columns">
      <div class="column is-three-quarters posts">
        <ul>
          <li v-for="post of posts" :key="post._id">{{ post.title }}</li>
        </ul>
      </div>
      <div class="column actions">
        <a class="button is-primary is-outlined is-fullwidth" @click="showModal">新增</a>
      </div>
    </div>
    <b-modal :active.sync="isShowModal">
      <form class="modal-form" @submit.prevent="createPost">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">新增</p>
          </header>
          <section class="modal-card-body">
            <b-field label="标题">
              <b-input
                v-model="postForm.title"
                maxlength="50"
                has-counter
                placeholder="标题"
                required
              ></b-input>
            </b-field>

            <b-field label="内容">
              <b-input
                type="textarea"
                v-model="postForm.content"
                maxlength="140"
                has-counter
                placeholder="内容（可选）"
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isShowModal = false">取消</button>
            <button
              class="button is-primary"
              :class="{ 'is-loading' : isSubmiting }"
              :disabled="!isCanSubmit"
              type="submit"
            >发布</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
import PostCard from '../components/Card'

export default {
  name: 'HomePage',
  components: {
    PostCard
  },
  async asyncData({ $axios }) {
    const posts = await $axios.$get('api/post/pagination')
    return { posts }
  },
  data() {
    return {
      currentPage: 0,
      isShowModal: false,
      isSubmiting: false,
      postForm: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    isCanSubmit() {
      return this.postForm.title.length > 0
    }
  },
  methods: {
    showModal() {
      this.isShowModal = true
    },
    createPost() {
      const { title, content } = this.postForm
      this.isSubmiting = true

      const author = '5cb1289db63cc9bef0efc05a'

      this.$axios
        .post('/api/post', { title, content, author })
        .then(result => {
          const post = result.data
          this.posts.unshift(post)
          this.$toast.open({
            message: '发布成功',
            type: 'is-success'
          })
        })
        .catch(err => {
          console.log('err :', err)
          this.$toast.open({
            message: '发布失败',
            type: 'is-danger'
          })
        })
        .finally(() => {
          this.isSubmiting = false
          this.isShowModal = false
          this.postForm = {
            title: '',
            content: ''
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-form {
  display: flex;
  justify-content: center;
  .modal-card-foot {
    justify-content: flex-end;
  }
}
</style>

