<template>
  <div class="container mb-20 mt-20">
    <div class="card">
      <div class="card-image is-centered columns pt-20">
        <img class="avatar shadow" :src="news.imageURL" />
      </div>
      <div class="card-content">
        <div class="content">
          <section>
            <b-tabs v-model="activeTab">
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-key"></b-icon>
                  <span>News</span>
                </template>
                <!-- TODO: ประกอบไปด้วย _id, author, createdAt -->
                <b-field label="ID">
                  <b-input disabled v-model="news._id" placeholder="ID"></b-input>
                </b-field>
                <b-field v-if="news.author" label="Author">
                  <b-input disabled v-model="news.author.displayName" placeholder="Author"></b-input>
                </b-field>
                <b-field label="Date">
                  <b-input disabled v-model="createdAt" placeholder="Date"></b-input>
                </b-field>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="information-outline"></b-icon>
                  <span>Basic information</span>
                </template>
                <b-field label="Type">
                  <b-input v-model="news.newsType" placeholder="ID"></b-input>
                </b-field>
                <b-field label="Tags">
                  <b-taginput
                    v-model="news.tags"
                    :data="filteredTags"
                    autocomplete
                    ref="taginput"
                    icon="label"
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
                <b-field label="Title">
                  <b-input v-model="news.title" placeholder="Title"></b-input>
                </b-field>
                <b-field label="Description">
                  <b-input type="textarea" v-model="news.description" placeholder="Description"></b-input>
                </b-field>
                <div class="buttons end pt-10">
                  <b-button type="is-success" @click="putNews(news)" icon-right="check">Save</b-button>
                </div>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Views
                    <b-tag rounded>{{views.length}}</b-tag>
                  </span>
                </template>
                <div class="card mt-20 pl-10 pr-10">
                  <b-table
                    :data="views"
                    :loading="isLoading"
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
                        <b-button @click="detailClicked(props.row._id)">
                          <span>
                            <b-icon icon="account-search" size="25"></b-icon>
                          </span>
                        </b-button>
                      </b-table-column>
                    </template>
                    <template slot="empty">
                      <section class="section">
                        <div class="content has-text-grey has-text-centered">
                          <p>
                            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                          </p>
                          <p>Nothing here.</p>
                        </div>
                      </section>
                    </template>
                  </b-table>
                </div>
              </b-tab-item>
              <!-- TODO: ประกอบไปด้วย users table -->
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Likes
                    <b-tag rounded>{{likes.length}}</b-tag>
                  </span>
                </template>
                <div class="card mt-20 pl-10 pr-10">
                  <b-table
                    :data="likes"
                    :loading="isLoading"
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
                        <b-button @click="detailClicked(props.row._id)">
                          <span>
                            <b-icon icon="account-search" size="25"></b-icon>
                          </span>
                        </b-button>
                      </b-table-column>
                    </template>
                    <template slot="empty">
                      <section class="section">
                        <div class="content has-text-grey has-text-centered">
                          <p>
                            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                          </p>
                          <p>Nothing here.</p>
                        </div>
                      </section>
                    </template>
                  </b-table>
                </div>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Comments
                    <b-tag rounded>{{comments.length}}</b-tag>
                  </span>
                </template>
                <div class="card mt-20 pl-10 pr-10">
                  <b-table
                    :data="comments"
                    :loading="isLoading"
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
                      >{{ props.row.author.displayName }}</b-table-column>
                      <b-table-column
                        sortable
                        field="description"
                        label="Description"
                      >{{ props.row.description }}</b-table-column>
                      <b-table-column
                        sortable
                        field="createdAt"
                        label="Date"
                      >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
                      <b-table-column label="Detail">
                        <b-button @click="detailClicked(props.row.author._id)">
                          <span>
                            <b-icon icon="account-search" size="25"></b-icon>
                          </span>
                        </b-button>
                      </b-table-column>
                      <b-table-column>
                        <b-button
                          type="is-danger"
                          @click="deleteComment(props.row._id)"
                          icon-left="delete"
                        >Delete</b-button>
                      </b-table-column>
                    </template>
                    <template slot="empty">
                      <section class="section">
                        <div class="content has-text-grey has-text-centered">
                          <p>
                            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                          </p>
                          <p>Nothing here.</p>
                        </div>
                      </section>
                    </template>
                  </b-table>
                </div>
              </b-tab-item>
              <!-- TODO: ประกอบไปด้วย users table -->
            </b-tabs>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsService from "../../services/newservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";

const data = [
  "ทั่วไป",
  "ความรัก",
  "การเรียน",
  "กีฬา",
  "เตือนภัย",
  "รีวิว",
  "อาหาร"
];

export default {
  data() {
    return {
      news: {},
      activeTab: 0,

      filteredTags: data,
      isLoading: false,
      views: [],
      likes: [],
      comments: []
    };
  },
  mounted() {
    this.newsId = this.$route.params.newsId;
    if (this.newsId !== undefined) {
      this.fetchNews();
    } else {
      this.$router.push("/news");
    }
  },
  computed: {
    createdAt: {
      get() {
        return convertTimestamptoDate(this.news.createdAt);
      },
      set(newVal) {}
    }
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    activeTag(isActive) {
      if (isActive) return "is-success";
      else return "is-danger";
    },
    detailClicked(id) {
      this.$router.push({ name: "User", params: { userId: id } });
    },
    async deleteComment(id) {
      this.isLoading = true;
      await newsService.deleteComment(id);
      this.fetchNews();
      this.isLoading = false;
    },
    async fetchNews() {
      const result = await newsService.getNewsById(this.newsId);
      this.news = { ...result.data };
      const result1 = await newsService.getViewsById(this.newsId);
      this.views = [...result1.data];
      const result2 = await newsService.getLikesById(this.newsId);
      this.likes = [...result2.data];
      const result3 = await newsService.getCommentsById(this.newsId);
      this.comments = [...result3.data];
    },
    async putNews(news) {
      const { title, tags, description, newsType, _id } = news;
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
      this.$router.push("/news");
      this.isLoading = false;
    }
  }
};
</script>

<style>
.mg-10 {
  margin-right: 10px;
}
ul.pagination-list {
  margin: 0px;
}
</style>