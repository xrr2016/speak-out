<template>
  <section class="section">
    <b-tabs class="block form-tabs">
      <b-tab-item label="登陆">
        <form @submit.prevent="handleSubmit">
          <b-field>
            <b-input v-model="username" placeholder="输入用户名"></b-input>
          </b-field>

          <b-field>
            <b-input v-model="password" type="password" placeholder="输入密码" password-reveal></b-input>
          </b-field>

          <b-field>
            <button
              class="button is-primary is-fullwidth"
              :class="{ 'is-loading': isSubmiting}"
              :disabled="!isCanSubmit"
              type="submit"
            >登陆</button>
          </b-field>
        </form>
      </b-tab-item>
      <b-tab-item label="注册">
        <form @submit.prevent="handleSubmit">
          <b-field>
            <b-input v-model="email" type="email" placeholder="输入邮箱地址"></b-input>
          </b-field>

          <b-field>
            <b-input v-model="username" placeholder="输入用户名"></b-input>
          </b-field>

          <b-field>
            <b-input v-model="password" type="password" placeholder="输入密码" password-reveal></b-input>
          </b-field>

          <b-field>
            <button
              class="button is-primary is-fullwidth"
              :class="{ 'is-loading': isSubmiting}"
              :disabled="!isCanSubmit"
              type="submit"
            >注册</button>
          </b-field>
        </form>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      isSubmiting: false,
      email: '',
      username: '',
      password: ''
    }
  },
  computed: {
    isCanSubmit() {
      return this.username.length > 0 && this.password.length > 0
    }
  },
  methods: {
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
