<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="כניסה למערכת">
        <v-text-field
          label="שם משתמש"
          v-model="username"
        ></v-text-field>
        <br>
        <v-text-field
          label="ססמה"
          type="password"
          v-model="password"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="login">
          התחברות למערכת
        </v-btn>
        <v-btn
          class="cyan"
          @click="login">
          שכחתי ססמה
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
