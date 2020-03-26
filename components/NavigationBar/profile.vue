<template>
  <div>
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content >
        <b-icon icon="person" id="icon"></b-icon>
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item href="#">Acount</b-dropdown-item>
      <b-dropdown-item href="#">New Post</b-dropdown-item>
      <b-dropdown-item href="#">Logout</b-dropdown-item>
    </b-dropdown>
  </div>
    <!--    <b-dropdown class="profile-drop-button" variant="primary">-->
<!--      <template v-slot:button-content>-->
<!--        <b-icon icon="person-fill" aria-hidden="true"></b-icon>-->
<!--      </template>-->
<!--      <b-dropdown-item>Profile</b-dropdown-item>-->
<!--      <b-dropdown-item>Account</b-dropdown-item>-->
<!--      <nuxt-link to="/TextEditor">-->
<!--        <b-dropdown-item>New Post</b-dropdown-item>-->
<!--      </nuxt-link>-->
<!--    </b-dropdown>-->

</template>

<script>
  import Vue from 'vue'
  import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)
  export default {

  }
</script>

<style scoped>

  #icon {
    color: black;
    background-size: 938px 318px;
    height: 50px;
    width: 50px;
  }

</style>
