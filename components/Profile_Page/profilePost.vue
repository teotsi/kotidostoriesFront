<template>
  <div class="post-container">
    <nuxt-link :to="`/${id}/`">
      <div class="posts">
        <img :src="`http://localhost:5000/${img}`" class="post-image" alt="Post image" fluid-grow/>
        <div class="post-info">
          <h4>{{title}}</h4>
          <div v-html="preview"/>
          <div class="button-container">
            <nuxt-link :to="`/user/${this.$auth.user.username}`">
              <b-button
                :class="!this.$auth.loggedIn || this.$auth.user.username !==username?'hide':''"
                @click="deletePost"
                variant="danger">Delete
              </b-button>
            </nuxt-link>
            <nuxt-link :to="`/TextEditor/${id}`">
              <b-button style="margin: 0px;"
                v-if="this.$auth.loggedIn &&  username=== this.$auth.user.username"
                variant="contrast">Edit story 📝
              </b-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  import axios from "axios";

  export default {

    props: {
      title: {
        type: String,
        required: true
      },
      preview: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      img: {
        type: String,
        default: 'post/default.png'
      },
      username: {
        type: String,
        required: true
      }
    },
    methods: {
      async deletePost() {
        const deleteResponse = await axios.delete(`http://localhost:5000/user/${this.username}/posts/`
          + `${this.id}/`, {withCredentials: true});
        if (deleteResponse.status === 200) {
          this.$emit('delete-post', this.id);
        }
      },
    }

  }
</script>

<style lang="scss" scoped>

  .posts {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-column: 2;
    width: 100%;
    height: 140px;
    border-radius: 15px;
    word-wrap: break-word;
    -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
  }

  h4 {
    font-family: var(--title-font);
  }

  .post-container {
    width: 75%;
    margin: auto;

    &:hover {
      .button-container {
        display: initial;

      }
    }
  }

  .post-info {
    margin-top: 15px;
    color: black;
    position: relative;
  }

  .button-container {
    position: absolute;
    bottom: 1px;
    right: 8px;
    display: none;
  }


  .post-image {
    width: 70%;
    height: 70%;
    border-radius: 15px;
    grid-column: 1;
    margin: auto;
    object-fit: cover;
  }

  img {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
  }


</style>
