<template>

  <div class="grid-wrapper">
    <!--=====================
                     CATEGORIES
                ======================-->
    <div class="widget-sidebar side">
      <category-radio @input="showPosts" v-model="selected"/>
      <h2 class="title-widget-sidebar">CATEGORIES</h2>
      <CategoryButtonGroup :buttons="buttons" :pre-selected="preSelected" v-model="catfilter"/>
    </div>
    <!--=====================
                    POSTS
               ======================-->
    <transition-group class="post-container" name="list-complete" tag="div">
      <Post :comments="post.comments.length"
            :content="post.content"
            :date="post.date"
            :estimated-time="post.estimatedTime"
            :id="post.id"
            :img="$axios.defaults.baseURL+post.img"
            :key="post.id"
            :preview="post.preview"
            :reactions="post.reactions.length"
            :slug="post.slug"
            :title="post.title"
            :user="post.user.username"
            :userImg="post.user.img"
            class="post"
            v-for="post in this.posts"
            v-if="valid(post.category)"/>
    </transition-group>
  </div>


</template>

<script>
  import Post from "./Post";
  import {estimateReadingTime, fadeSide, normalizeCategory} from "../../assets/js/utils";
  import CategoryRadio from "../CategoryRadio/CategoryRadio";
  import CategoryButtonGroup from "../CategoryButtonGroup/CategoryButtonGroup";

  export default {

    components: {
      CategoryButtonGroup,
      CategoryRadio,
      Post
    },
    middleware: 'auth',
    methods: {
      valid(category) {
        this.buttons.find((button, index) => {
          if (button.value === category) {
            button.disabled = false
            return true;
          }
        });
        if (this.catfilter.length !== 0) {
          return this.catfilter.includes(category);
        }
        return true;
      },
      showPosts(selected) {
        this.posts = selected === 'followed' ? this.followedPosts.slice() : this.discoveredPosts.slice();
        const uniqueCategories = [...new Set(this.posts.map(post => post.category))]
        this.buttons.forEach((button, index) => {
          this.buttons[index].disabled = !uniqueCategories.includes(button.value);
        });
      }
    },
    data() {
      return {
        preSelected: [],
        selected: 'discover',
        options: [
          {text: 'Discover', value: 'discover'},
          {text: 'Followed', value: 'followed'}
        ],
        posts: [],
        discoveredPosts: [],
        followedPosts: [],
        catfilter: [],
        uniqueCategories: new Set(),
        myToggle: false,
        buttons: [
          {text: 'Love', value: 'love', disabled: true},
          {text: 'Horror', value: 'horror', disabled: true},
          {text: 'Funny', value: 'funny', disabled: true},
          {text: 'Poems', value: 'poem', disabled: true},
          {text: 'Sci-fi', value: 'sci-fi', disabled: true},
          {text: 'Mystery', value: 'whodunit', disabled: true}
        ]
      }
    },
    async mounted() {
      fadeSide();
      const postData = await this.$axios.get(`discover/`)
      const followedPostData = await this.$axios.get(`user/${this.$auth.user.username}/posts/?filter=following`)
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
        this.preSelected.push(category);
      }
    },
  }
</script>

<style lang="scss" scoped>

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

  .widget-sidebar {
    padding: 20px;
    grid-column: 1;
    width: 70%;
  }

  .dis-follow-btn:focus {
    background-color: #950ca0;
  }


  .title-widget-sidebar {
    color: var(--soft-primary-text);
    font-size: 14pt;
    border-bottom: 2px solid #e5ebef;
    margin-bottom: 15px;
    padding-bottom: 10px;
    margin-top: 0px;

    &:after {
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
    .widget-sidebar {
      width: 50%;
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
      width: 100%;
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
