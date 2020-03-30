<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="columns card pd-45 dp-flex flex-wrap">
          <div class="column is-4" v-for="(item, index) in news" :key="index">
            <div :id="index" class="card pd-21 tx-center">
              <div class="tx-height">{{ item?item.title:"" }}</div>
              <img :src="item?item.imageURL[0]:null" class="img-size">
              <div class="tx-height">{{ item.user?item.user.displayName:null }}</div>
            </div>
          </div>
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
.dp-flex {
  display: flex;
}
.flex-wrap {
  flex-flow: wrap;
}
.img-size { 
  width: 246.66px;
  height: 246.66px;
}
.pd-21 {
  padding: 21px;
}
.tx-height {
  height: 48px;
}
.tx-center {
  text-align: center;
}
div.pd-21:hover {
  border: 1px solid purple;
}
</style>