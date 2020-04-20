<template>
  <div>
    <p class='marginY10px' v-for='(userValue, userKey) in user' :key='userKey'>
      {{userKey}} : {{userValue}}
    </p>
  </div>
</template>

<script>
import userService from '../../services/userservice'

export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    console.log(this.$route.params.userId)
    userService.getUserById(this.$route.params.userId)
      .then(res => {
        this.user = {...res};
      })
  }
}
</script>

<style scoped>
.marginY10px {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>