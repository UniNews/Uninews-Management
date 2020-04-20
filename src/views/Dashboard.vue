<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="mg-b-15 search-size mg-l-auto">
          <b-input rounded v-model="query" placeholder="Search name" icon="magnify"></b-input>
        </div>
        <div class="card pd-45">
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
              <div v-bind:class="displayCard" scroll="keep">
                <div class="dp-flex flex-center">
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p
                        class="modal-card-title tx-center newsTitle w-1"
                      >{{ user?user.displayName:"" }}</p>
                      <button class="delete" @click="isCardModalActive=false"></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="dp-flex flex-center">
                        <img :src="user?user.avatarURL:null" class="card-img-size" />
                      </div>
                      <!-- following, followers navs-->
                      <nav class="level pd-tp-10 is-mobile">
                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Tweets</p>
                            <p class="title">3,456</p>
                          </div>
                        </div>
                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Following</p>
                            <p class="title">123</p>
                          </div>
                        </div>
                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Followers</p>
                            <p class="title">456K</p>
                          </div>
                        </div>
                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Likes</p>
                            <p class="title">789</p>
                          </div>
                        </div>
                      </nav>
                      <div class="mg-10">
                        <div class="columns border-bt-tp">
                          <div class="column tx-center hd-w-bold">ชื่อ</div>
                          <div class="column tx-center">{{ user?user.firstName:"" }}</div>
                        </div>
                        <div class="columns border-bt">
                          <div class="column tx-center hd-w-bold">นามสกุล</div>
                          <div class="column tx-center">{{ user?user.lastName:"" }}</div>
                        </div>
                        <div class="columns border-bt">
                          <div class="column tx-center hd-w-bold">อีเมล</div>
                          <div class="column tx-center">{{ user?user.email:"" }}</div>
                        </div>
                        <div class="columns border-bt">
                          <div class="column tx-center hd-w-bold">ช่องทางติดต่อ</div>
                          <div class="column tx-center">{{ user?user.contacts:"" }}</div>
                        </div>
                        <div class="tx-center mg-22 hd-w-bold">คำอธิบาย</div>
                        <div class="columns border-bt-tp pd-tp-10 pd-bt-10">{{ user?user.bio:"" }}</div>
                        <div class="columns border-bt pd-tp-10 pd-bt-10">
                          <div class="column tx-center hd-w-bold">สร้างเมื่อ</div>
                          <div class="column tx-center dp-flex">
                            <b-icon icon="calendar" size="30" />
                            {{ user?convertTimestamp(user.createdAt):null }}
                          </div>
                        </div>
                        <div class="columns border-bt pd-tp-10 pd-bt-10">
                          <div class="column tx-center hd-w-bold">อัฟเดทล่าสุด</div>
                          <div class="column tx-center dp-flex">
                            <b-icon icon="clock" size="30" />
                            {{ user?convertTimestamp(user.updateAt):null }}
                          </div>
                        </div>
                      </div>
                    </section>
                    <footer class="modal-card-foot">
                      <b-button
                        v-if="user?user.active===true:null"
                        type="is-danger"
                        @click="banUser(user._id)"
                      >
                        <span class="dp-flex">
                          <b-icon icon="account-remove" size="30"></b-icon>
                          <div>Ban</div>
                        </span>
                      </b-button>
                      <b-button v-else type="is-success" @click="unBanUser(user._id)">
                        <span class="dp-flex">
                          <b-icon icon="account" size="30"></b-icon>
                          <div>Unban</div>
                        </span>
                      </b-button>
                    </footer>
                  </div>
                </div>
              </div>
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
      isCardModalActive: false,
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
      this.$router.push({name: 'User', params: {userId: id}})
      // this.isLoading = true;
      // const data = await userservice.getUserById(id);
      // this.user = data;
      // this.isLoading = false;
      // this.isCardModalActive = true;
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
      return this.users.filter(item => {
        if (this.query !== "") {
          return item.displayName.toLowerCase().match(this.query.toLowerCase());
        } else {
          return item.displayName !== "";
        }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mg-b-15 {
  margin-bottom: 15px;
}
.mg-22 {
  margin: 22px;
}
.pd-bt-10 {
  padding-bottom: 10px;
}
</style>