<template>
  <div class="content" @mouseup="closePopUp">
    <navbar :show="show" id="nav" v-if="this.$auth.loggedIn"/>
    <nuxt/>
  </div>

</template>

<script>
  import navbar from "../components/NavigationBar/navbar";
  import SearchAutocomplete from "../components/Autocomplete/SearchAutocomplete";

  export default {
    components: {
      SearchAutocomplete,
      navbar
    },
    methods: {
      closePopUp(event) {
        this.show = event.target.id === 'autocomplete-input'
      }
    },
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&display=swap');

  :root {
    --soft-shadow: 0 0 5px 0 #888;
    --title-font: 'Zilla Slab', serif;
    --soft-black: #333;
    --hover-soft-gray: #e9e9e9;
  }
  .ProseMirror-focused{
    outline: none!important;
  }
  .ProseMirror:focus{
    outline: none!important;
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

  blockquote{
    font-style:italic;
    color: #555555!important;
    padding:2em!important;
    padding-bottom: 0!important;
    border-left:3px solid #656565!important;
    margin: 0;
    position: relative;
    background:#EDEDED!important;
  }
  blockquote::before{
    content: "\201C";
    color:#555555;
    font-size:4em;
    position: absolute;
    left: 10px;
    top:-10px;
  }

  .email-button-container {
    padding: 5px!important;
  }


</style>
