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
          <div id="dash-container">
            <img :src="'http://localhost:5000/'+this.$auth.user.img" alt="¿Donde esta tu foto?" id="profile-pic">

            <div id="dash-content">
              <p>Posts: {{this.$auth.user.posts.length}}</p>
              <p>Comments:{{this.$auth.user.comments.length}} </p>
              <p>Followers:{{this.$auth.user
                .followers.length}} </p>
            </div>

          </div>


        </right-hand-content>
        <right-hand-content v-if="active==='privacy'">

          <b-form-group
            :invalid-feedback="this.$feedback(valid_username)"
            :state="valid_username"
            :valid-feedback="this.$feedback(valid_username)"
            description="Every time you change your username, a database admin quits"
            id="fieldset-1"
            label="Enter a new username"
            label-for="input-1"
          >
            <b-input :state="valid_username" @change="checkUsername" id="new-username"
                     placeholder="Enter your new username" v-model="new_username"
            />
          </b-form-group>
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
        this.$axios.$get('checkUsername/' + this.new_username)
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
        new_username: "this.$auth.user.username"
      }
    },
    // computed: {
    //   feedback() {
    //     if (this.valid_username === true) {
    //       return 'Username is available'
    //     } else if (this.valid_username === false) {
    //       return 'Username is taken'
    //     } else {
    //       return ''
    //     }
    //   }
    // }
  }
</script>

<style scoped>
  #profile-pic {
    width: 200px;
    height: 200px;
    border: solid white;
    box-shadow: gray 0px 0px 10px;
    border-radius: 50%;
    object-fit: cover;
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

  form {
    background-color: #7F828B;
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


</style>
