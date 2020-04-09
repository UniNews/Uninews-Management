<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="mg-b-15 search-size mg-l-auto">
          <b-input
            rounded
            v-model="query"
            placeholder="Search"
            icon="magnify">
          </b-input>
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
            aria-current-label="Current page">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" numeric width='10' centered>
                  {{ props.row._id }}
              </b-table-column>
              <b-table-column field="displayName" label="Name" sortable >
                  {{ props.row.displayName }}
              </b-table-column>
              <b-table-column field="email" label="Email">
                  {{ props.row.email }}
              </b-table-column>
              <b-table-column field="active" label="Status">
                  {{ props.row.active }}
              </b-table-column>
              <b-table-column field="accessType" label="Role">
                  {{ props.row.role }}
              </b-table-column>
              <b-table-column>
                <b-button @click="fetchUserById(props.row._id)">
                  <span>
                    <b-icon
                      icon="account-search"
                      size="25">
                    </b-icon>
                  </span>
                </b-button>
              </b-table-column>
              <div v-bind:class="displayCard" scroll="keep">
                <div class="dp-flex flex-center">
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title tx-center">{{ user?user.displayName:"" }}</p>
                      <button class="delete" @click="isCardModalActive=false"></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="dp-flex flex-center">
                        <img :src="user?user.avatarURL:null" class="avatar-size">
                      </div>
                      <div class="mg-40">
                        <div class="columns border-bt-tp">
                          <div class="column tx-center">
                            คำอธิบาย
                          </div>
                          <div class="column tx-center">
                            {{ user?user.bio:"" }}
                          </div>
                        </div>
                      </div>
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button is-success">Save changes</button>
                      <b-button class="bg-red" @click="banUser(user._id)">
                        <span>
                          <b-icon
                            icon="account-remove"
                            size="30">
                          </b-icon>
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
  </section>
</template>

<script>
import { mapActions } from "vuex";
import userservice from "../services/userservice"
export default {
  name: "Dashboard",
  data() {
    return {
      users:[],
      query:'',
      user:null,
      isCardModalActive: false
    };
  },
  methods: {
    async fetchUsers () {
      const data = await userservice.getAllUser()
      this.users = data.data.users;
    },
    async fetchUserById (id) {
      this.isCardModalActive = true
      const data = await userservice.getUserById(id)
      this.user = data
    },
    async banUser (uid) {
      const data = { 
        active:false,
      }
      await userservice.putUser(data,uid)
      this.isCardModalActive = false
      this.fetchUsers()
    }
  },
  mounted() {
    this.fetchUsers()
  },
  computed:{
    filterUser() {
      return this.users.filter(item => {
        if(this.query !== ''){
          return item.displayName.toLowerCase().match(this.query.toLowerCase())
        }
        else{
          return item.displayName !== ''
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
.pd-45 {
  padding: 45px;
}
.avatar-size {
  max-width: 50%;
}
.margin-0-auto {
  margin:auto;
}
.dp-flex {
  display: flex;
}
.flex-center {
  justify-content: center;
}
.tx-center {
  text-align: center;
}
.border-bt-tp {
  border-bottom: 0.25px solid;
  border-top: 0.25px solid;
  border-color: #DCDCDC;
}
.mg-40 {
  margin:40px
}
.bg-red {
  background-color: #FFA07A;
}
.mg-b-15 {
  margin-bottom: 15px;
}
.mg-l-auto {
  margin-left: auto;
}
.search-size {
  width: 250px;
}
</style>