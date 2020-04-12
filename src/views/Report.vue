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
            <div :id="index" class="card pd-21 tx-center" @click="fetchNewsById(item._id)">
              <div class="tx-height newsTitle">{{ item.description }}</div>
              <div class="tx-height">{{ item.author?item.author.displayName:null }}</div>
              <div>{{ convertTimestamp(item.createdAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="displayCard" scroll="keep">
      <div class="dp-flex flex-center">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title tx-center newsTitle w-1">{{ eachnews?eachnews.title:null }}</p>
            <button class="delete" @click="isCardModalActive=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="mg-40">
              <div class="tx-center">
                คำอธิบาย
              </div>
              <div class="tx-center">
                {{ eachnews?eachnews.description:"" }}
              </div>
              <div class="columns border-bt-tp">
                <div class="column tx-center">
                  คนเขียน
                </div>
                <div class="column tx-center">
                  {{ eachnews?eachnews.author.displayName:"" }}
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <b-button class="bg-red" @click="deleteArticles(eachnews._id)">
              <span>
                <b-icon
                  icon="delete"
                  size="30">
                </b-icon>
              </span>
            </b-button>
          </footer>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"/>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import reportService from "@/services/reportservice"
import { convertTimestamptoDate } from '@/assets/javascript/date'
export default {
  name: "Report",
  data() {
    return {
      news:[],
      query:'',
      isLoading:false,
      eachnews:null,
      isCardModalActive:false
    };
  },
  methods: {
    async fetchNews() {
      this.isLoading = true
      const data = await reportService.getAllReport()
      this.news = data.data.reports
      this.isLoading = false
    },
    convertTimestamp(value){
      return convertTimestamptoDate(value)
    },
    async fetchNewsById (id) {
      this.isLoading = true
      const data = await reportService.getReportById(id)
      this.eachnews = data.data.report
      this.isLoading = false
      this.isCardModalActive = true
    },
    async deleteArticles (id) {
      this.isLoading = true
      const data = await reportService.deleteReportById(id)
      this.isCardModalActive = false
      this.fetchNews()
      this.isLoading = false
    }
  },
  mounted() {
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
    },
    displayCard() {
        return this.isCardModalActive? "modal is-active modal-background" : "modal modal-background"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-wrap {
  flex-flow: wrap;
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
.bg-red {
  background-color: #FFA07A;
}
.w-1 {
  width: 1px
}
.img-avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
.mg-10 {
  margin: 10px;
}
.mg-25 {
  margin: 25px;
}
.mg-37 {
  margin: 37px;
}
.flex-item-center {
  align-items: center;
}
</style>