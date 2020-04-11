<template>
  <section id="blog-section">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <transition-group name="list-complete" tag="div">

            <Post :comments="post.comments.length"
                  :content="post.content"
                  :date="post.date"
                  :id="post.id"
                  :img="'http://localhost:5000/'+post.img"
                  :key="post.id"
                  :preview="post.preview"
                  :reactions="post.reactions.length"
                  :slug="post.slug"
                  :title="post.title"
                  :user="post.user.username"
                  class="post"
                  v-for="post in this.$auth.user.posts"
                  v-if="catfilter.length===0"/>
          </transition-group>

          <transition-group name="list-complete" tag="div">
          <Post :comments="post.comments.length"
                :content="post.content"
                :date="post.date"
                :id="post.id"
                :img="'http://localhost:5000/'+post.img"
                :key="post.id"
                :preview="post.preview"
                :reactions="post.reactions.length"
                :slug="post.slug"
                :title="post.title"
                :user="post.user.username"
                class="post"
                v-else
                v-for="post in this.$auth.user.posts"
                v-if="catfilter.includes(post.category)"
          />
          </transition-group>

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
                <b-button :key="idx" :pressed.sync="btn.state"
                          @click="toggleCategory(btn.caption.toLowerCase())"
                          class="categories-btn"
                          squared
                          v-for="(btn, idx) in buttons"
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
        if (category === "poems") {
          category = 'poem';
        }
        if (this.catfilter.includes(category)) {
          this.catfilter.splice(this.catfilter.indexOf(category), 1);
        } else {
          this.catfilter.push(category);
        }
        console.log(this.catfilter);
      }
    },
    data() {
      return {
        catfilter: [],
        myToggle: false,
        buttons: [
          {caption: 'Love', state: false},
          {caption: 'Horror', state: false},
          {caption: 'Funny', state: false},
          {caption: 'Poems', state: false},
          {caption: 'Sci-fi', state: false},
          {caption: 'Mystery', state: false}
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

  .btn-secondary:not(:disabled):not(.disabled).active {
    background-color: #950ca0;
    color: #fff;
  }

  .post {
    transition: all 1s;
    display: inline-block;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
