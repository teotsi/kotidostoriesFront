<template>
  <div id="login">
    <div id="back" />
    <div class="intro-content">
      <div
        id="container"
        class="container"
        :class="{'right-panel-active':rightPanelActive}"
      >
        <custom-form
          id="log-in"
          cls="sign-in-container"
          msg="Sign in"
          @submit-log-in="logIn"
        />
        <custom-form
          id="register"
          :has-name="true"
          :new-pass="true"
          cls="sign-up-container"
          msg="Sign up"
          @submit-register="register"
        />
        <overlay-component @toggle-class="rightPanelActive =!rightPanelActive" />
      </div>
    </div>
  </div>
</template>

<script>
import OverlayComponent from "../../components/LogIn_SignUp/OverlayComponent";
import CustomForm from "../../components/LogIn_SignUp/CustomForm";

export default {
    name: 'LoginComponent',
    components: {
      CustomForm,
      OverlayComponent,
    },
    data: function () {
      return {
        rightPanelActive: false
      };
    },
    methods: {
      logIn: function (form) {
        console.log(form);
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
       async register (form) {
        await this.$axios.post('register', form, {withCredentials: true})
        const response = await this.$auth.loginWith('local', {
           data: form
         })
       }
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
    background-color: var(--bg);
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
