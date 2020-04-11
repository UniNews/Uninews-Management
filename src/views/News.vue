<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="mg-b-30 search-size mg-l-auto mg-r-9">
          <b-input
            rounded
            v-model="query"
            placeholder="Search"
            icon="magnify">
          </b-input>
        </div>
        <div class="columns card pd-45 dp-flex flex-wrap">
          <div class="column is-4" v-for="(item, index) in filterNews" :key="index">
            <div :id="index" class="card pd-21 tx-center">
              <div class="tx-height newsTitle">{{ item.title?item.title:item.description}}</div>
              <img :src="item.imageURL?item.imageURL:null" class="img-size">
              <div class="tx-height">{{ item.author?item.author.displayName:null }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </section>
</template>

<script>
import newservice from "../services/newservice"
export default {
  name: "News",
  data() {
    return {
      news:[],
      query:'',
      isLoading: false,
    };
  },
  methods: {
    async fetchNews() {
      this.isLoading = true;
      const data = await newservice.getAllNews()
      this.news = data.data.articles
      this.isLoading = false;
    }
  },
  mounted(){
    this.fetchNews()
  },
  computed: {
    filterNews(){
      return this.news.filter(item=>{
        if(this.query!=='') {
          if(item.title) 
            return item.title.toLowerCase().match(this.query.toLowerCase()) || (item.author?item.author.displayName.toLowerCase().match(this.query.toLowerCase()):false)
          else
            return item.description.toLowerCase().match(this.query.toLowerCase()) || (item.author?item.author.displayName.toLowerCase().match(this.query.toLowerCase()):false)
        } else{
          if(item.title)
            return item.title !== this.query
          else
            return item.description !== this.query
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
div.pd-21:hover {
  border: 1px solid purple;
}
.mg-b-30 {
  margin-bottom: 30px;
}
.mg-r-9 {
  margin-right: 9px;
}
.newsTitle {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>