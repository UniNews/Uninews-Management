<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="card pd-45">
          {{ news }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import newservice from "../services/newservice"
export default {
  name: "News",
  data() {
    return {
      news:[]
    };
  },
  methods: {
    async fetchNews() {
      const data = await newservice.getAllNews()
      this.news = data.data
    }
  },
  mounted(){
    this.fetchNews()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pd-45 {
  padding: 45px;
}
</style>