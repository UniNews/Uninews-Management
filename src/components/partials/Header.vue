<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/news' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/#/users">Users</b-navbar-item>
      <b-navbar-item href="/#/news">News</b-navbar-item>
      <b-navbar-item href="/#/communities">Communities</b-navbar-item>
      <b-navbar-item href="/#/reports">Reports</b-navbar-item>
    </template>
    <template v-if="this.user !== null" slot="end">
      <b-navbar-item class="profile-nav" tag="div">
        <div class="profile" @click="profileClicked()">
          <span>{{ user.displayName }}</span>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" outlined @click="logout()">Logout</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapActions({
      userLogout: "Auth/logout"
    }),
    async logout() {
      await this.userLogout();
      this.$router.push("/login");
    },
    profileClicked() {
      this.$router.push("/myUser");
    }
  },
  computed: {
    ...mapGetters({
      user: "Auth/getUser"
    })
  }
};
</script>
<style scoped>
.profile-nav {
  cursor: pointer;
}
.profile-nav:hover {
  background-color: rgb(250, 250, 250);
}
</style>