<template>
  <section id="blog-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <Post
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

          </div>
        </div>

        <!--           // RECENT POST===========-->
        <div class="col-lg-4">

          <!--=====================
                 CATEGORIES
            ======================-->
          <div class="widget-sidebar">
            <h2 class="title-widget-sidebar">// CATEGORIES</h2>
            <button class="categories-btn">Romantic</button>
            <button class="categories-btn">Horror</button>
            <button class="categories-btn">Action</button>
            <button class="categories-btn">Poems</button>
          </div>
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
    border-bottom: 2px solid #f1c40f;
    width: 150px;
    display: block;
    position: absolute;
    content: '';
    padding-bottom: 10px;
  }
  /*categories//////////////////////*/

  .categories-btn {
    background-color: #F39C12;
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
    content: '\25BA';
    color: #fff;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }

  .categories-btn:hover {
    background-color: #16A085;
    color: #fff;
  }

  .form-control {
    border-radius: 0px;
  }

  .btn-warning {
    border-radius: 0px;
    background-color: #F39C12;
    margin-top: 15px;
  }

  .input-group-addon {
    border-radius: 0px;
  }
</style>
