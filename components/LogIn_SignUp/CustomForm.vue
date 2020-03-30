<template>
  <div :class="[{'form-container':cls},cls]">
    <form @submit="$emit('submit-'+id, form)" v-on:submit.prevent>
      <h1>{{msg}}</h1>
      <b-form-input :state="valid_username" @update="checkUsername" id="username" placeholder="Username" type="text"
                    v-if="hasName"
                    v-model="form.username"/>
      <b-form-invalid-feedback id="username-feedback">
        Username is taken!
      </b-form-invalid-feedback>
      <b-form-valid-feedback id="username-feedback">
        Username is available
      </b-form-valid-feedback>
      <b-input placeholder="Email" type="email" v-if="hasEmail" v-model="form.email"/>
      <b-input :placeholder="newPass ? 'Enter new password':'Password'"
               type="password" v-if="hasPassword"
               v-model="form.password"/>
      <b-input :state="this.matchingPass?null:false" placeholder="Confirm password" type="password" v-if="newPass"
               v-model="form.confirm_password"/>
      <b-form-radio v-if="id==='log-in'" v-model="form.remember_me" value="true">Remember me?</b-form-radio>
      <nuxt-link to="reset" v-if="id==='log-in'">Forgot your password?</nuxt-link>
      <button-component :disabled="!this.matchingPass" :is-ghost="false" :msg="msg" @click="$emit('button-clickz')"/>
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
      },
      hasEmail: {
        type: Boolean,
        default: true
      },
      newPass: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      checkUsername() {
        this.$axios.$get('checkUsername/' + this.form.username)
          .then(() => {
              this.valid_username = true
            }
          ).catch(() => {
          this.valid_username = false
        })
      }

    },
    data() {
      return {
        form: {
          email: null,
          password: null,
          remember_me: false,
          username: null,
          confirm_password: null
        },
        valid_username: null,

      }
    },
    computed: {
      matchingPass() {
        if (!this.newPass) {
          return true
        }
        return this.form.password === this.form.confirm_password;
      }
    }
  }
</script>

<style scoped>
  .form-container form {
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
