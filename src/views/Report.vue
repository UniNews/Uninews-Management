<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="pd-25 search-size mg-l-auto">
          <b-input rounded v-model="query" placeholder="Search name" icon="magnify"></b-input>
        </div>
        <div class="card pd-10">
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
              >{{ props.row.author.displayName }}</b-table-column>
              <b-table-column
                sortable
                field="description"
                label="Description"
              >{{ props.row.description }}</b-table-column>
              <b-table-column
                sortable
                field="date"
                label="Date"
              >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
              <b-table-column sortable field="active" label="Status">
                <b-tag :class="reportType(props.row.type)">{{props.row.type}}</b-tag>
              </b-table-column>
              <b-table-column label="Detail">
                <b-button>
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
      this.isLoading = true;
      const data = await reportService.getAllReport();
      this.reports = data.data.reports;
      console.log(data.data.reports);
      this.isLoading = false;
    },
    async deleteReports(id) {
      this.isLoading = true;
      const data = await reportService.deleteReportById(id);
      this.fetchReports();
      this.isLoading = false;
    },
    reportType(type) {
      if (type === "article") return "is-info";
      else return "is-warning";
    }
  },
  mounted() {
    this.fetchReports();
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