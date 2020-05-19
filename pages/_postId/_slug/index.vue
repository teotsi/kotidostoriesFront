<template>
  <div class="grid-wrapper">
    <div class="content-container">

      <h1 class="title">{{post.title}} <span class="inline">by <nuxt-link :to="'user/'+ post.user.username">{{post.user.username}} </nuxt-link> </span>
      </h1>

      <p class="date-info"><a href="#">{{post.category}}</a> {{new Date(this.post.date).toDateString()}}</p>

      <div class="image-container">
        <img :src="'http://localhost:5000/'+post.img" alt="Story image" class="main-image">
      </div>

      <div class="main-text" v-html="post.content"/>

      <div class="post-options-container">
        <b-button :href="`/TextEditor/${post.id}`"
                  v-if="this.$auth.loggedIn && post.user.username === this.$auth.user.username"
                  variant="contrast">Edit story 📝
        </b-button>

        <DonateModal :user="post.user.username"
                     v-else-if="this.$auth.loggedIn && post.user.username !== this.$auth.user.username"/>

        <share-button :key="index"
                      :name="site"
                      id="hey" v-for="(site, index) in media">
        </share-button>

        <font-awesome-icon
          :icon="['fas','clipboard']"
          @click="copyToClipboard"
          @mouseover="copyToClipboard"
          id="clipboard-icon"
          size="2x"/>

        <b-popover
          placement="right"
          target="clipboard-icon" triggers="hover">
          {{copyInfo}}
        </b-popover>
      </div>
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
        <div class="comment-buttons" id="comment-button-container"
        >
          <b-button :disabled="!this.$auth.loggedIn
          ||this.commentContent.length===0 || this.commentContent==='<p></p>'"
                    @click="createComment"
                    variant="light">Post Comment 💬
          </b-button>

          <b-popover
            :disabled="this.$auth.loggedIn"
            placement="right"
            target="comment-button-container" triggers="hover">
            You need to be signed in!
          </b-popover>
        </div>
        <transition-group name="fade-out" tag="div">
          <comment
            :content="comment.content"
            :date="comment.date"
            :id="comment.id"
            :key="comment.id"
            :post="post"
            :user="comment.user.username"
            class="comment-item"
            v-for="comment in post.comments"
            v-on:delete-comment="removeFromList"
          />
        </transition-group>
      </section>
    </div>
    <section class="sidebar-suggestions">
      <div class="side">
        <h2 class="header">Check out...</h2>
        <sidebar-post :key="post.id"
                      :post="post"
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
  import ShareButton from "../../../components/Share/ShareButton";
  import DonateModal from "../../../components/Donate/DonateModal";

  export default {
    components: {
      DonateModal,
      ShareButton,
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
      isNumber() {

      },
      createComment() {
        this.$axios.$post(`http://localhost:5000/user/${this.post.user.username}/posts/${this.post.id}/comments/`,
          {"content": this.commentContent},
          {withCredentials: true})
          .then((response) => {
            this.commentContent = '';
            this.post.comments.push(response.comment)
          })
      },
      storeComment(event) {
        this.commentContent = event['value'];
      },
      removeFromList(event) {
        console.log(this.post.comments.length)
        this.post.comments.forEach((comment, index) => {
          if (comment.id === event) {
            this.post.comments.splice(index, 1);
          }
        })
        console.log(this.post.comments.length)
      },
      copyToClipboard(event) {
        if (event.type === 'click') {
          navigator.clipboard.writeText(this.url);
          this.copyInfo = "Copied!"
        } else {
          this.copyInfo = "Click to copy!"
        }
      }
    },
    data() {
      return {
        editCommentContent: {},
        reactionQuotes: [
          'What did you think?',
          'Show some appreciation!',
          'Your feedback matters!'
        ],
        commentContent: '',
        media: ['facebook', 'twitter', 'email'],
        url: "",
        copyInfo: "Click to copy!",
        disabled: false,
        selected: null,
        donateOther: null
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
      this.url = window.location.href;
      fadeSide();
    }

  }
</script>

<style lang="scss" scoped>
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

  .title {
    margin-bottom: 0;
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

  #clipboard-icon {
    margin-top: 0;
    height: initial !important;
    color: #212529;
  }

  #clipboard-icon:hover {
    cursor: pointer;
    color: #656565;
  }

  .comment-item {
    transition: all 0.3s ease;
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

  .reaction-box, .post-options-container {
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
