<template>
  <section id="blog-section">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <client-only>
            <Post v-if="catfilter.length===0"
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
            <Post v-else
                  v-for="post in this.$auth.user.posts"
                  v-if="catfilter.includes(post.category)"
                  :key="post.id"
                  :title="post.title"
                  :user="post.user.username"
                  :preview="post.preview"
                  :date="post.date"
                  :id="post.id"
                  :content="post.content"
                  :img="'http://localhost:5000/'+post.img"
                  :comments="post.comments.length"
                  :reactions="post.reactions.length"
            />
          </client-only>
        </div>
      </div>
      <client-only>
        <div class="col-lg-2">

          <!--=====================
                 CATEGORIES
            ======================-->
          <div class="widget-sidebar">
            <h2 class="title-widget-sidebar">CATEGORIES</h2>
            <b-button-group size="sm">
              <div>
              <b-button squared class="categories-btn"
                v-for="(btn, idx) in buttons"
                :key="idx"
                :pressed.sync="btn.state"
                @click="toggleCategory(btn.caption.toLowerCase())"
              >
                {{ btn.caption }}
              </b-button>

              </div>
            </b-button-group>
          </div>
        </div>
      </client-only>
    </div>


  </section>
</template>

<script>
  import Post from "./Post";

  export default {

    components: {
      Post
    },
    methods: {
      toggleCategory: function (category) {
        if (category==="poems"){
          category='poem';
          if (this.catfilter.includes(category)){
            this.catfilter.splice(this.catfilter.indexOf(category), 1);
          }else{
            this.catfilter.push(category);
          }
        }else {
          if (this.catfilter.includes(category)){
            this.catfilter.splice(this.catfilter.indexOf(category), 1);
          }else{
            this.catfilter.push(category);
          }
        }
        console.log(this.catfilter);
      }
    },
    data() {
      return {
        catfilter: [],
        myToggle: false,
        buttons: [
          { caption: 'Love', state: false },
          { caption: 'Horror', state: false },
          { caption: 'Funny', state: false },
          { caption: 'Poems', state: false },
          { caption: 'Sci-fi', state: false },
          { caption: 'Mystery', state: false }
        ]
      }
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
    background-color: #7e6ca0;
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

  /*.categories-btn:hover {*/
  /*  background-color: #950ca0;*/
  /*  color: #fff;*/
  /*}*/

  /*.categories-btn:active {*/
  /*  background-color: #950ca0;*/
  /*  color: #fff;*/
  /*}*/

  .btn-secondary:not(:disabled):not(.disabled).active{
      background-color: #950ca0;
      color: #fff;
  }
</style>
