<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="pd-25 search-size mg-l-auto">
          <b-input rounded v-model="query" placeholder="Search name" icon="magnify"></b-input>
        </div>
        <div class="card pd-10">
          <b-table
            :data="filterUser"
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
                width="500"
                field="displayName"
                label="Name"
                sortable
              >{{ props.row.displayName }}</b-table-column>
              <b-table-column sortable field="role" label="Role">{{ props.row.role }}</b-table-column>
              <b-table-column
                sortable
                field="createdAt"
                label="Date"
              >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
              <b-table-column sortable field="active" label="Status">
                <b-tag
                  :class="activeTag(props.row.active)"
                >{{props.row.active ? 'activated' : 'banned'}}</b-tag>
              </b-table-column>
              <b-table-column label="Detail">
                <b-button @click="fetchUserById(props.row._id)">
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
import userservice from "@/services/userservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";
export default {
  name: "Dashboard",
  data() {
    return {
      users: [],
      query: "",
      user: null,
      isLoading: false
    };
  },
  methods: {
    activeTag(isActive) {
      if (isActive) return "is-success";
      else return "is-danger";
    },
    async fetchUsers() {
      this.isLoading = true;
      const data = await userservice.getAllUser();
      this.users = data.data.users;
      this.isLoading = false;
    },
    async fetchUserById(id) {
      this.$router.push({ name: "User", params: { userId: id } });
    },
    async banUser(uid) {
      this.isLoading = true;
      await userservice.banUser(uid);
      this.isCardModalActive = false;
      this.fetchUsers();
      this.isLoading = false;
    },
    async unBanUser(uid) {
      this.isLoading = true;
      await userservice.unBanUser(uid);
      this.isCardModalActive = false;
      this.fetchUsers();
      this.isLoading = false;
    },
    convertTimestamp(value) {
      return convertTimestamptoDate(value);
    }
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    filterUser() {
      if (this.query !== "")
        return this.users.filter(item => {
          return item.displayName.toLowerCase().match(this.query.toLowerCase());
        });
      else return this.users;
    }
  }
};
</script>