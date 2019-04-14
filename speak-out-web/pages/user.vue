<template>
  <section class="section">
    <b-tabs class="block main-content" v-model="tabIndex">
      <b-tab-item label="登陆">
        <form @submit.prevent="handleLogin">
          <b-field>
            <b-input v-model="loginForm.email" required type="email" placeholder="输入邮箱地址"></b-input>
          </b-field>

          <b-field>
            <b-input
              v-model="loginForm.password"
              type="password"
              placeholder="输入密码"
              password-reveal
              required
            ></b-input>
          </b-field>

          <b-field>
            <button
              class="button is-primary is-fullwidth"
              :class="{ 'is-loading': isSubmiting}"
              :disabled="!isCanLogin"
              type="submit"
            >登陆</button>
          </b-field>
        </form>
      </b-tab-item>
      <b-tab-item label="注册">
        <form @submit.prevent="handleSignup">
          <b-field>
            <b-input v-model="signupForm.email" required type="email" placeholder="输入邮箱地址"></b-input>
          </b-field>

          <b-field>
            <b-input v-model="signupForm.username" placeholder="输入用户名"></b-input>
          </b-field>

          <b-field>
            <b-input
              v-model="signupForm.password"
              type="password"
              placeholder="输入密码"
              password-reveal
              required
            ></b-input>
          </b-field>

          <b-field>
            <button
              class="button is-primary is-fullwidth"
              :class="{ 'is-loading': isSubmiting}"
              :disabled="!isCanSignup"
              type="submit"
            >注册</button>
          </b-field>
        </form>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'UserPage',
  data() {
    return {
      tabIndex: 0,
      isSubmiting: false,
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    isCanLogin() {
      const { email, password } = this.loginForm
      return email.length > 0 && password.length > 0
    },
    isCanSignup() {
      const { email, password } = this.signupForm
      return email.length > 0 && password.length > 0
    }
  },
  methods: {
    ...mapMutations({
      SET_AUTH_USER: 'SET_AUTH_USER',
      SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN'
    }),
    handleLogin(event) {
      const { email, password } = this.loginForm

      if (!email || !password) {
        return
      }

      this.isSubmiting = true

      this.$axios
        .post('/api/user/login', {
          email,
          password
        })
        .then(res => {
          const result = res.data
          if (result.success) {
            this.SET_AUTH_USER(result.user)
            this.SET_ACCESS_TOKEN(result.token)
            this.$axios.setToken(result.token, 'Bearer')
            this.$router.push('/')
          } else {
            this.$toast.open({
              message: result.message,
              type: 'is-danger'
            })
          }
        })
        .catch(error => {
          const data = error.response.data
          this.$toast.open({
            message: data.message,
            type: 'is-danger'
          })
        })
        .finally(() => {
          this.isSubmiting = false
        })
    },
    handleSignup() {
      const { email, username, password } = this.signupForm

      if (!email || !password) {
        return
      }

      this.isSubmiting = true

      this.$axios
        .post('/api/user/register', {
          email,
          username,
          password
        })
        .then(res => res.data)
        .then(result => {
          if (result.success) {
            this.$toast.open({
              message: '注册成功，请登陆',
              type: 'is-success'
            })
            this.tabIndex = 0
          } else {
            this.$toast.open({
              message: result.message,
              type: 'is-danger'
            })
          }
        })
        .catch(error => {
          const data = error.response.data
          this.$toast.open({
            message: data.message,
            type: 'is-danger'
          })
        })
        .finally(() => {
          this.isSubmiting = false
        })
    }
  }
}
</script>

<style lang="scss">
.form-tabs {
  max-width: 640px;
  margin: 0 auto;
}
</style>
