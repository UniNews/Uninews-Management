<template>
  <div class="container mb-20 mt-20">
    <div class="card">
      <div class="card-image is-centered columns pt-20">
        <img class="avatar shadow" :src="news.imageURL" />
      </div>
      <div class="card-content">
        <div class="content">
          <section>
            <b-tabs v-model="activeTab">
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-key"></b-icon>
                  <span>News</span>
                </template>
                <!-- TODO: ประกอบไปด้วย _id, author, createdAt -->
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="information-outline"></b-icon>
                  <span>Basic information</span>
                </template>
              </b-tab-item>
              <!-- TODO: ประกอบไปด้วย title, description, newsType, imageURL, tags -->
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Views
                    <b-tag rounded>3</b-tag>
                  </span>
                </template>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Likes
                    <b-tag rounded>3</b-tag>
                  </span>
                </template>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Comments
                    <b-tag rounded>3</b-tag>
                  </span>
                </template>
              </b-tab-item>
            </b-tabs>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsService from "../../services/newservice";

export default {
  data() {
    return {
      news: {},
      activeTab: 0
    };
  },
  mounted() {
    this.newsId = this.$route.params.newsId;
    newsService
      .getNewsById(this.newsId)
      .then(res => {
        this.news = { ...res.data };
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};
</script>

<style>
</style>