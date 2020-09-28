<template>
  <div class="grid-container">
    <div id="side_bar">
      <div id="profile_pic">
        <b-img
          :src="image+'#'+new Date().getTime()"
          class="profile-img"
          fluid-grow
        />
      </div>
      <div id="stats">
        <div id="username">
          {{ user.username }}
        </div>
        <div id="followers">
          <p>Followers: {{ user.followers.length }}</p>
        </div>
      </div>
      <div id="about">
        <div style="font-weight: bold; text-align: center;">
          About me
        </div>
        <div style="width: 170px; text-align: center; font-size: 13px; margin: auto">
          {{ user.description }}
        </div>
      </div>
      <div id="socials">
        <div style="font-weight: bold; text-align: center; margin-top: 5px;">
          Social Media
        </div>
        <div class="social-icons">
          <share-button
            v-for="(site, index) in media"
            id="hey"
            :key="index"
            :name="site"
          />
        </div>
      </div>
      <div class="follow-container">
        <b-button
          v-if="isOwnProfile"
          href="/account"
          style="background-color: #950ca0"
        >
          Privacy
        </b-button>
        <b-button
          v-else-if="!isFollowing"
          variant="lilac"
          @click="follow"
        >
          Follow
        </b-button>
        <b-button
          v-else
          variant="lilac"
          @click="unfollow"
        >
          Unfollow
        </b-button>
      </div>
    </div>

    <div id="main_profile_section">
      <!--      The 3 featured stories     -->
      <div id="featured_stories">
        <h3 class="section-title">
          Featured Stories
        </h3>
        <transition-group
          class="post-container"
          name="list-complete"
          tag="div"
        >
          <Post
            v-for="post in featuredPosts.slice(0,3)"
            :id="post.id"
            :key="post.id"
            :comments="post.comments.length"
            :content="post.content"
            :date="post.date"
            :estimated-time="post.estimatedTime"
            :img="$axios.defaults.baseURL+post.img"
            :preview="post.preview"
            :reactions="post.reactions.length"
            :slug="post.slug"
            :title="post.title"
            :user="post.user.username"
            :user-img="post.user.img"
            class="post"
          />
        </transition-group>
      </div>
      <!--            The list with all the user's posts   -->
      <div id="post-list">
        <h3 class="section-title">
          User's Posts
        </h3>
        <div class="post-grid-container">
          <profile-post
            v-for="post in posts"
            :id="post.id"
            :key="post.id"
            :img="post.img"
            :preview="post.preview"
            :title="post.title"
            :username="user.username"
            @delete-post="removeFromList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profilePost from '../../../components/Profile_Page/profilePost';
import Post from "../../../components/LandingPage/Post";
import ShareButton from "../../../components/Share/ShareButton";
import {estimateReadingTime} from "assets/js/utils";

export default {
  components: {
    ShareButton,
    Post,
    profilePost
  },
  async asyncData({params, $axios}) {
    const response = await $axios.get(`user/${params.username}/`);
    const {data} = response;
    const {user, user: {posts}} = data;
    const featuredPosts = posts.filter(post => post.featured)
    return {
      user,
      image: $axios.defaults.baseURL + user.img,
      posts,
      featuredPosts
    }

  },
  data() {
    return {
      media: ['facebook', 'twitter', 'email']
    }
  },
  head() {
    return {
      title: `${this.user.username}'${this.user.username.substr(-1) === 's' ? '' : 's'} profile`
    }
  },
  computed:{
    isFollowing() {
      return this.$auth.loggedIn && this.user.followers.includes(this.$auth.user.id);
    },
    isOwnProfile(){
      return this.$auth.loggedIn && this.$auth.user.username===this.user.username;
    }
  },
  mounted() {
    this.featuredPosts.forEach((post) => {
      post['estimatedTime'] = estimateReadingTime(post.content);
    })
  },
  methods: {
    async follow() {
      const response = await this.$axios.get(`user/${this.user.username}/follow`, {withCredentials: true});
      const userResponse = await this.$axios.get(`user/${this.user.username}/`, {withCredentials: true});
      this.user = userResponse.data.user;
    },
    async unfollow() {
      const response = await this.$axios.delete(`user/${this.user.username}/follow`, {withCredentials: true});
      const userResponse = await this.$axios.get(`user/${this.user.username}/`, {withCredentials: true});
      this.user = userResponse.data.user;
    },
    removeFromList(event) {
      this.posts.forEach((post, index) => {
        if (post.id === event) {
          this.posts.splice(index, 1);
        }
      })
    },


  }
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
  grid-template-columns: 15% auto;
}

.section-title {
  margin: 0;
  padding-left: 7%;
}

.follow-container {
  margin-top: 25px;
  display: flex;
  justify-content: center;
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
  overflow-x: hidden;
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

.social-icons {
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
  background-color: inherit;
  width: 190px;
  margin: 40px auto auto;
  border-radius: 15px;
  border: 1.5px solid var(--soft-primary-text);
}

#socials {
  height: 130px;
}

#profile_pic {
  height: 200px;
  display: flex;
}

</style>
