<template>
  <div id="posts">
      <h3 id="section_title"><!--getUserName-->'s Posts</h3>
      <nuxt-link :to="`/${id}/`" id="post-link">
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
      </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

#section_title{
    margin: 0;
    padding-left: 7%;
    padding-top: 5%;
}

.post-grid-container{
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    height: 85%;
    width: 100%;
    overflow: scroll;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* Pre renders the final frame */
.post-grid-container::after{
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

/* Transitions to showing the rendered but hidden final frame*/
.post-grid-container:hover::after{
    opacity: 1;
}
</style>