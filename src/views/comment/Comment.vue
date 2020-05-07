<template>
  <div>
    <div v-if="isLoading || !news">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else class="container mb-20 mt-20">
      <div class="card">
        <div class="card-image is-centered columns pt-20">
          <img class="news-image shadow" :src="news.imageURL" />
        </div>
        <div class="card-content">
          <div class="content">
            <section>
              <b-tabs v-model="activeTab">
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="newspaper"></b-icon>
                    <span>Comment</span>
                  </template>
                  <b-field label="ID">
                    <b-input disabled v-model="news._id" placeholder="ID"></b-input>
                  </b-field>
                  <b-field v-if="news.author" label="Author">
                    <b-input disabled v-model="news.author.displayName" placeholder="Author"></b-input>
                  </b-field>
                  <b-field label="Date">
                    <b-input disabled v-model="createdAt" placeholder="Date"></b-input>
                  </b-field>
                  <div class="buttons end pt-10">
                    <b-button type="is-danger" @click="deleteArticle()" icon-right="delete">Delete</b-button>
                  </div>
                </b-tab-item>

                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="information-outline"></b-icon>
                    <span>Basic information</span>
                  </template>
                  <b-field label="Type">
                    <b-select v-model="news.newsType" placeholder="Select an article-type" expanded>
                      <option
                        v-for="option in this.newsTypes"
                        :value="option"
                        :key="option"
                      >{{ option }}</option>
                    </b-select>
                  </b-field>
                  <b-field label="Tags">
                    <b-taginput
                      v-model="news.tags"
                      :data="filteredTags"
                      autocomplete
                      ref="taginput"
                      icon="label"
                      maxtags="2"
                      placeholder="Add a tag"
                      @typing="getFilteredTags"
                    >
                      <template slot-scope="props">
                        <strong>{{props.option}}</strong>
                      </template>
                      <template slot="empty">There are no items</template>
                      <template slot="selected" slot-scope="props">
                        <b-tag
                          v-for="(tag, index) in props.tags"
                          :key="index"
                          type="is-primary"
                          rounded
                          :tabstop="false"
                          ellipsis
                          closable
                          @close="$refs.taginput.removeTag(index, $event)"
                        >{{tag}}</b-tag>
                      </template>
                    </b-taginput>
                  </b-field>
                  <b-field
                    :type="validateTitle!== '' ?'is-danger' : null"
                    :message="validateTitle"
                    label="Title"
                  >
                    <b-input v-model="news.title" placeholder="Title" maxlength="100"></b-input>
                  </b-field>
                  <b-field
                    :type="validateDescription!== '' ?'is-danger' : null"
                    :message="validateDescription"
                    label="Description"
                  >
                    <b-input
                      type="textarea"
                      v-model="news.description"
                      maxlength="1000"
                      placeholder="Description"
                    ></b-input>
                  </b-field>
                  <div class="buttons end pt-10">
                    <b-button
                      @click="putNews()"
                      type="is-success"
                      icon-right="check"
                      :disabled="validateDescription !== '' || validateTitle!= ''"
                    >Save</b-button>
                  </div>
                </b-tab-item>
              </b-tabs>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsService from "@/services/newservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";

export default {
  data() {
    return {
      comment: null,
      activeTab: 0,
      isLoading: false
    };
  },
  async mounted() {
    this.commentId = this.$route.params.commentId;
    if (this.commentId !== undefined) {
      await this.fetchComment();
      this.isLoading = false;
    } else {
      this.$router.push({ path: "/news" });
    }
  },
  computed: {
    createdAt: {
      get() {
        return convertTimestamptoDate(this.news.createdAt);
      },
      set(newVal) {}
    },
    validateTitle() {
      if (typeof this.news.title !== "undefined" && this.news.title.length <= 0)
        return "Title must be more than 0 chars long";
      else return "";
    },
    validateDescription() {
      if (
        typeof this.news.description !== "undefined" &&
        this.news.description.length <= 0
      )
        return "Description must be more than 0 chars long";
      else return "";
    }
  },
  methods: {
    async deleteComment(id) {
      this.isLoading = true;
      await newsService.deleteComment(id);
      await this.fetchComment();
      this.isLoading = false;
    },
    async fetchComment() {
      this.commentId = this.$route.params.commentId;
      const comment = await newsService.getComment(commentId);
      this.comment = comments.data;
    },
    async putNews() {
      if (this.validateTitle === "" && this.validateDescription === "") {
        const { title, tags, description, newsType, _id } = this.news;
        this.isLoading = true;
        await newsService.putArticles(
          {
            title: title,
            newsType: newsType,
            tags: [...tags],
            description: description
          },
          _id
        );
        this.isLoading = false;
      }
    }
  }
};
</script>