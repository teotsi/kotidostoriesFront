<template>
  <div
    class="autocomplete-item" @mouseup="$emit('toggle-width',$event)">
    <nuxt-link no-prefetch :to="`/user/${post.user.username}`">
      <div class="post-details">
        <div class="post-image">
          <img :src="`http://localhost:5000/${post.img}`" alt="Post image">
        </div>

        <p>{{post.user.username}}</p>
      </div>
    </nuxt-link>

    <nuxt-link prefetch :to="`/${post.id}`" class="post-link">
      <div class="item-content-container">
        <h4> {{ post.title }}</h4>
        <p>{{post.preview}}</p>
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

<style scoped>

  .autocomplete-item {
    display: flex;
    width: 100%;
    background: white;
  }


  .post-details {
    padding: 0 10px;
    text-align: center;
    margin-right: 10px;
  }

  .post-details p {
    font-size: 14px;
    margin: 0;
  }

  .post-image {
    border-radius: 50%;
    width: 6em;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  a, a:hover, a:visited {
    color: initial;
    text-decoration: none;
    margin:0;
    padding: 5px 0;
  }

  .post-link{
    width: 100%;
  }
  .item-content-container {
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-content-container h4 {
    font-family: var(--title-font);
    font-size: 22px;
  }

  .item-content-container h4, .item-content-container p {
    overflow: hidden;
  }

  .item-content-container p {
    font-size: 15px;
  }

  .autocomplete-item:hover {
    background-color: var(--hover-soft-gray)
  }

  .autocomplete-item:active {
    background: gray;
  }

  .autocomplete-item:not(:last-child) {
    border-bottom: 1px solid gray;
  }
</style>
