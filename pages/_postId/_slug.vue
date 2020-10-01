<template>
  <div class="grid-wrapper">
    <div class="content-container">
      <h1 class="title">
        {{ post.title }} <span class="inline">by <nuxt-link :to="'/user/'+ post.user.username">{{ post.user.username }}
        </nuxt-link> </span>
      </h1>

      <p class="date-info">
        <nuxt-link
          :to="`/?category=${post.category}`"
          no-prefetch
        >
          {{ post.category }}
        </nuxt-link>
        {{ new Date(post.date).toDateString() }}
      </p>

      <div class="image-container">
        <img
          :src="`${$axios.defaults.baseURL}${post.img}`"
          alt="Story image"
          class="main-image"
        >
      </div>

      <div
        class="main-text"
        v-html="post.content"
      />
      <div class="post-options-container">
        <b-button
          v-if="this.$auth.loggedIn && post.user.username === this.$auth.user.username"
          :href="`/TextEditor/${post.id}`"
          variant="contrast"
        >
          Edit story 📝
        </b-button>

        <DonateModal
          v-else-if="this.$auth.loggedIn && post.user.username !== this.$auth.user.username"
          :user="post.user.username"
        />

        <share-button
          v-for="(site, index) in media"
          id="hey"
          :key="index"
          :name="site"
        />

        <font-awesome-icon
          id="clipboard-icon"
          :icon="['fas','clipboard']"
          size="2x"
          @click="copyToClipboard"
          @mouseover="copyToClipboard"
        />

        <b-popover
          placement="right"
          target="clipboard-icon"
          triggers="hover"
        >
          {{ copyInfo }}
        </b-popover>
      </div>
      <reaction-bar
        :reactions="reactions"
        :existing-reaction="existingId"
        :post-id="post.id"
      />
      <!--      <section class="reaction-section">-->
      <!--        <h2 class="header">-->
      <!--          {{ reactionQuote }}-->
      <!--        </h2>-->
      <!--        <div class="reaction-box">-->
      <!--          <reaction-icon-->
      <!--            v-for="(reaction,index) in reactions"-->
      <!--            :key="index"-->
      <!--            :ref="reaction[0]"-->
      <!--            :enabled="reaction[1]"-->
      <!--            :existing-id="existingId"-->
      <!--            :icon="reaction[0]"-->
      <!--            @toggle-reaction="toggleReaction(index,reaction[1])"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </section>-->
      <hr>

      <section class="comment-section">
        <h1 class="comments-header">
          Comments
        </h1>
        <comment-editor
          :value="commentContent"
          @comment-input="storeComment"
        />
        <div
          id="comment-button-container"
          class="comment-buttons"
        >
          <Spinner
            :hide-spinner="hideSpinner"
            label="Posting comment..."
          />

          <b-button
            :disabled="!this.$auth.loggedIn
              ||commentContent.length===0 || commentContent==='<p></p>'"
            variant="light"
            @click="createComment"
          >
            Post Comment 💬
          </b-button>
          <b-popover
            :disabled="this.$auth.loggedIn"
            placement="right"
            target="comment-button-container"
            triggers="hover"
          >
            You need to be signed in!
          </b-popover>
        </div>
        <transition-group
          name="fade-out"
          tag="div"
        >
          <comment
            v-for="comment in post.comments"
            :id="comment.id"
            :key="comment.id"
            :content="comment.content"
            :date="comment.date"
            :img="comment.user.img"
            :post="post"
            :user="comment.user.username"
            class="comment-item"
            @delete-comment="removeFromList"
          />
        </transition-group>
      </section>
    </div>
    <section class="sidebar-suggestions">
      <div class="side">
        <h2 class="header">
          Check out...
        </h2>
        <sidebar-post
          v-for="post in suggestions"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>
  </div>
</template>

<script>
import {addSlug, fadeSide} from "assets/js/utils";
import ReactionIcon from "../../components/Reaction/ReactionIcon";
import Comment from "../../components/Comment/Comment";
import CommentEditor from "../../components/Comment/CommentEditor";
import SidebarPost from "../../components/Sidebar/SidebarPost";
import ShareButton from "../../components/Share/ShareButton";
import DonateModal from "../../components/Donate/DonateModal";
import Spinner from "../../components/Spinner/Spinner";
import ReactionBar from "@/components/Reaction/ReactionBar";

export default {
  name: 'Index',
  components: {
    ReactionBar,
    DonateModal,
    ShareButton,
    CommentEditor,
    SidebarPost,
    Comment,
    ReactionIcon,
    Spinner
  },
  async asyncData({params: {postId}, $axios, store }) {
    const post = await $axios.$get(`post/${postId}/`)
    const {reacted, reacted_id:reactedId} = post;
    console.log(reactedId)
    const reactions = store.state.reactions
    if (reacted) {
      console.log(reactions)
      reactions[reacted].enabled = true
      console.log(reactions)
    }
    const suggestions = await $axios.$get(`suggest/?pid=${postId}`)

    return {
      post,
      reactions,
      existingId: reactedId,
      slug: post.slug,
      suggestions
    }

  },
  data() {
    return {
      editCommentContent: {},
      commentContent: '',
      media: ['facebook', 'twitter', 'email'],
      url: "",
      copyInfo: "Click to copy!",
      disabled: false,
      selected: null,
      donateOther: null,
      hideSpinner: true
    }
  },
  head() {
    return {
      title: this.post.title
    }
  },
  async mounted() {
    //weird solution to add slug on url, if there's such a need
    addSlug(this.$route.params, this.slug);
    this.url = window.location.href;
    fadeSide();
  },
  methods: {
    toggleReaction(index, state) {
      for (let reaction of this.reactions) {
        reaction[1] = false;
      }
      this.$set(this.reactions[index], 1, !state);

    },
    createComment() {
      this.hideSpinner = false;
      this.$axios.$post(`user/${this.post.user.username}/posts/${this.post.id}/comments/`,
        {"content": this.commentContent},
        {withCredentials: true})
        .then((response) => {
          this.hideSpinner = true;
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
  color: var(--soft-primary-text);
}

.title {
  margin-bottom: 0;
}

.email-button-container {
  height: 42px !important;
  width: 100px !important;
}

#clipboard-icon {
  margin-top: 0;
  height: initial !important;
  color: var(--soft-primary-text);
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
    width: 100%;
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
  border: 1px solid var(--soft-primary-text);
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
