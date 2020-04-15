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
              <div class="tx-height newsTitle">{{ item.title }}</div>
              <img :src="item.imageURL" class="img-size">
              <div>{{ item.newsType }}</div>
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
          <section class="modal-card-body pd-0">
            <div class="dp-flex flex-center">
              <img :src="eachnews?eachnews.imageURL:null" class="news-img-size">
            </div>
            <div class="mg-40">
              <div class="columns">
                <div class="column is-one-third tx-center">
                  <img :src="eachnews? eachnews.author.avatarURL:null" class="img-avatar"/>
                </div>
                <div class="column pd-25">
                  <div class="hd-size hd-w-bold">
                    {{eachnews?eachnews.author.displayName:null}}
                  </div>
                  <div>
                    {{eachnews?eachnews.title:null}}
                  </div>
                  <div class="dp-flex">
                    <b-icon
                      icon="calendar"
                      size="30">
                    </b-icon>
                    <div>
                      {{eachnews?convertTimestamp(eachnews.createdAt):null}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="tx-center border-bt-tp pd-19 dp-flex flex-center flex-item-center t-height">
                {{ eachnews?eachnews.description:"" }}
              </div>
              <div class="mg-25 hd-w-bold hd-comment">
                ความเห็น
              </div>
              <div v-if="comments!==[]">
                <div v-for="(comment, index) in comments" :key="index" class="columns card border-bt-tp mg-14">
                  <div class="column is-one-third mg-10">
                    <img :src="comment?comment.author.avatarURL:null" class="img-avatar"/>
                  </div>
                  <div class="column dp-flex flex-item-start flex-between">
                    <div class="mg-37">
                      <div>{{ comment?comment.author.displayName:null }}</div>
                      <div>{{ comment?comment.description:null }}</div>
                      <div>{{ comment?convertTimestamp(comment.createdAt):null }}</div>
                    </div>
                    <div>
                      <b-button @click="deleteComment(eachnews._id,comment._id)">
                        <span>
                          <b-icon
                            icon="close"
                            size="30">
                          </b-icon>
                        </span>
                      </b-button>
                    </div>
                  </div>
                </div>
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
import newservice from "@/services/newservice"
import { convertTimestamptoDate } from '@/assets/javascript/date'
export default {
  name: "News",
  data() {
    return {
      news:[],
      query:'',
      isLoading:false,
      eachnews:null,
      isCardModalActive:false,
      comments:[]
    };
  },
  methods: {
    async fetchNews() {
      this.isLoading = true
      const data = await newservice.getAllNews()
      this.news = data.data.articles
      this.isLoading = false
    },
    convertTimestamp(value){
      return convertTimestamptoDate(value)
    },
    async fetchNewsById (id) {
      this.isLoading = true
      const data = await newservice.getNewsById(id)
      const data2 = await newservice.getCommentsById(id)
      this.eachnews = data.data
      this.comments = data2.data
      this.isLoading = false
      this.isCardModalActive = true
    },
    async deleteArticles (id) {
      this.isLoading = true
      const data = await newservice.deleteArticles(id)
      this.isCardModalActive = false
      this.fetchNews()
      this.isLoading = false
    },
    async deleteComment (id,cid) {
      this.isLoading = true
      const data = await newservice.deleteComment(id, cid)
      this.fetchNewsById(id)
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
.mg-14 {
  margin: 14px;
}
.mg-37 {
  margin: 37px;
}
.flex-item-center {
  align-items: center;
}
.pd-0 {
  padding: 0px;
}
.news-img-size {
  width: 640px;
  height: 426.66px;
}
.pd-25 {
  padding: 25px;
}
.border-bt-tp {
  border-bottom: 0.25px solid;
  border-top: 0.25px solid;
  border-color: #DCDCDC;
}
.hd-size {
  font-size: 20px;
}
.hd-w-bold {
  font-weight: bold;
}
.pd-19 {
  padding: 19px;
}
.t-height {
  height: 170px;
}
.hd-comment {
  margin-top: 10px;
  margin-bottom: 10px;
  border-left: 4px #DCDCDC solid;
  padding-left: 10px;
}
.flex-item-start {
  align-items: start;
}
.flex-between {
  justify-content: space-between;
}
</style>