<template>
  <div>
    <Header v-if="$route.name !== 'Login'" @logout="logout" />
      <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/partials/Foorter";
import Header from "./components/partials/Header";
import { mapGetters,mapActions } from "vuex"

export default {
  name: "app",
  components: { Footer, Header },
  computed: {
    ...mapGetters({
      isAuthenticated:'Auth/isAuthenticated'
    })
  },
  methods:{
    ...mapActions({
      autoLogin:'Auth/autoLogin',
      userLogout:'Auth/logout'
    }),
    async logout (event) {
      if (event) {
        const logoutStatus = await this.userLogout()
        this.$router.push('/login')
      }
    }
  },
  mounted(){
    if (this.isAuthenticated) {
      console.log('sssss')
      this.autoLogin()
    } else {
      this.$router.push('/login')
    }
  }
};
</script>