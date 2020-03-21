<template>
  <div>
    <transition name="fade">
      <login-component v-if="!this.$auth.loggedIn"></login-component>
      <div v-else>
        <!-- replace this with actual stories/previews-->
        <div :key="post.id" v-for="post in this.$auth.user.posts">
          <h1>{{post.title}}</h1>
          <p>{{post.content}}</p>
          <p>{{post.date}}</p>
          <br>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import LoginComponent from "@/components/Login_SignUp/LoginComponent";
  import ModalComponent from "../components/Preview/ModalComponent"
  import axios from "axios";

  export default {
    components: {
      LoginComponent,
      ModalComponent
    },
    methods: {}
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  /*header {*/
  /*  background: linear-gradient(35deg, #CCFFFF, #FFCCCC);*/
  /*  padding: 20px 10px;*/

  /*}*/

  body {
    background: #f6f5f7;
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


  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
