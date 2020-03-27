<template>
  <div>
    <div v-if="!isAuthenticated">
      <h1>Sign in</h1>
      <p>
        <router-link :to="{ name: 'register' }">Need an account?</router-link>
      </p>
      <form v-on:submit.prevent="onSubmit(username, password);">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button>Sign in</button>
      </form>
    </div>
    <div v-else>
      <h1>Logged in</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    ...mapActions({
      login:'Auth/login'
    }),
    onSubmit(username, password) {
      const auth = {
        username: this.username,
        password: this.password
      }
      this.login(auth)
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated:'Auth/isAuthenticated'
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>