<template>
  <div>
    <Header v-if="$route.name !== 'Login'" @logout="logout" />
      <router-view></router-view>
    <Footer v-if="$route.name !== 'Login'" @postArticles="postArticles"/>
  </div>
</template>

<script>
import Footer from "./components/partials/Foorter";
import Header from "./components/partials/Header";
import { mapGetters,mapActions } from "vuex"
import newsService from './services/newservice'

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
    },
    postArticles (event) {
      console.log(event)
      newsService.postNews(event)
    }
  },
  mounted(){
    if (this.isAuthenticated) {
      this.autoLogin()
    } else {
      this.$router.push('/login')
    }
  }
};
</script>