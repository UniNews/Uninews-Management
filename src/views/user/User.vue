<template>
  <div class="container mb-20 mt-20">
    <!-- has-background-black-bis -->
    <div class="card">
      <div class="card-image is-centered columns pt-20">
        <img class="avatar shadow" :src="user.avatarURL" />
      </div>
      <div class="card-content">
        <div class="content">
          <section>
            <b-tabs v-model="activeTab">
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-key"></b-icon>
                  <span>User</span>
                </template>
                <b-field label="ID">
                  <b-input disabled v-model="user._id" placeholder="ID"></b-input>
                </b-field>
                <b-field label="Role">
                  <b-input disabled v-model="user.role" placeholder="Role"></b-input>
                </b-field>
                <b-field label="Active">
                  <b-switch :value="user.active" type="is-success"></b-switch>
                </b-field>
                <b-field label="Created date">
                  <b-input disabled v-model="createdAt" placeholder="Created at"></b-input>
                </b-field>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="information-outline"></b-icon>
                  <span>Basic information</span>
                </template>
                <b-field label="Display name">
                  <b-input v-model="user.displayName" placeholder="Display name"></b-input>
                </b-field>
                <b-field label="Bio">
                  <b-input v-model="user.bio" placeholder="Bio"></b-input>
                </b-field>
                <div v-if="user.role==='store'">
                  <b-field label="Email">
                    <b-input v-model="user.email" placeholder="Email"></b-input>
                  </b-field>
                  <b-field label="First name">
                    <b-input v-model="user.firstName" placeholder="FirstName"></b-input>
                  </b-field>
                  <b-field label="Last name">
                    <b-input v-model="user.lastName" placeholder="Lastname"></b-input>
                  </b-field>
                  <b-field label="Mobile phone">
                    <b-input v-model="user.mobilePhone" placeholder="Mobile phone"></b-input>
                  </b-field>
                  <b-field label="Contacts">
                    <b-input v-model="user.contacts" placeholder="Contacts"></b-input>
                  </b-field>
                </div>
                <div class="buttons end pt-10">
                  <b-button type="is-success" icon-right="account-check">Save</b-button>
                </div>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Followings
                    <b-tag rounded>3</b-tag>
                  </span>
                </template>
                <!-- TODO: add followings table here -->
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <b-icon icon="account-multiple"></b-icon>
                  <span>
                    Followers
                    <b-tag rounded>3</b-tag>
                  </span>
                </template>
                <!-- TODO: add followers table here -->
              </b-tab-item>
            </b-tabs>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "../../services/userservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {},
  computed: {
    createdAt: {
      get() {
        return convertTimestamptoDate(this.user.createdAt);
      },
      set(newVal) {}
    }
  },
  mounted() {
    userService.getUserById(this.$route.params.userId).then(res => {
      this.user = { ...res };
    });
  }
};
</script>
