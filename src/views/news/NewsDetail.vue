<template>
  <div>
    <div v-if='!news'>
      <p>No news</p>
    </div>
    <div v-else>
      <p v-for='(value, key) in news' :key='key' style='margin: 10px 0px 0px 10px;'>
        {{key}} : {{value}}
      </p>
    </div>
  </div>
</template>

<script>
import newsService from '../../services/newservice';

export default {
  data() {
    return {
      newsId: null,
      news: null
    }
  },
  mounted() {
    this.newsId = this.$route.params.newsId;
    newsService.getNewsById(this.newsId)
      .then(res => {
        this.news = {...res.data};
      })
      .catch(err => {
        console.log(err.response);
      });
  }
}
</script>

<style>

</style>