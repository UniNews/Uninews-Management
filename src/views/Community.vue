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
            <p class="modal-card-title tx-center newsTitle w-1">โพสต์สาธารณะ</p>
            <button class="delete" @click="isCardModalActive=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="mg-40">
              <div class="columns border-bt">
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
                    {{ eachnews?eachnews.description:"" }}
                  </div>
                </div>
              </div>
              <div class="mg-25 hd-w-bold hd-comment">
                ความเห็น
              </div>
              <div v-if="comments!==[]">
                <div v-for="(comment, index) in comments" :key="index" class="columns card mg-14">
                  <div class="column is-one-third mg-10">
                    <img :src="comment?comment.author.avatarURL:null" class="img-avatar"/>
                  </div>
                  <div class="column dp-flex flex-item-start flex-between">
                    <div class="mg-37">
                      <div>{{ comment?comment.author.displayName:null }}</div>
                      <div class="pd-tp-10">{{ comment?comment.description:null }}</div>
                      <div class="dp-flex pd-tp-10">
                        <b-icon
                        icon="calendar"
                        size="30">
                        </b-icon>
                        {{ comment?convertTimestamp(comment.createdAt):null }}
                      </div>
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
  name: "Community",
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
      const data = await newservice.getAllCommunity()
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
      const data = await newservice.deleteComment(cid)
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