<template>
  <div style="margin: 40px;">
    <!--        Privacy Page-->
    <div style="text-align: center; margin-top: 10px;">
      <h2>Privacy Settings</h2>
    </div>
    <div style="margin-top: 10px;">
      <h4>Change Username</h4>
    </div>
    <div style="width: 20%;">
      <b-form-group
        :invalid-feedback="this.currentFeedback"
        :state="valid_username"
        :valid-feedback="this.feedback.valid"
        description="Every time you change your username, a database admin quits"
        id="fieldset-1"
        label="Enter a new username"
        label-for="input-1"
      >
        <b-input :state="valid_username" @update="checkUsername" class="account-input" id="new-username"
                 placeholder="Enter your new username" v-model="new_username"
        />

      </b-form-group>
    </div>
    <hr/>
    <div>
      <image-upload :image-url="imageUrl"
                    caption="Choose a profile image"
                    v-on:image-upload="storeImage"></image-upload>
    </div>
    <hr/>
    <div style="width: 30%;">
      <h4>About you (description)</h4>
      <b-form inline>
        <div class="d-flex flex-column account-input">
          <b-input
            class="mb-2 mr-sm-2 mb-sm-0 account-input "
            id="inline-form-input-description"
            placeholder="Some words about you"
            v-model="form.description"
          ></b-input>
        </div>
      </b-form>
    </div>
    <hr/>
    <div class="rename">
      <h4>Personal details</h4>
      <b-form inline>
        <div class="d-flex flex-column account-input" id="label-div">
          <label for="inline-form-input-lastname">First Name</label>
          <b-input
            class="mb-2 mr-sm-2 mb-sm-0 account-input "
            id="inline-form-input-name"
            placeholder="Enter your name"
            v-model="form.first_name"
          ></b-input>
        </div>
        <div class="d-flex flex-column account-input">
          <label for="inline-form-input-lastname">Last Name</label>
          <b-input
            class="mb-2 mr-sm-2 mb-sm-0 account-input"
            id="inline-form-input-lastname"
            placeholder="Enter your last name"
            v-model="form.last_name"
          ></b-input>
        </div>

      </b-form>
      <hr/>
      <div style="width: 20%;">
        <h4>Change Password</h4>
        <label for="new-password">New password</label>
        <b-input
          class="account-input"
          id="new-password"
          placeholder="Enter your new password"
          type="password"
          v-model="form.password"
        ></b-input>

        <label for="confirm-password">Confirm new password</label>
        <b-input
          :state="this.matchingPass?null:false"
          @update=""
          class="account-input"
          id="confirm-password"
          placeholder="Confirm password"
          type="password"
          v-model="confirm_password"
        ></b-input>
      </div>
    </div>
    <div style="margin-top: 15px;">
      <b-button :disabled="!validInputs" @click="submitForm" style="background-color: #950ca0">Save settings</b-button>
    </div>
  </div>
</template>
<script>
  import CustomForm from "../../components/LogIn_SignUp/CustomForm";
  import ImageUpload from "../../components/UploadImage/ImageUpload";

  export default {
    components: {
      ImageUpload,
      CustomForm,
    },
    middleware: "redirectLogin",

    methods: {
      checkUsername() {
        if (this.new_username === this.$auth.user.username) {
          this.valid_username = null;
          return;
        } else if (this.new_username.length < 2 || this.new_username.includes(' ')) {
          this.currentFeedback = this.feedback.invalid;
          this.valid_username = false;
          return;
        }
        this.$axios.$get('checkUsername/' + this.new_username)
          .then(() => {
              this.valid_username = true;
              this.form.username = this.new_username;
            }
          ).catch(() => {
          this.currentFeedback = this.feedback.taken;
          this.valid_username = false;
        })
      },
      async submitForm() {
        let formData = new FormData;
        let form = this.form;
        for (let attr in form) {
          if (form[attr] === null || form[attr] === undefined) {
            delete form[attr];
          }
        }
        formData.append('data', JSON.stringify(form));
        if (this.form.image) {
          formData.append('image', this.form.image);
        }

        await this.$axios.$put('user/' + this.$auth.user.username + "/", formData, {withCredentials: true});
        await this.$router.push(`/user/${this.$auth.user.username}`)
      },
      storeImage(image) {
        this.form.image = image;
      }
    },
    data() {
      return {
        active: 'dashboard',
        options: [
          {
            id: 'dashboard',
            message: 'Dashboard'
          },
          {
            id: 'overview',
            message: 'Overview'
          },
          {
            id: 'privacy',
            message: 'Privacy'
          },
          {
            id: 'self_posts',
            message: 'Posts'
          },
        ],
        valid_username: null,
        imageUrl: null,
        new_username: this.$auth.user.username,
        feedback: {
          invalid: "Username must be at least 2 characters long, whitespace is not allowed",
          valid: "Username is available!",
          taken: "Username is taken!",
        },
        form: {
          username: null,
          first_name: null,
          last_name: null,
          password: null,
          image: null,
          description: null
        },
        currentFeedback: null,
        new_password: null,
        confirm_password: null
      }
    },
    computed: {
      matchingPass() {
        return this.form.password === this.confirm_password;
      },
      validInputs() {
        console.log("input");
        if (this.valid_username === null) {
          return this.matchingPass;
        } else if (this.valid_username) {
          return this.matchingPass;
        }
      }
    }
  }
</script>

<style scoped>

  .image-wrapper {
    justify-content: stretch;
    width: 70%;
  }

  .d-flex {
    padding-top: 100px;
  }

  a {
    margin: 0;
  }

  .account-input {
    border-radius: 50px;
    padding-top: 6px;
  }

  .overlay p {
    margin-top: 80px;
  }

  .overlay-content:hover .overlay p {
    opacity: 1;
  }

</style>
