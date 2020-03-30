<template>
  <section id="blog-section">
      <div class="row">
        <div class="col-lg-10">
          <div class="row">
            <client-only>
              <Post id="post"
                v-for="post in this.$auth.user.posts"
                :key="post.id"
                :title="post.title"
                :user="post.user.username"
                :preview="post.preview"
                :date="post.date"
                :id="post.id"
                :content="post.content"
                :img="'http://localhost:5000/'+post.img"
                :comments="post.comments.length"
                :reactions="post.reactions.length"/>
            </client-only>
          </div>
        </div>
        <div class="col-lg-2">

          <!--=====================
                 CATEGORIES
            ======================-->
          <div class="widget-sidebar">
            <h2 class="title-widget-sidebar">CATEGORIES</h2>
            <button class="categories-btn">Love </button>
            <button class="categories-btn">Horror</button>
            <button class="categories-btn">Funny</button>
            <button class="categories-btn">Poems</button>
            <button class="categories-btn">Sci-fi</button>
            <button class="categories-btn">Mystery</button>
            <button class="categories-btn">Poems</button>
          </div>
        </div>
      </div>


  </section>
</template>

<script>
  import Post from "./Post";
  export default {
    components: {
      Post
    }
  }
</script>

<style scoped>


  #blog-section {
    margin-top: 40px;
    margin-bottom: 80px;
    width: 100%;
  }

  /*recent-post-col////////////////////*/
  .widget-sidebar {
    background-color: #fff;
    padding: 20px;
    margin-top: 30px;
  }

  .title-widget-sidebar {
    font-size: 14pt;
    border-bottom: 2px solid #e5ebef;
    margin-bottom: 15px;
    padding-bottom: 10px;
    margin-top: 0px;
  }

  .title-widget-sidebar:after {
    border-bottom: 2px solid #950ca0;
    width: 150px;
    display: block;
    position: absolute;
    content: '';
    padding-bottom: 10px;
  }
  /*categories//////////////////////*/

  .categories-btn {
    background-color: #950ca0;
    margin-top: 30px;
    color: #fff;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;

  }

  .categories-btn:after {
    color: #fff;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }

  .categories-btn:hover {
    background-color: #a03f7a;
    color: #fff;
  }
</style>
