<template>
  <div :class="cls"
       class="form-container">
    <form @submit="$emit('submit-'+id, form)" v-on:submit.prevent>
      <h1>{{msg}}</h1>
      <b-input placeholder="Username" type="text" v-if="hasName" v-model="form.username"/>
      <b-input placeholder="Email" type="email" v-model="form.email"/>
      <b-input placeholder="Password" type="password" v-if="hasPassword" v-model="form.password"/>
      <b-form-radio v-if="id==='log-in'" v-model="form.remember_me" value="true">Remember me?</b-form-radio>
      <a href="#" v-if="id==='log-in'">Forgot your password?</a>
      <button-component :is-ghost="false" :msg="msg" @click="$emit('button-clickz')"/>
    </form>
  </div>
</template>

<script>
  import ButtonComponent from "@/components/LogIn_SignUp/ButtonComponent";

  export default {
    name: "CustomForm",
    components: {
      ButtonComponent
    },
    props: {
      id: String,
      cls: String,
      msg: String,
      hasPassword: {
        type: Boolean,
        default: true
      },
      hasName: {
        type: Boolean,
        default: false
      }
    },
    methods: {
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
