<template>
  <nav class="navbar">
    <!--      <b-navbar-brand href="#">NavBar</b-navbar-brand>-->
    <nuxt-link style="text-decoration:none" to="/" no-prefetch :key="new Date().getDate()"><h1
      style="color: white; font-size: 40px; padding-left: 5px">
      Unfold</h1></nuxt-link>
    <search-autocomplete :show="show" :suggestions="this.$auth.user.posts"/>

    <profile/>

  </nav>
</template>

<script>
  import profile from "./profile";
  import SearchAutocomplete from "../Autocomplete/SearchAutocomplete";

  export default {
    components: {
      SearchAutocomplete,
      profile
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

  #search-button {
    background-color: #3A3A3A;
  }

  .navbar {
    padding: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  }

  #nav {
    background-color: #950ca0;
  }


</style>
