<template>
  <section class="hero is-large">
    <div class="hero-body">
      <div class="container">
        {{users}}
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import newservice from "../services/userservice"
export default {
  name: "Dashboard",
  data() {
    return {
      users:[]
    };
  },
  methods: {
    async fetchNews () {
      const data = await newservice.getAllUser()
      this.users = data
    }
  },
  mounted(){
    this.fetchNews()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>