<template>
  <section class="section">
    <b-tabs class="block form-tabs">
      <b-tab-item label="登陆">
        <form @submit.prevent="handleSubmit">
          <b-field>
            <b-input v-model="loginForm.username" placeholder="输入用户名"></b-input>
          </b-field>

          <b-field>
            <b-input
              v-model="loginForm.password"
              type="password"
              placeholder="输入密码"
              password-reveal
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
            <b-input
              v-model="signupForm.password"
              required
              type="password"
              placeholder="输入密码"
              password-reveal
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
import * as md5 from 'blueimp-md5'

export default {
  layout: 'empty',
  mounted() {
    // this.$axios
    //   .get('http://localhost:6666/user')
    //   .then(result => {
    //     console.log('result :', result)
    //   })
    //   .catch(err => {})
  },
  data() {
    return {
      isSubmiting: false,
      loginForm: {
        username: '',
        password: ''
      },
      signupForm: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isCanLogin() {
      return true
    },
    isCanSignup() {
      const { email, username, password } = this.signupForm
      return email.length > 0 && username.length > 0 && password.length > 0
    }
  },
  methods: {
    handleSignup() {
      const { email, username, password } = this.signupForm
      const hash = md5(password)
      console.log(email, username, password, hash)
    },
    handleSubmit(event) {
      this.isSubmiting = true

      setTimeout(() => {
        this.isSubmiting = false
        this.$toast.open({
          message: '登陆失败',
          type: 'is-success'
        })
      }, 2000)
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
