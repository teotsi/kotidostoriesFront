<template>
  <div class="post-container">
    <nuxt-link :to="`/${id}/`">
      <div class="posts">
        <img
          :src="`${$axios.defaults.baseURL}${img}`"
          alt="Post image"
          class="post-image"
          fluid-grow
        >
        <div class="post-info">
          fix i          <h4>{{ title }}</h4>
          <div
            class="post-preview"
            v-html="preview"
          />
          <div
            v-if="this.$auth.loggedIn && username=== this.$auth.user.username"
            class="button-container"
          >
            <b-button
              variant="danger"
              @click="deletePost"
            >
              Delete
            </b-button>
            <b-button
              style="margin: 0px;"
              variant="contrast"
              @click="editPost"
            >
              Edit story 📝
            </b-button>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
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
    async deletePost(event) {
      event.preventDefault()
      const deleteResponse = await this.$axios.delete(`user/${this.username}/posts/${this.id}/`, {withCredentials: true});
      if (deleteResponse.status === 200) {
        this.$emit('delete-post', this.id);
      }
    },
    async editPost(event){
      event.preventDefault()
      await this.$router.push(`/TextEditor/${this.id}`)
    }
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
  -webkit-box-shadow: 0px 0px 4px 1px var(--primary-shadow-color);
  -moz-box-shadow: 0px 0px 4px 1px var(--primary-shadow-color);
  box-shadow: 0px 0px 4px 1px var(--primary-shadow-color);
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
  color: var(--soft-primary-text);
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

.post-preview {
  height: 4.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;

  p {
    text-overflow: ellipsis;
  }
}

</style>
