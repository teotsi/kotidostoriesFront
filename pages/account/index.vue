<template>
  <div class="d-flex" id="wrapper">
    <div id="sidebar-wrapper">
      <div class="sidebar-heading">Start Bootstrap</div>
      <b-list-group id="clickable">
        <list-item :active="option.id" :id="option.id" :key="option.id" :message="option.message"
                   v-for="option in this.options" v-on:toggle-list="toggleActive"></list-item>
      </b-list-group>
    </div>
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h1 class="mt-4">{{active}}</h1>
        <right-hand-content v-if="active==='dashboard'">

        </right-hand-content>
        <right-hand-content v-if="active==='overview'">
          <p>Posts: {{this.$auth.user.posts.length}}</p>
          <p>Comments:{{this.$auth.user.comments.length}} </p>
          <p>Followers:{{this.$auth.user
            .followers.length}} </p>
          <img :src="'http://localhost:5000/'+this.$auth.user.img">
        </right-hand-content>
        <right-hand-content v-if="active==='privacy'">
          <b-form-input placeholder="Enter your new username" v-model="new_username.default"></b-form-input>
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

  export default {
    components: {
      RightHandContent,
      CustomForm,
      ListItem
    },
    middleware: "redirectLogin",

    methods: {
      toggleActive(active) {
        this.active = active;
        console.log("active")
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
            id: 'posts',
            message: 'Posts'
          },
        ],
        new_username: {
          type: String,
          default: this.$auth.user.username
        }
      }
    }
  }
</script>

<style scoped>
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
