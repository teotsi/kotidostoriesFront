<template>

  <div class="grid-wrapper">
    <!--=====================
                     CATEGORIES
                ======================-->
    <div class="widget-sidebar side">
      <category-radio @input="showPosts" v-model="selected"/>
      <h2 class="title-widget-sidebar">CATEGORIES</h2>
      <b-button-group size="sm">
        <div>
          <b-button variant="category" :disabled="!existingCategory(btn.caption)"
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
            :estimated-time="post.estimatedTime"
            :user="post.user.username"
            :userImg="post.user.img"
            class="post"
            v-for="post in this.posts"/>
    </transition-group>
  </div>


</template>

<script>
  import Post from "./Post";
  import {estimateReadingTime, fadeSide, normalizeCategory} from "../../assets/js/utils";
  import CategoryRadio from "../CategoryRadio/CategoryRadio";

  export default {

    components: {
      CategoryRadio,
      Post
    },
    middleware: 'auth',
    methods: {
      showPosts(selected) {
        this.posts = selected === 'followed' ? this.followedPosts.slice() : this.discoveredPosts.slice();
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
            if (this.selected === "discover") {
              this.discoveredPosts.forEach((post, index) => {
                console.log(post);
                this.posts[index] = post;
              })
            } else {
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
        selected:'discover',
        options: [
          {text: 'Discover', value: 'discover'},
          {text: 'Followed', value: 'followed'}
        ],
        posts: [],
        discoveredPosts: [],
        followedPosts: [],
        catfilter: [],
        group: {},
        myToggle: false,
        buttons: [
          {caption: 'Love', state: false, normalized: 'love'},
          {caption: 'Horror', state: false, normalized: 'horror'},
          {caption: 'Funny', state: false, normalized: 'funny'},
          {caption: 'Poems', state: false, normalized: 'poem'},
          {caption: 'Sci-fi', state: false, normalized: 'sci-fi'},
          {caption: 'Mystery', state: false, normalized: 'whodunit'}
        ]
      }
    },
    computed: {
      categorizedPosts() { //create object with groups of posts based on shared category
        if (this.selected === "discover") {
          return this.discoveredPosts.reduce((cat, post) => {
            if (!cat[post.category]) {
              cat[post.category] = [];
            }
            cat[post.category].push(post);
            return cat;
          }, {})
        } else {
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

      this.discoveredPosts.forEach((post) => {
        post['estimatedTime'] = estimateReadingTime(post.content);
      })
      this.followedPosts.forEach((post) => {
        post['estimatedTime'] = estimateReadingTime(post.content);
      })

      if (this.$route.query.category) {
        let category = normalizeCategory(this.$route.query.category)
        if (this.categorizedPosts[category]) {
          this.toggleCategory(this.$route.query.category)
          this.buttons.forEach((button) => {
            if (button.normalized === category) {
              button.state = true;
            }
          })
        }
      }
    },
  }
</script>

<style scoped lang="scss">

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 80px;
    justify-items: center;
  }

  .post-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-column: 1;
  }



  .dis-follow-btn:focus {
    background-color: #950ca0;
  }

  .widget-sidebar {
    padding: 20px;
    grid-column: 1;
  }


  .title-widget-sidebar {
    color: var(--soft-primary-text);
    font-size: 14pt;
    border-bottom: 2px solid #e5ebef;
    margin-bottom: 15px;
    padding-bottom: 10px;
    margin-top: 0px;

    &:after{
      border-bottom: 2px solid #950ca0;
      width: 150px;
      display: block;
      position: absolute;
      content: '';
      padding-bottom: 10px;
    }
  }

  @media (min-width: 800px) {
    .post-container {
      justify-content: space-between;
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

</style>
