<template>
  <div class="content">
    <b-navbar class="custom-nav" fixed="top" >
      <navbar id="nav" v-if="this.$auth.loggedIn"/>
      <nuxt-link v-if="!this.$auth.loggedIn" to="/" style="text-decoration:none"><h1 style="color: white; font-size: 40px;">Unfold</h1></nuxt-link>
    </b-navbar>
    <nuxt/>
  </div>

</template>

<script>
  import navbar from "../components/NavigationBar/navbar";

  export default {
    components: {
      navbar
    }
  }
</script>

<style >
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  * {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  .custom-nav {
    padding: 0px;
  }

</style>
