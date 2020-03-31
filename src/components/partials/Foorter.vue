<template>
  <div class="p-absolute bt-10 r-10">
    <b-button v-show="!this.isOpen" v-on:click="clickButton()" class="bg-green b-radious-20 b-0 bt-10">
      <span>
        <b-icon
          icon="pencil"
          size="30">
        </b-icon>
      </span>
    </b-button>
    <div v-show="this.isOpen" class="box-height b-shadow pd-18">
      <div class="box-width">
        <div class="dp-flex f-end">
          <span v-on:click="clickButton()">
            <b-icon
              icon="close"
              size="30">
            </b-icon>
          </span>
        </div>
        <b-field label="Description">
          <b-input id="chats" maxlength="200" type="textarea" class="chat-area" />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isOpen:false
    }
  },
  methods:{
    clickButton(){
      this.isOpen= !this.isOpen
    }
  }
};
</script>
<style scoped>
.bg-green {
  background-color: rgb(191, 252, 191);
}
.b-radious-20 {
  border-radius: 20px;
}
.b-0 {
  border: 0px white solid;
}
.p-absolute {
  position: absolute;
}
.bt-10 {
  bottom: 10px;
}
.r-10 {
  right: 10px;
}
.box-height {
  height: 250px;
}
.b-shadow {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.box-width {
  width: 500px;
}
.pd-18 {
  padding: 18px;
}
.dp-flex {
  display: flex;
}
.f-end {
  justify-content: flex-end;
}
</style>