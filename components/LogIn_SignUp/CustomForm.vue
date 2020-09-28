<template>
  <div :class="[{'form-container':cls},cls]">
    <form
      @submit="$emit('submit-'+id, form)"
      @submit.prevent
    >
      <h1>{{ msg }}</h1>
      <b-form-input
        v-if="hasName"
        id="username"
        v-model="form.username"
        :state="valid_username"
        placeholder="Username"
        type="text"
        @update="checkUsername"
      />
      <b-form-invalid-feedback id="username-feedback">
        Username is taken!
      </b-form-invalid-feedback>
      <b-form-valid-feedback id="username-feedback">
        Username is available
      </b-form-valid-feedback>
      <b-input
        v-if="hasEmail"
        v-model="form.email"
        placeholder="Email"
        type="email"
      />
      <b-input
        v-if="hasPassword"
        v-model="form.password"
        :placeholder="newPass ? 'Enter new password':'Password'"
        type="password"
      />
      <b-input
        v-if="newPass"
        v-model="form.confirm_password"
        :state="matchingPass?null:false"
        placeholder="Confirm password"
        type="password"
      />
      <b-form-checkbox
        v-if="id==='log-in'"
        v-model="form.remember_me"
        value="true"
      >
        Remember me?
      </b-form-checkbox>
      <nuxt-link
        v-if="id==='log-in'"
        to="reset"
      >
        Forgot your password?
      </nuxt-link>
      <button-component
        :disabled="!matchingPass"
        :is-ghost="false"
        :msg="msg"
        @click="$emit('button-clickz')"
      />
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

    }
  }
</script>

<style scoped>
  .form-container form {
    background-color: var(--bg);
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

  h1{
    color: var(--soft-primary-text);
  }
</style>
