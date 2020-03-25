<template>
  <div class="content">
    <b-navbar class="custom-nav" fixed="top" >
      <nuxt-link to="/" style="text-decoration:none"><h1 style="color: white; font-size: 40px;">Unfold</h1></nuxt-link>
      <b-button @click="$auth.logout()" v-if="this.$auth.loggedIn">Logout</b-button>
      <profile class="prof-icon" v-if="this.$auth.loggedIn"></profile>
    </b-navbar>
    <nuxt/>
  </div>

</template>

<script>
  import profile from "../components/LandingPage/profile";

  export default {
    components: {
      profile,
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
    height: 50px;
  }

  .prof-icon {
    align: right;
  }


</style>
