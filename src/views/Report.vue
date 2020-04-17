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
              <div class="tx-height hd-w-bold">{{ item.author?item.author.displayName:null }}</div>
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
            <p class="modal-card-title tx-center newsTitle w-1">การรายงาน</p>
            <button class="delete" @click="isCardModalActive=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="mg-40">
              <div class="columns">
                <div class="column is-one-third tx-center">
                  <img :src="eachnews? eachnews.author.avatarURL:null" class="img-avatar"/>
                </div>
                <div class="column pd-25">
                  <div class="hd-size hd-w-bold">
                    {{eachnews?eachnews.author.displayName:null}}
                  </div>
                  <div class="dp-flex pd-tp-10">
                    <b-icon
                      icon="calendar"
                      size="30">
                    </b-icon>
                    <div>
                      {{eachnews?convertTimestamp(eachnews.createdAt):null}}
                    </div>
                  </div>
                  <div class="pd-tp-10">
                    {{eachnews?eachnews.description:null}}
                  </div>
                </div>
              </div>
              <div class="columns border-bt-tp">
                <div class="column hd-w-bold tx-center">
                  ประเภทโพสต์
                </div>
                <div class="column tx-center">
                  {{eachnews?eachnews.type==="article"?destinationArticle.articleType:eachnews.type:null}}
                </div>
              </div>
              <div class="columns border-bt">
                <div class="column hd-w-bold tx-center">
                  โพสต์เมื่อ
                </div>
                <div class="column">
                  <div class="dp-flex flex-center">
                    <b-icon
                      icon="calendar"
                      size="30">
                    </b-icon>
                    <div>
                      {{destinationArticle? convertTimestamp(destinationArticle.createdAt):null}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns border-bt">
                <div class="column hd-w-bold tx-center">
                  โพสต์โดย
                </div>
                <div class="column tx-center">
                  <img :src="destinationArticle?destinationArticle.author.avatarURL:null" class="img-avatar"/>
                  <div class="hd-w-bold">{{destinationArticle?destinationArticle.author.displayName:null}}</div>
                  <div>UserID {{destinationArticle?destinationArticle.author._id:null}}</div>
                </div>
              </div>
              <div class="columns flex-center border-bt">
                <div class="mg-14 hd-w-bold">เนื้อหาโพสต์</div>
              </div>
              <div class="columns">
                {{ destinationArticle?destinationArticle.articleType==="news"?destinationArticle.title:destinationArticle.description:null }}
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <b-button type="is-danger" @click="deleteArticles(eachnews._id)">
              <span>
                Delete
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
import newService from '@/services/newservice'
import { convertTimestamptoDate } from '@/assets/javascript/date'
export default {
  name: "Report",
  data() {
    return {
      news:[],
      query:'',
      isLoading:false,
      eachnews:null,
      isCardModalActive:false,
      destinationArticle:null
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
      let result
      if( this.eachnews.type==="article" ) { 
        result = await newService.getNewsById(this.eachnews.postDestination)
      } else {
        result = await newService.getComment(this.eachnews.postDestination)
      }
      if(result){
        this.destinationArticle = result.data
        this.isLoading = false
        this.isCardModalActive = true
      }
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
.mg-tp-25 {
  margin-top: 25px;
}
.mg-14 {
  margin: 14px;
}
</style>