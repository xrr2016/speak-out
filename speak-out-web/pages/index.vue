<template>
  <section class="section">
    <div class="main-content columns">
      <div class="column is-three-quarters posts">
        <div class="box" v-if="posts.length <= 0">
          <div class="media-content">
            <div class="content">什么都没有</div>
          </div>
        </div>

        <template v-else>
          <post-card v-for="(post, index) of posts" :key="index" :post="post"/>
          <button
            class="button is-outlined is-fullwidth"
            v-if="posts.length >= 10"
            :class="{ 'is-loading': isLoading}"
            :disabled="isLoading || isTotalPost"
            @click="loadMorePost"
          >{{ isTotalPost ? '没有更多了' : '加载更多'}}</button>
        </template>
      </div>
      <div class="column actions">
        <button
          class="button is-primary is-outlined is-fullwidth"
          :disabled="authUser === null"
          @click="showModal"
        >新增</button>
      </div>
      <button
        class="button is-primary is-large float-button"
        :disabled="authUser === null"
        @click="showModal"
      >
        <b-icon icon="plus"></b-icon>
      </button>
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
// import io from 'socket.io-client'
import { mapState } from 'vuex'
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
  mounted() {
    // const socket = io({
    //   transports: ['websocket']
    // })
    // socket.on('connect', () => {
    //   console.log(socket.id)
    // })
  },
  data() {
    return {
      posts: [],
      currentPage: 0,
      isTotalPost: false,
      isLoading: false,
      isShowModal: false,
      isSubmiting: false,
      postForm: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['authUser']),
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
      const author = this.authUser.id

      this.isSubmiting = true
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
          const data = err.response.data

          this.$toast.open({
            message: '发布失败 ' + data.message,
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
    },
    async loadMorePost() {
      if (this.isTotalPost) {
        return
      }

      this.isLoading = true
      const posts = await this.$axios.$get(
        'api/post/pagination?page=' + this.currentPage
      )
      this.isLoading = false

      if (!posts.length) {
        this.isTotalPost = true
        return
      }

      posts.forEach(post => {
        this.posts.push(post)
      })

      this.currentPage++
    }
  }
}
</script>

<style lang="scss" scoped>
.posts {
  padding-left: 0;
}
.actions {
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
}
.float-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
}
.modal-form {
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 640px;
  margin: 0 auto;
  .modal-card-foot {
    justify-content: flex-end;
  }
}
</style>

