<template>
  <div @mouseup="closePopUp" class="content">
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

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&display=swap');

  :root {
    --soft-shadow: 0 0 5px 0 #888;
    --title-font: 'Zilla Slab', serif;
    --soft-black: #333;
    --hover-soft-gray: #e9e9e9;
  }

  .ProseMirror-focused {
    outline: none !important;
  }

  .ProseMirror:focus {
    outline: none !important;
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

  a {
    color: #333;
    text-decoration: none;
  }

  .custom-nav {
    padding: 0;
  }

  blockquote {
    font-style: italic;
    color: #555555 !important;
    padding: 2em !important;
    padding-bottom: 0 !important;
    border-left: 3px solid #656565 !important;
    margin: 0;
    position: relative;
    background: #EDEDED !important;

    &::before {
      content: "\201C";
      color: #555555;
      font-size: 4em;
      position: absolute;
      left: 10px;
      top: -10px;
    }

  }

  .email-button-container {
    padding: 5px !important;
  }

  .date-info {
    text-align: right;
    font-size: 10px;
    color: #7f828b;
    position: relative;
    bottom: 0;

    a {
      font-size: inherit;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--soft-black);

      }
    }
  }

  .btn-contrast {
    background-color: #efefef;
    border-color: #000000;
    color: #000000;

    &:disabled {
      border: none;
    }

    &:not(:disabled):hover {
      background-color: #000000;
      color: white;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(83, 95, 109, 0.25)
    }
  }


  .btn-donate {
    background-color: #950ca0;
    border-color: #8357a0;
    color: white;

    &:disabled {
      border: none;
    }

    &:not(:disabled):hover {
      background-color: #9839a0;
      color: white;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(200, 51, 241, 0.47)
    }
  }

  .profile-dropdown a[role] {

    &:hover {
      background-color: #e7d0e7;
    }

    &:active {
      background-color: #950ca0;
    }

  }

  #donate-modal .modal-body {
    height: 110px;
  }


  .fade-out-enter-active, .fade-out-leave-active {
    transition: all .3s ease;
  }

  .fade-out-enter, .fade-out-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
