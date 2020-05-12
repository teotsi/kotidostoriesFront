<template>
  <div class="content">
    <b-navbar class="custom-nav">
      <navbar id="nav" v-if="this.$auth.loggedIn"/>
      <nuxt-link style="text-decoration:none" to="/" v-if="!this.$auth.loggedIn"><h1
        style="color: white; font-size: 40px;">Unfold</h1></nuxt-link>
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@700&display=swap');
  :root {
    --soft-shadow: 0 0 5px 0 #888;
    --title-font: 'Zilla Slab', serif;
    --soft-black: #333;
  }

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
    padding: 0;
  }



</style>
