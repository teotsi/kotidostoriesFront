<template>
  <div class="d-flex" id="wrapper">
    <div id="sidebar-wrapper">
      <!--      <div class="sidebar-heading">Start Bootstrap</div>-->
      <b-list-group id="clickable">
        <list-item :active="option.id" :id="option.id" :key="option.id" :message="option.message"
                   v-for="option in this.options" v-on:toggle-list="toggleActive"></list-item>
      </b-list-group>
    </div>
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <right-hand-content v-if="active==='dashboard'">

        </right-hand-content>
        <right-hand-content v-if="active==='overview'">
          <div class="overview-content">
            <div class="overlay-content pic-container">
              <img @click="uploadPhoto" :src="'http://localhost:5000/'+this.$auth.user.img" alt="¿Donde esta tu foto?" class="profile-pic">
              <input type="file" id="my_file" style="display: none;" />

            </div>
          </div>
          <div id="dash-content">
            <p>Posts: {{this.$auth.user.posts.length}}</p>
            <p>Comments:{{this.$auth.user.comments.length}} </p>
            <p>Followers:{{this.$auth.user
              .followers.length}} </p>
          </div>


        </right-hand-content>
        <right-hand-content v-if="active==='privacy'">
          <h4>Change Username</h4>
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
          <hr/>
          <div class="rename">
            <h4>Personal details</h4>
            <b-form inline>
              <div class="d-flex flex-column account-input" id="label-div">
                <label for="inline-form-input-name">First Name</label>

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
          <b-button :disabled="!validInputs" @click="submitForm">Save settings</b-button>

        </right-hand-content>


        <right-hand-content v-if="active==='self_posts'">
          <div class="col-lg-8">
            <div class="row">
              <Post
                :comments="post.comments.length"
                :content="post.content"
                :date="post.date"
                :id="post.id"
                :img="'http://localhost:5000/'+post.img"
                :key="post.id"
                :preview="post.preview"
                :reactions="post.reactions.length"
                :title="post.title"
                :user="post.user.username"
                v-for="post in this.$auth.user.posts"/>

            </div>
          </div>
        </right-hand-content>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</template>
<script>
  import ListItem from "../../components/Account/ListItem";
  import CustomForm from "../../components/LogIn_SignUp/CustomForm";
  import RightHandContent from "../../components/Account/rightHandContent";
  import Post from "../../components/LandingPage/Post";

  export default {
    components: {
      RightHandContent,
      CustomForm,
      ListItem,
      Post
    },
    middleware: "redirectLogin",

    methods: {
      toggleActive(active) {
        this.active = active;
        console.log("active")
      },
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
            }
          ).catch(() => {
          this.currentFeedback = this.feedback.taken;
          this.valid_username = false;
        })
      },
      submitForm() {
        let form = this.form;
        for (let attr in form) {
          if (form[attr] === null || form[attr] === undefined) {
            delete form[attr];
          }
        }
        this.$axios.$put('user/' + this.$auth.user.username + "/", form, {withCredentials: true});
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
          password: null
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
  .pic-container{
    position: relative;
    transition: .5s ease;

  }
  .profile-pic {
    width: 200px;
    height: 200px;
    box-shadow: gray 0px 0px 10px;
    border-radius: 50%;
    object-fit: cover;

  }
  .profile-pic:hover{
    filter:brightness(50%);
    cursor: pointer;
  }

  #dash-content {
    position: absolute;
    margin-top: 40px;
    margin-left: 40px;
  }

  .d-flex {
    padding-top: 100px;
  }

  a {
    margin: 0;
  }


  #sidebar-wrapper {
    min-height: 100vh;
    margin-left: -15rem;
    margin-right: 15px;

    -webkit-transition: margin .25s ease-out;
    -moz-transition: margin .25s ease-out;
    -o-transition: margin .25s ease-out;
    transition: margin .25s ease-out;
  }

  #sidebar-wrapper .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }

  #clickable:hover {

    cursor: pointer;
  }

  #sidebar-wrapper {
    width: 15rem;
  }

  #page-content-wrapper {
    min-width: 100vw;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
    margin-right: 15px;

  }

  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
      margin-right: 15px;

    }

    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }

    #wrapper.toggled #sidebar-wrapper {
      margin-left: -15rem;
    }
  }

  .account-input {
    border-radius: 50px;
    padding-top: 6px;
  }

  #change-text {
    color: white;
    opacity: 1;
  }

  .overlay {
    width: 200px;
    height: 200px;
    position: absolute;
    transition: .5s ease;
    opacity: 0;
    top: 50%;
    left: 13.5%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  .overlay p{
    margin-top: 80px;
  }


  .overlay-content:hover .overlay {
    opacity: 1;
  }
  .overlay-content:hover .overlay p{
    opacity: 1;
  }

</style>
