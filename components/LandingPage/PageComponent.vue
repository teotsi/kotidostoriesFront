<template>

  <div class="grid-wrapper">
    <!--=====================
                     CATEGORIES
                ======================-->
    <div class="widget-sidebar side">
      <div>
        <b-form-group>
          <b-form-radio-group class="post-buttons"
                              id="btn-radios-1"
                              v-model="selected"
                              @input="showPosts"
                              :options="options"
                              buttons
                              button-variant="purple"
                              name="radios-btn-default">
          </b-form-radio-group>
        </b-form-group>
      </div>
      <h2 class="title-widget-sidebar">CATEGORIES</h2>
      <b-button-group size="sm">
        <div>
          <b-button :class="['categories-btn']" :disabled="!existingCategory(btn.caption)"
                    :key="idx"
                    :pressed.sync="btn.state"
                    @click="toggleCategory(btn.caption)"
                    squared
                    v-for="(btn, idx) in buttons"
          >
            {{ btn.caption }}
          </b-button>

        </div>
      </b-button-group>
    </div>
    <!--=====================
                    POSTS
               ======================-->
    <transition-group class="post-container" name="list-complete" tag="div">
      <Post :comments="post.comments.length"
            :content="post.content"
            :date="post.date"
            :id="post.id"
            :img="$axios.defaults.baseURL+post.img"
            :key="post.id"
            :preview="post.preview"
            :reactions="post.reactions.length"
            :slug="post.slug"
            :title="post.title"
            :user="post.user.username"
            class="post"
            v-for="post in this.posts"/>
    </transition-group>
  </div>


</template>

<script>
  import Post from "./Post";
  import {fadeSide, normalizeCategory} from "../../assets/js/utils";

  export default {

    components: {
      Post
    },
    middleware: 'auth',
    methods: {
      showPosts(){
        console.log(this.selected)
        if (this.selected==='followed'){
          this.posts=this.followedPosts.slice();
        }else{
          this.posts=this.discoveredPosts.slice();
        }
      },
      existingCategory: function (category) { //check if category exists in current dataset
        category = normalizeCategory(category);
        if (this.categorizedPosts[category]) {
          return this.categorizedPosts[category].length > 0;
        }
      },
      toggleCategory: function (category) { //filter posts
        category = normalizeCategory(category);
        if (this.catfilter.includes(category)) { //in case category is being removed from filter

          this.catfilter.splice(this.catfilter.indexOf(category), 1);

          if (this.catfilter.length === 0) { //if no more categories, show all posts
            if (this.selected==="discover"){
              this.discoveredPosts.forEach((post, index) => {
                console.log(post);
                this.posts[index] = post;
              })
            }else {
              this.followedPosts.forEach((post, index) => {
                this.posts[index] = post;
              })
            }
          } else {
            let j = 0;
            if (this.categorizedPosts[category]) { //if category exists
              let postsToRemove = [];
              this.posts.forEach((post, index) => {
                if (post.category === category) {
                  postsToRemove.push(post) //collect posts to be removed
                }
              });
              postsToRemove.forEach((post, count) => {
                let indexToRemove = this.posts.indexOf(post);
                this.posts.splice(indexToRemove, 1) //remove said posts
              });

            }
          }
        } else {  //insert new category
          this.catfilter.push(category);


          let j = 0;
          if (this.categorizedPosts[category]) { //if category exists
            if (this.catfilter.length === 1) { //if first category, just show entire category
              this.categorizedPosts[category].forEach((post, index) => {
                if (post.category === category) {
                  this.posts[j] = post;
                  j++;
                }
              });

              this.posts.length = j;
            } else {
              this.posts.push(...this.categorizedPosts[category]) //append category
            }
          }
        }
        console.log(this.catfilter);

      },
    },
    data() {
      return {
        selected: 'discover',
        options: [
          { text: 'Discover', value: 'discover' },
          { text: 'Followed', value: 'followed' }
        ],
        posts:[],
        discoveredPosts:[],
        followedPosts:[],
        catfilter: [],
        group: {},
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
    },
    computed: {
      categorizedPosts() { //create object with groups of posts based on shared category
        if (this.selected==="discover"){
          return this.discoveredPosts.reduce((cat, post) => {
            if (!cat[post.category]) {
              cat[post.category] = [];
            }
            cat[post.category].push(post);
            return cat;
          }, {})
        }else {
          return this.followedPosts.reduce((cat, post) => {
            if (!cat[post.category]) {
              cat[post.category] = [];
            }
            cat[post.category].push(post);
            return cat;
          }, {})
        }
      }
    },
    async mounted() {
      fadeSide();
      const postData = await this.$axios.get(`discover/`)
      const followedPostData = await this.$axios.get(`user/${this.$auth.user.username}/posts?filter=following`)
      this.discoveredPosts = postData.data.posts;
      this.followedPosts = followedPostData.data.posts;
      this.posts = this.discoveredPosts.slice();
    },
  }
</script>

<style scoped>

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 80px;
    justify-items: center;
  }

  .post-container {
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-column: 1;
  }

  .post-buttons{
    background-color: #7F828B;
    margin-bottom: 30px;
  }

  .dis-follow-btn:focus{
    background-color: #950ca0;
  }

  /*recent-post-col////////////////////*/
  .widget-sidebar {
    padding: 20px;
    grid-column: 1;
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
    background-color: #8357a0;
    margin-top: 15px;
    color: #fff;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    text-align: center;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
    -webkit-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
    -moz-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
    box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
  }

  /*.categories-btn:hover {*/
  /*  background-color: #950ca0;*/
  /*  color: #fff;*/
  /*}*/

  .categories-btn:disabled {
    background-color: #1d191c;
    color: #fff;
  }

  .btn-secondary:not(:disabled).active {
    background-color: #950ca0;
    color: #fff;
  }


  .btn-secondary:not(:disabled):hover {
    background-color: #9839a0;
    color: #fff;
  }

  .btn-secondary:disabled:hover {
    cursor: default;
  }


  @media (min-width: 800px) {
    .post-container {
      justify-content: space-between;
    }

    .categories-btn {
      margin-top: 30px;
      padding: 18px;
      text-align: left;
    }
  }

  @media (min-width: 1200px) {
    .grid-wrapper {
      grid-template-columns: 7fr 1fr;
      justify-items: stretch;
      margin-left: 50px;
    }

    .post-container {
      grid-column: 1/2;
      justify-content: stretch;
    }

    .widget-sidebar {
      grid-row: 1/2;
      grid-column: 2/3;
    }
  }


  .post {
    transition: all 1s;
  }

  .list-enter-active {
    transition: all .3s ease;
  }

  .list-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .categories-btn:disabled:hover {
    animation: shake 0.25s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    20%, 80% {
      transform: translate3d(-1px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(2px, 0, 0);
    }
  }
</style>
