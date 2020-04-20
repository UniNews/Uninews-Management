
<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="search-size">
          <b-input rounded v-model="query" placeholder="Search name, description..." icon="magnify"></b-input>
        </div>
        <div class="card mt-20 pl-10 pr-10">
          <b-table
            :data="filterNews"
            ref="table"
            paginated
            per-page="10"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template slot-scope="props">
              <b-table-column field="id" label="ID" numeric width="10" centered>
                <b-tag>{{ props.row._id }}</b-tag>
              </b-table-column>
              <b-table-column
                field="author.displayName"
                label="Author"
                sortable
              >{{ props.row.author.displayName }}</b-table-column>
              <b-table-column
                sortable
                field="description"
                label="Description"
              >{{ props.row.description }}</b-table-column>
              <b-table-column
                sortable
                field="createdAt"
                label="Date"
              >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>

              <b-table-column label="Detail">
                <b-button @click="newsClicked(props.row._id)">
                  <span>
                    <b-icon icon="account-search" size="25"></b-icon>
                  </span>
                </b-button>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import newservice from "@/services/newservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";
export default {
  name: "Community",
  data() {
    return {
      news: [],
      query: "",
      isLoading: false,
      eachnews: null,
      isCardModalActive: false,
      comments: []
    };
  },
  methods: {
    async fetchNews() {
      this.isLoading = true;
      const data = await newservice.getAllCommunity();
      this.news = data.data.articles;
      this.isLoading = false;
    },
    convertTimestamp(value) {
      return convertTimestamptoDate(value);
    },
    async fetchNewsById(id) {
      this.isLoading = true;
      const data = await newservice.getNewsById(id);
      const data2 = await newservice.getCommentsById(id);
      this.eachnews = data.data;
      this.comments = data2.data;
      this.isLoading = false;
      this.isCardModalActive = true;
    },
    async deleteArticles(id) {
      this.isLoading = true;
      const data = await newservice.deleteArticles(id);
      this.isCardModalActive = false;
      this.fetchNews();
      this.isLoading = false;
    },
    async deleteComment(id, cid) {
      this.isLoading = true;
      const data = await newservice.deleteComment(cid);
      this.fetchNewsById(id);
      this.isLoading = false;
    },
    newsType(num) {
      if (num <= 0) return "is-info";
      else return "is-warning";
    },
    newsClicked(id) {
      this.$router.push({ name: "Community", params: { newsId: id } });
    }
  },
  mounted() {
    this.fetchNews();
  },
  computed: {
    filterNews() {
      return this.news.filter(item => {
        if (this.query !== "") {
          return `${item.author.displayName.toLowerCase()}${item.description.toLowerCase()}`.match(
            this.query.toLowerCase()
          );
        } else return this.news;
      });
    },
    displayCard() {
      return this.isCardModalActive
        ? "modal is-active modal-background"
        : "modal modal-background";
    }
  }
};
</script>