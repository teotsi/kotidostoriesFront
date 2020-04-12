<template>
  <client-only>
    <div class="navbar">
      <b-navbar id="nav" toggleable="lg" type="dark">
        <!--      <b-navbar-brand href="#">NavBar</b-navbar-brand>-->
        <nuxt-link style="text-decoration:none" to="/"><h1 style="color: white; font-size: 40px; padding-left: 5px">
          Unfold</h1></nuxt-link>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-input class="mr-sm-2" id="search" placeholder="Search" size="sm"></b-input>
            <b-button class="my-2 my-sm-0" id="search-button" size="sm" type="submit">Search</b-button>
          </b-nav-form>
          <profile/>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </client-only>
</template>

<script>
  import profile from "./profile";

  export default {
    components: {
      profile
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
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.75);  }

  #nav {
    background-color: #950ca0;
  }

  #search {
    border-radius: 20px;
  }

</style>
