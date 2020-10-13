<template>
  <section class="comment-section">
    <h1 class="comments-header">
      Comments
    </h1>
    <comment-editor
      :initial-value="initialValue"
      v-model="commentContent"
    />
    <div
      id="comment-button-container"
      class="comment-buttons"
    >
      <spinner
        :hide-spinner="hideSpinner"
        label="Posting comment..."
      />

      <b-button
        :disabled="!this.$auth.loggedIn
              ||commentContent.value.length===0 || commentContent.value==='<p></p>'"
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
</template>

<script>
import CommentEditor from "@/components/Comment/CommentEditor";
import Comment from "@/components/Comment/Comment";
import Spinner from "~/components/Spinner/Spinner";

export default {
  name: "CommentSection",
  components: {Spinner, Comment, CommentEditor},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    createComment() {
      this.hideSpinner = false;
      this.$axios.$post(`user/${this.post.user.username}/posts/${this.post.id}/comments/`,
        {"content": this.commentContent.value},
        {withCredentials: true})
        .then((response) => {
          this.hideSpinner = true;
          this.initialValue = '';
          this.commentContent = {value: ''};
          this.post.comments.push(response.comment)
        })
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
  },
  data() {
    return {
      commentContent: {value: ''},
      hideSpinner: true,
      initialValue:''
    }
  }

}
</script>

<style scoped>
  .comments-header {
    font-family: var(--title-font);
    color: var(--soft-primary-text);
  }

  .comment-buttons {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .comment-item {
    transition: all 0.3s ease;
  }
</style>
