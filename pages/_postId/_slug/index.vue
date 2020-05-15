<template>
  <div class="grid-wrapper">
    <div class="content-container">
      <h1 class="title">{{post.title}} <span class="inline">by <nuxt-link :to="'user/'+ post.user.username">{{post.user.username}} </nuxt-link> </span>
      </h1>
      <div class="image-container">
        <img :src="'http://localhost:5000/'+post.img" alt="Story image" class="main-image">
      </div>

      <div class="main-text" v-html="post.content"></div>
      <section class="reaction-section">
        <h2 class="header">
          {{reactionQuote}}
        </h2>
        <div class="reaction-box">
          <reaction-icon
            :enabled="reaction[1]"
            :existingId="existingId"
            :icon="reaction[0]"
            :key="index"
            :ref="reaction[0]"
            v-for="(reaction,index) in reactions"
            v-on:toggle-reaction="toggleReaction(index,reaction[1])"
          />
        </div>
      </section>
      <hr/>

      <section class="comment-section">
        <h1 class="comments-header">
          Comments
        </h1>
        <comment-editor :value="commentContent" v-on:comment-input="storeComment"/>
        <div class="comment-buttons">
          <b-button :disabled="this.commentContent.length===0 || this.commentContent==='<p></p>'"
                    variant="light"
                    @click="createComment">Post Comment
          </b-button>
        </div>
        <transition-group name="comments" tag="div">
        <comment
          class="comment-item"
          :content="comment.content"
          :date="comment.date"
          :key="comment.id"
          :user="comment.user.username"
          v-for="comment in post.comments"
        />
        </transition-group>
      </section>
    </div>
    <section class="sidebar-suggestions">
      <div class="side">
        <h2 class="header">Check out...</h2>
        <sidebar-post :post="post"
                      :key="post.id"
                      v-for="post in suggestions"/>
      </div>

    </section>
  </div>
</template>

<script>
  import axios from "axios";
  import {addSlug, fadeSide} from "../../../assets/js/utils";
  import ReactionIcon from "../../../components/Reaction/ReactionIcon";
  import Comment from "../../../components/Comment/Comment";
  import CommentEditor from "../../../components/Comment/CommentEditor";
  import SidebarPost from "../../../components/Sidebar/SidebarPost";
  export default {
    components: {
      CommentEditor,
       SidebarPost,
      Comment,
      ReactionIcon
    },
    methods: {
      toggleReaction(index, state) {
        for (let reaction of this.reactions) {
          reaction[1] = false;
        }
        this.$set(this.reactions[index], 1, !state);

      },
      createComment() {
        this.$axios.$post(`http://localhost:5000/user/${this.post.user.username}/posts/${this.$route.params.postId}/comments/`,
          {"content":this.commentContent},
          {withCredentials:true})
        .then((response)=>{
          this.commentContent = '';
          this.post.comments.push(response.comment)
        })
      }
      ,
      storeComment(event) {
        this.commentContent = event;
      }
    },
    data() {
      return {
        reactionQuotes: [
          'What did you think?',
          'Show some appreciation!',
          'Your feedback matters!'
        ],
        commentContent: ''
      }
    },
    computed: {
      reactionQuote() {
        return this.reactionQuotes[Math.floor(Math.random() * this.reactionQuotes.length)];
      }
    },
    async asyncData({params}) {
      let reacted;
      let existingReaction;
      let existingId;
      let reactions = [
        ['thumbs-up', false],
        ['heart', false],
        ['lightbulb', false],
        ['laugh-beam', false]
      ];
      const postData = await axios.get(`http://localhost:5000/post/${params.postId}`, {withCredentials: true})
      const post = postData.data
      reacted = post.reacted;
      if (reacted) {
        existingId = post.reacted_id;
        if (reacted === 'love') {
          existingReaction = 'heart'
        } else if (reacted === 'like') {
          existingReaction = 'thumbs-up'
        } else if (reacted === 'laugh') {
          existingReaction = 'laugh-beam'
        } else {
          existingReaction = 'lightbulb'
        }
        for (let [index, reaction] of reactions.entries()) {
          if (reaction[0] === existingReaction) {
            reactions[index][1] = true;
            break
          }
        }
      }
      const suggestionData = await axios.get(`http://localhost:5000/suggest?q=${post.user.username}`)
      return {
        post: post,
        reactions: reactions,
        existingId: existingId,
        slug: post.slug,
        suggestions: suggestionData.data
      }

    },
    mounted() {
      //weird solution to add slug on url, if there's such a need
      addSlug(this.$route.params, this.slug);
      fadeSide();
    }

  }
</script>

<style scoped>
  .inline {
    font-weight: normal;
  }

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .content-container {
    max-width: 600px;
    padding: 0 15px;

    grid-column: 1;
    border-radius: 10px;
    /*box-shadow: var(--soft-shadow);*/
    margin: 20px auto;
  }

  .sidebar-suggestions {

  }

  .image-container {
    width: 100%;
    box-shadow: var(--soft-shadow);
    margin: 10px 0;
  }

  .main-image {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }

  .title, .comments-header, .reaction-section h2, .sidebar-suggestions h2 {
    font-family: var(--title-font);
    color: var(--soft-black);
  }

  .main-text {
    text-align: justify;
  }

  .story-form {
    width: 100% !important;
  }

  .email-button-container {
    height: 42px !important;
    width: 100px !important;
  }
  .comments-enter-active, .comments-leave-active {
    transition: all 1s;
  }
  .comments-enter, .comments-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }

  @media (min-width: 800px) {
    .grid-wrapper {
      grid-template-columns: 32% 36% 32%;
      justify-items: center;
    }

    .content-container {
      grid-column: 2/3;
      max-width: initial;
    }

    .sidebar-suggestions {
      grid-column: 3/4;
      position: relative;
      top: 300px;
    }

    .side {
      margin-left: 50px;
    }
  }

  hr {
    border: 1px solid var(--soft-black);
  }

  .reaction-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .comment-buttons {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }


</style>
