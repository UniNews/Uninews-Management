<template>
  <div>
    <Header />
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
      autoLogin:'Auth/autoLogin'
    })
  },
  mounted(){
    if(this.isAuthenticated){
      this.autoLogin()
    }else{
      this.$router.push('/')
    }
  }
};
</script>

<style>
</style>