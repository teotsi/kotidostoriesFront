<template>
  <div class="dropprof">
    <b-dropdown no-caret right size="lg" class="profile-dropdown" toggle-class="text-decoration-none" variant="link">
      <template v-slot:button-content>
        <div id="icon-container">
          <b-icon icon="person" id="icon"></b-icon>
        </div>

      </template>
      <div v-if="this.$auth.loggedIn">
        <a></a>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="/account">Account</b-dropdown-item>
        <b-dropdown-item href="/TextEditor">New Post</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout
          <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
        </b-dropdown-item>
      </div>
      <div v-else>
        <b-dropdown-item href="/">Log in / Sign up!</b-dropdown-item>

      </div>
    </b-dropdown>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {BootstrapVueIcons} from 'bootstrap-vue'

  Vue.use(BootstrapVueIcons);
  export default {
    methods: {
      logout() {
        this.$auth.logout();
        this.$router.push('/')

      }
    }
  }
</script>

<style scoped>

  #icon {
    color: #ffffff;
    background-size: 938px 318px;
    height: 50px;
    width: 50px;
  }

  #icon-container {
    width: 100%;
    height: 100%;
  }

  .dropprof {
    padding-right: 5px;
  }



</style>
