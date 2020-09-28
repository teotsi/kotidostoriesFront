<template>
  <nav class="navbar">
    <nuxt-link
      :key="new Date().getDate()"
      no-prefetch
      style="text-decoration:none"
      to="/"
    >
      <h1
        style="color: white; font-size: 40px; padding-left: 5px"
      >
        Unfold
      </h1>
    </nuxt-link>
    <search-autocomplete :show="show" />

    <profile />
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
    background-color: var(--navbar-color);
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  }


</style>
