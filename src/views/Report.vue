<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="card pd-45">
          Report
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import userservice from "../services/userservice"
export default {
  name: "Report",
  data() {
    return {
      users:[],
      user:null,
      isCardModalActive: false
    };
  },
  methods: {
    async fetchUsers () {
      const data = await userservice.getAllUser()
      this.users = data.data
    },
    async fetchUserById (id) {
      this.isCardModalActive = true
      const data = await userservice.getUserById(id)
      this.user = data.data
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
  mounted(){
    this.fetchUsers()
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
</style>