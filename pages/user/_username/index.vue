<template>
  <div class="grid-container">
    <div id="side_bar">
      <div id="profile_pic">
        <b-img :src="image+'#'+new Date().getTime()" class="profile-img" fluid-grow/>
      </div>
      <div id="stats">
        <div id="username">
          {{user_name}}
        </div>
        <div id="followers">
          <p>Followers: {{followers}}</p>
        </div>
      </div>
      <div id="about">
        <div style="font-weight: bold; text-align: center;">
          About me
        </div>
        <div style="width: 170px; text-align: center; font-size: 13px; margin: auto">
          {{description}}
        </div>
      </div>
      <div id="socials">
        <div style="font-weight: bold; text-align: center; margin-top: 5px;">
          Social Media
        </div>
        <div class="social-icons">
          <share-button :key="index"
                        :name="site"
                        id="hey" v-for="(site, index) in media">
          </share-button>
        </div>
      </div>
    </div>

    <div id="main_profile_section">
      <!--      The 3 featured stories     -->
      <div id="featured_stories">
        <h3 class="section-title">Featured Stories</h3>
        <transition-group class="post-container" name="list-complete" tag="div">
          <Post :comments="post.comments.length"
                :content="post.content"
                :date="post.date"
                :id="post.id"
                :img="'http://localhost:5000/'+post.img"
                :key="post.id"
                :preview="post.preview"
                :reactions="post.reactions.length"
                :slug="post.slug"
                :title="post.title"
                :user="post.user.username"
                class="post"
                v-for="post in this.posts.slice(0,3)"/>
        </transition-group>
      </div>
      <!--            The list with all the user's posts   -->
      <div id="post-list">
        <h3 class="section-title">User's Posts</h3>
        <div class="post-grid-container">
          <profile-post
            :key="post.id"
            :title="post.title"
            :preview="post.preview"
            :img="post.img"
            :id="post.id"
            v-for="post in this.user.posts"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import profilePost from '../../../components/Profile_Page/profilePost';
  import Post from "../../../components/LandingPage/Post";
  import ShareButton from "../../../components/Share/ShareButton";

  export default {
    components: {
      ShareButton,
      Post,
      profilePost
    },
    data() {
      return {
        image: 'http://localhost:5000/' + this.$auth.user.img,
        user_name: this.$auth.user.username,
        followers: this.$auth.user.followers.length,
        description: this.$auth.user.description,
        posts: this.$auth.user.posts,
        media: ['facebook', 'twitter', 'email']
      }
    },
    asyncData({params}) {
      return axios.get(`http://localhost:5000/user/${params.username}`)
        .then((res) => {
          console.log(res)
          return {
            user: res.data.user
          }
        })

    },
  }
</script>

<style scoped>
  /* ------MAIN------ */

  .post {
    transition: all 1s;
  }

  .post-container {
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-column: 1;
    margin: 10px auto;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }

  .section-title {
    margin: 0;
    padding-left: 7%;
  }

  #main_profile_section {
    grid-column: 2;
    margin-top: 20px;
  }

  #featured_stories {
    width: 100%;
    height: 45%;
  }

  #post-list {
    width: 100%;
    height: 510px;

  }

  /* ------FEATURED STORIES------ */

  .post-grid-container {
    height: 85%;
    width: 100%;
    overflow: scroll;
  }

  .flex-container > div {
    vertical-align: middle;
  }

  /* ------SIDEBAR------ */

  #username {
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
  }

  .social-icons{
    margin-left: 18%;
    margin-top: 10%;
  }

  #followers {
    text-align: center;
    margin-top: 5px;
  }

  .profile-img {
    object-fit: cover;
    border-radius: 15px;
  }

  #side_bar {
    grid-column: 1;
    width: 100%;
  }

  #stats, #about, #socials, #profile_pic {
    background-color: white;
    width: 190px;
    margin: 40px auto auto;
    border-radius: 15px;
    border: 1.5px solid black;
  }

  #socials {
    height: 130px;
  }

  #profile_pic {
    height: 200px;
    display: flex;
  }

</style>
