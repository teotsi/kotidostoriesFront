<template>
  <div class="container">
    <custom-form :has-password="false"
                 v-on:submit-reset="resetEmail"
                 id="reset"
                 msg="Send reset email"></custom-form>
  </div>
</template>

<script>
  import CustomForm from "../../components/LogIn_SignUp/CustomForm";
  import axios from "axios";

  export default {
    name: "index.vue",
    components: {
      CustomForm
    },
    methods: {
      resetEmail: function (form) {
        console.log(form)
        axios.post('http://localhost:5000/reset', form)
          .then(function (response) {
            console.log(response)
          })
      }
    }
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
