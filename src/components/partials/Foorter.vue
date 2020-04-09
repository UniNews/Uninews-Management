<template>
  <div class="bt-3 r-3 p-fixed">
    <b-button v-show="!this.isOpen" v-on:click="clickButton()" class="bg-green b-radious-20 b-0 bt-10">
      <span>
        <b-icon
          icon="pencil"
          size="30">
        </b-icon>
      </span>
    </b-button>
    <div v-show="this.isOpen" v-bind:class="boxSize">
      <div class="box-width">
        <div class="dp-flex flex-end">
          <span v-on:click="clickButton()">
            <b-icon
              icon="close"
              size="30">
            </b-icon>
          </span>
        </div>
        <b-field label="ArticleType">
          <b-select v-model="selectedValue" placeholder="Select an article-type" expanded>
            <option value="news">News</option>
            <option value="community">Community</option>
          </b-select>
        </b-field>
        <b-field label="Tags" grouped group-multiline>
          <div class="control mg-r-10 mg-l-20">
            <b-tag type="is-primary"
              attached>
              กีฬา
            </b-tag>
          </div>
          <div class="control mg-r-10">
            <b-tag type="is-primary"
              attached>
              เกมส์
            </b-tag>
          </div>
          <div class="control mg-r-10">
            <b-tag type="is-primary"
              attached>
              เรียน
            </b-tag>
          </div>
          <div class="control">
            <b-tag type="is-primary"
              attached>
                เงี่ยน
            </b-tag>
          </div>
        </b-field>
        <b-field v-show="selectedValue==='news'" label="Title">
          <b-input maxlength="200"/>
        </b-field>
        <b-field v-show="selectedValue==='news'" label="NewsType">
          <b-select v-model="newsTypeValue" placeholder="Select an article-type" expanded>
            <option
              v-for="option in data"
              :value="option"
              :key="option">
              {{ option }}
            </option>
          </b-select>
        </b-field>
        <b-field v-show="selectedValue==='news'"   class="file">
          <b-upload v-model="file">
              <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Upload Image</span>
              </a>
          </b-upload>
          <span class="file-name" v-if="file">
              {{ file.name }}
          </span>
        </b-field>
        <b-field label="Description">
          <b-input maxlength="200" type="textarea" class="chat-area" />
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
      isOpen:false,
      selectedValue:"community",
      newsTypeValue:null,
      data:['club', 'promotion', 'lost-found', 'university'],
      file:null
    }
  },
  methods:{
    clickButton(){
      this.isOpen= !this.isOpen
    }
  },
  computed:{
    boxSize(){
      return this.selectedValue==="community"? "box-height b-shadow pd-18 bg-white":"box-height-2 b-shadow pd-18 bg-white"
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
.bt-3 {
  bottom: 3px;
}
.r-3 {
  right: 3px;
}
.box-height {
  height: 335px;
}
.bg-white {
  background: white;
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
.flex-end {
  justify-content: flex-end;
}
.p-fixed {
  position: fixed;
}
.mg-r-10 {
  margin-right: 10px;
}
.mg-l-20 {
  margin-left: 20px;
}
.box-height-2 {
  height: 565px;
}
</style>