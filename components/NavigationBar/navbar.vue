<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
<!--      <b-navbar-brand href="#">NavBar</b-navbar-brand>-->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" id="search-button">Search</b-button>
          </b-nav-form>

          <Profile/>
        </b-navbar-nav>
    </b-navbar>
  </div>
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

  #search-button{
    color: #950ca0;
  }
</style>
