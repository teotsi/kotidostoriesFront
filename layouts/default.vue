<template>
  <div>
    <header>
      <a href="#"><h1>Unfold</h1></a>
        <b-button @click="$auth.logout()" v-if="this.$auth.loggedIn">Logout</b-button>
    </header>
    <nuxt/>
  </div>

</template>

<style>
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

  header {
    background: linear-gradient(35deg, #CCFFFF, #FFCCCC);
    padding: 20px 10px;

  }

  h1 {
    font-weight: bold;
    margin: 0;
    color: black;
  }

</style>
