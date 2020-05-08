<template>
  <div>
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div>
      <section class="hero is-small">
        <div class="hero-body">
          <div class="container">
            <div class="search-size mg-l-auto">
              <b-input
                rounded
                v-model="query"
                placeholder="Search name, description..."
                icon="magnify"
              ></b-input>
            </div>
            <div class="card mt-20 pl-10 pr-10">
              <b-table
                :data="filterReports"
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
                    label="Reporter"
                    sortable
                  >{{ props.row.author?props.row.author.displayName:"" }}</b-table-column>
                  <b-table-column
                    sortable
                    field="description"
                    label="Description"
                  >{{ props.row.description }}</b-table-column>
                  <b-table-column
                    field="postDestination"
                    label="Post ID"
                    numeric
                    width="10"
                    centered
                  >
                    <b-tag>{{ props.row.postDestination }}</b-tag>
                  </b-table-column>
                  <b-table-column
                    sortable
                    field="createdAt"
                    label="Date"
                  >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
                  <b-table-column sortable field="type" label="Type">
                    <b-tag :class="reportType(props.row.type)">{{props.row.type}}</b-tag>
                  </b-table-column>
                  <b-table-column label="Detail">
                    <b-button @click="goReport(props.row)">
                      <span>
                        <b-icon icon="database-search" size="25"></b-icon>
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import reportService from "@/services/reportservice";
import newService from "@/services/newservice";
export default {
  name: "Report",
  data() {
    return {
      reports: [],
      query: "",
      isLoading: false
    };
  },
  methods: {
    async fetchReports() {
      const response = await reportService.getAllReport();
      this.reports = response.data.reports;
    },
    reportType(type) {
      if (type === "article") return "is-info";
      else return "is-warning";
    },
    goReport(report) {
      if (report.type === "article") {
        if (report.articleType === "community")
          this.$router.push({
            name: "Community",
            params: { newsId: report.postDestination }
          });
        else if (report.articleType === "news")
          this.$router.push({
            name: "NewsDetail",
            params: { newsId: report.postDestination }
          });
      } else if (report.type === "comment") {
        this.$router.push({
          name: "Comment",
          params: { commentId: report.postDestination }
        });
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchReports();
    this.isLoading = false;
  },
  computed: {
    filterReports() {
      if (this.query !== "") {
        return this.reports.filter(item => {
          return (
            item.description.toLowerCase().match(this.query.toLowerCase()) ||
            (item.author
              ? item.author.displayName
                  .toLowerCase()
                  .match(this.query.toLowerCase())
              : false)
          );
        });
      } else return this.reports;
    }
  }
};
</script>