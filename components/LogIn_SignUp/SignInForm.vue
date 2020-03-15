<template>
  <div class="form-container"
       :class="cls">
    <form @submit="onSubmit($event)">
      <h1>Sign in</h1>
      <input type="email" v-model="form.email" placeholder="Email"/>
      <input type="password" v-model="form.password" placeholder="Password"/>
      <b-form-radio v-model="form.remember_me" value="true">Remember me?</b-form-radio>
      <a href="#">Forgot your password?</a>
      <ButtonComponent :msg="msg" :is-ghost="false"/>
    </form>
  </div>
</template>

<script>
  import ButtonComponent from "./ButtonComponent";
  import axios from "axios";

  export default {
    name: "SignInForm",
    components: {
      ButtonComponent
    },
    props: {
      cls: String,
      msg: String
    },
    methods: {
      onSubmit: function (event) {
        if (event) {
          event.preventDefault();
        }
        axios.post('http://localhost:5000/login', this.form)
          .then(function (response) {
            console.log(response)
          })
      },
      onTest: function () {
        axios.post('http://localhost:5000/user/ttt/posts', this.form)
          .then(function (response) {
            console.log(response)
          })
      }
    },
    data() {
      return {
        form: {
          email: null,
          password: null,
          remember_me: false
        }
      }
    }
  }
</script>

<style scoped>
  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 20px;
  }

  textarea:focus, input:focus {
    outline: none;
  }

</style>
