<template>
  <div id="login">
    <div id="back">
    </div>
    <div class="intro-content">
      <div class="container"
           id="container"
           v-bind:class="{'right-panel-active':rightPanelActive}">
        <custom-form cls="sign-in-container" id="log-in" msg="Sign in" v-on:submit-log-in="logIn"/>
        <custom-form :has-name="true" :new-pass="true" cls="sign-up-container" id="register" msg="Sign up"
                     v-on:submit-register="register"/>
        <overlay-component v-on:toggle-class="rightPanelActive =!rightPanelActive"/>
      </div>
    </div>

  </div>
</template>

<script>
  import OverlayComponent from "@/components/LogIn_SignUp/OverlayComponent";
  import CustomForm from "@/components/LogIn_SignUp/CustomForm";
  import axios from "axios";

  export default {
    name: 'LoginComponent',
    components: {
      CustomForm,
      OverlayComponent,
    },
    methods: {
      logIn: function (form) {
        this.$auth.loginWith('local', {
          data: form
        }).then(function (response) {
            console.log(response)
          }
        ).catch(function (error) {
          console.log("error!");
          console.log(error)
        })
      },
      register: function (form) {

        axios.post('http://localhost:5000/register', form, {withCredentials: true})
          .then(() => {
            this.$auth.loginWith('local', {
              data: form
            }).then(function (response) {
              console.log(response)
            })
          })
          .catch(function (error) {
            console.log(error)
          })

      }
    },
    data: function () {
      return {
        rightPanelActive: false
      };
    }

  }
</script>

<style scoped>

  #login {
    overflow: hidden;
  }

  #back {
    height: 100vh;
    background-image: url("../../assets/login-bg.jpg");
    filter: blur(2px) brightness(60%);
    transform: scale(1.01);
  }

  @media only screen and (max-width: 600px) {
    .container {
      width: 50%;
      height: 50%;
    }

    .container {
      left: 0%;
      right: 0%;
    }
  }


  /*header {*/
  /*  background: linear-gradient(35deg, #CCFFFF, #FFCCCC);*/
  /*  padding: 20px 10px;*/
  /*}*/

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    top: 20%;
    right: 7.5%;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 2;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 3;
  }


  .container p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    color: black;
    padding: 25px;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 6;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 2;
    }

    50%, 100% {
      opacity: 1;
      z-index: 6;
    }
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  span {
    font-size: 12px;
  }
</style>
