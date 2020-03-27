<template>
  <div class="dropprof">
    <b-dropdown size="lg" right variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content >
        <b-icon icon="person" id="icon"></b-icon>
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item href="#">Acount</b-dropdown-item>
      <b-dropdown-item href="/TextEditor">New Post</b-dropdown-item>
      <b-dropdown-item @click="$auth.logout()">Logout <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
      </b-dropdown-item>
    </b-dropdown>
  </div>
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

  .dropprof {
    padding-right: 5px;
  }

</style>
