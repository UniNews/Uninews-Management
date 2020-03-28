<template>
  <section class="hero is-large">
    <div class="hero-body">
      <div class="container">
        <div class="card card-width margin-auto card-padding" v-if="!isAuthenticated">
          <b-field label="Username">
              <b-input v-model="username"></b-input>
          </b-field>
          <b-field label="Password">
              <b-input type="password" v-model="password"></b-input>
          </b-field>
          <div class="dp-flex">
            <button class="button is-success is-outlined" v-on:click="onSubmit(username,password)">Login</button>
          </div>
        </div>
        <div v-else>
          <h1>Logged in</h1>
        </div>
      </div>
    </div>
  </section>
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
.card-width {
  max-width: 33.3%;
}
.margin-auto {
  margin:auto;
}
.card-padding {
  padding: 15px;
}
.dp-flex{
  display: flex;
  justify-content: center;
}
</style>