<template>
  <div
    class="autocomplete-item"
    @mouseup="$emit('toggle-width',$event)"
  >
    <nuxt-link
      :to="`/user/${post.user.username}`"
      no-prefetch
    >
      <div class="post-details">
        <div class="post-image">
          <img
            :src="`${$axios.defaults.baseURL}${post.img}`"
            alt="Post image"
          >
        </div>

        <p>{{ post.user.username }}</p>
      </div>
    </nuxt-link>

    <nuxt-link
      :to="`/${post.id}`"
      class="post-link"
      prefetch
    >
      <div class="item-content-container">
        <h4> {{ post.title }}</h4>
        <div
          class="preview-content"
          v-html="post.preview"
        />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "AutoCompleteItem",
    props: {
      post: {
        type: Object,
        required: true
      },
    }

  }
</script>

<style lang="scss" scoped>

  .autocomplete-item {
    display: flex;
    width: 100%;
    background: var(--bg);

    &:hover {
      background-color: var(--soft-hover)
    }

    &:active {
      background: gray;
    }

    &:not(:last-child) {
      border-bottom: 1px solid gray;
    }
  }


  .post {
    &-details {
      padding: 0 10px;
      text-align: center;
      margin-right: 10px;

      p {
        font-size: 14px;
        margin: 0;
      }
    }

    &-image {
      border-radius: 50%;
      width: 6em;
    }

    &-link {
      width: 100%;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  a, a:hover, a:visited {
    color: initial;
    text-decoration: none;
    margin: 0;
    padding: 5px 0;
  }

  .item-content-container {
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    h4 {
      font-family: var(--title-font);
      font-size: 22px;
      color: var(--soft-primary-text);
    }

    h4, .preview-content {
      overflow: hidden;
    }

    .preview-content {
      font-size: 15px;
      color: var(--preview-color);
    }
  }

</style>
