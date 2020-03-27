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
              :content="post.content"/>

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

  .recent-post {
    width: 100%;
    height: 80px;
    list-style-type: none;
  }

  .post-img img {
    width: 100px;
    height: 70px;
    float: left;
    margin-right: 15px;
    border: 5px solid #16A085;
    transition: 0.5s;
  }

  .recent-post a {
    text-decoration: none;
    color: #34495E;
    transition: 0.5s;
  }

  .post-img, .recent-post a:hover {
    color: #F39C12;
  }

  .post-img img:hover {
    border: 5px solid #F39C12;
  }

  /*===============ARCHIVES////////////////////////////*/


  button.accordion {
    background-color: #16A085;
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

  button.accordion.active, button.accordion:hover {
    background-color: #F39C12;
    color: #fff;
  }

  button.accordion:after {
    content: '\002B';
    color: #fff;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }

  button.accordion.active:after {
    content: "\2212";
  }

  .panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
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
