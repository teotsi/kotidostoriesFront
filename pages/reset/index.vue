<template>
  <div>
    <div class="container" v-if="!token">
      <custom-form :has-password="false"
                   id="reset"
                   msg="Send reset email"
                   v-on:submit-reset="resetEmail"></custom-form>
    </div>
    <div class="container" v-else-if="validToken">
      <custom-form :has-email="false"
                   :new-pass="true"
                   id="new-pass"
                   msg="Reset your password"
                   v-on:submit-new-pass="setPass"></custom-form>
    </div>
    <div class="container" v-else>
      <p>invalid token or link or whatever</p>
    </div>
    <b-alert :show="dismissCountDown"
             @dismiss-count-down="countDownChanged"
             @dismissed="dismissCountDown=0"
             dismissible
             v-if="!token"
             variant="warning"
    >
      Check your inbox and click the password reset link. It is only valid for {{minutesLeft}} more minutes.
      <b-progress
        :max="resetDismissSecs"
        :value="dismissCountDown"
        height="4px"
        variant="warning"
      ></b-progress>
    </b-alert>
    <b-alert :show="dismissCountDown"
             @dismiss-count-down="countDownChanged"
             @dismissed="dismissCountDown=0"
             dismissible
             v-else
             variant="success"
    >
      Redirecting you to home page in {{dismissCountDown}}...
      <b-progress
        :max="redirectDismissSecs"
        :value="dismissCountDown"
        height="4px"
        variant="warning"
      ></b-progress>
    </b-alert>
  </div>
</template>

<script>
  import CustomForm from "../../components/LogIn_SignUp/CustomForm";
  import axios from "@nuxtjs/axios";
  import Axios from "axios";

  export default {
    name: "index.vue",
    components: {
      CustomForm
    },
    // middleware: 'resetEmail' ,
    methods: {
      setPass: function (form) {
        console.log('setPass');
        Axios.post('http://localhost:5000/resetPass/', {'form': form, 'token': this.token})
          .then(() => {
            this.redirectAlert()
          })
      },
      resetEmail: function (form) {
        console.log(form);
        Axios.post('http://localhost:5000/reset', form)
          .then(() => {
            this.emailAlert()
          })
      },
     async countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
        this.minutesLeft = parseInt(dismissCountDown / 60);
        if (this.token) {
          if (this.dismissCountDown === 0) {
          await  this.$router.push('/')
          }
        }
      },
      emailAlert() {
        this.dismissCountDown = this.resetDismissSecs
      },
      redirectAlert() {
        this.dismissCountDown = this.redirectDismissSecs
      }
    },
    data: function () {
      return {
        showPrompt: false,
        resetDismissSecs: 1799,
        dismissCountDown: 0,
        minutesLeft: 0,
        token: this.$route.query.token,
        redirectDismissSecs: 5,
      }
    },
    async asyncData({query, $axios}) {
      const response = await $axios.$post('http://localhost:5000/verifyToken/',
        {'token': query.token}, {errorHandle: false});
      return {validToken: response.status}
    },
  }
</script>
<style scoped>


  @media only screen and (max-width: 600px) {
    .container {
      width: 50%;
      height: 50%;
    }

    .container {
      position: absolute;
      top: 20%;
      left: 0%;
      right: 0%;
    }
  }

  header {
    background: linear-gradient(35deg, #CCFFFF, #FFCCCC);
    padding: 20px 10px;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    top: 20%;
    right: 30%;
    overflow: hidden;
    width: 400px;
    max-width: 100%;
    min-height: 480px;
  }

  body {
    background: #f6f5f7;
    /* */
    /* height: 100vh;*/
    margin: 0px;
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

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    color: black;
    padding: 25px;
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

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
</style>
