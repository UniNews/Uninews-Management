<template>
  <div>
    <Header v-if="$route.name !== 'Login'" />
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/partials/Header";
import { mapGetters, mapActions } from "vuex";
import newsService from "./services/newservice";
export default {
  name: "app",
  components: { Header },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapGetters({
      isError: "Auth/isError",
      isAuthenticated: "Auth/isAuthenticated"
    })
  },
  watch: {
    isError: function(value) {
      if (value) this.goLogin();
    }
  },
  methods: {
    ...mapActions({
      autoLogin: "Auth/autoLogin",
      userLogout: "Auth/logout"
    }),
    goLogin() {
      if (this.$route.name !== "Login") this.$router.push("/login");
    }
  },
  async created() {
    if (this.isAuthenticated) {
      this.isLoading = true;
      await this.autoLogin();
      this.isLoading = false;
    } else {
      this.goLogin();
      this.isLoading = false;
    }
  }
};
</script>