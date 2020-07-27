<template>
  <div>
    <transition name="fade">
      <login-component v-if="!this.$auth.loggedIn"></login-component>
      <PageComponent v-else/>
    </transition>
  </div>
</template>

<script>
  import LoginComponent from "../components/LogIn_SignUp/LoginComponent";
  import ModalComponent from "../components/Preview/ModalComponent";
  import PageComponent from "../components/LandingPage/PageComponent";

  export default {
    components: {
      LoginComponent,
      ModalComponent,
      PageComponent
    },
    layout: 'landingPageLayout',
  }
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  #posts {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
  }

  body {
    /*background: #f6f5f7;*/
    /* */
    /* height: 100vh;*/
    margin: 0;

  }

  h1 {
    font-weight: bold;
    margin: 0;
    color: black;
  }

  h2 {
    text-align: center;
    color: black;
  }


  a {
    margin: 15px 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .side {
    transition: ease 1.5s;
  }

  .side:hover {
    transition: ease 0.5s;
  }

</style>
