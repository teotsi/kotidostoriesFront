<template>
  <transition mode="out-in" name="fade-out">
    <div class="comment-edit" v-if="edit">

      <comment-editor :id="id" :value="content" event-message="Edit comment"
                      event-name="comment-edit"
                      v-on:comment-edit-input="storeEdit"/>
      <div class="save-button-container">
        <b-button
          @click="edit=false"
          size="sm"
          variant="outline-danger">Cancel ❌
        </b-button>
        <b-button
          :disabled="!editContent"
          @click="saveCommentEdit"
          class="save-button"
          size="sm"
          variant="contrast">Save 💾
        </b-button>

      </div>
    </div>

    <div class="comment-container" v-else>
      <div class="user-details">
        <div class="user-image">
          <img :src="`${$axios.defaults.baseURL}${img}`" alt="User image">
        </div>

        <p>{{user}}</p>
      </div>

      <div class="comment-content-container">
        <div class="comment-content" v-html="contentInfo">
        </div>
        <span class="date-info">
            {{this.dateInfo}},{{this.timeInfo}}
      </span>

      </div>

      <div class="edit-delete-container">
        <b-button
          :class="!this.$auth.loggedIn || this.$auth.user.username !==user?'hide':''"
          @click="deleteComment"
          size="sm"
          variant="danger">Delete
        </b-button>
        <b-button
          :class="!this.$auth.loggedIn || this.$auth.user.username !==user?'hide':''"
          @click="edit=!edit"
          size="sm"
          variant="contrast">Edit 📝
        </b-button>
      </div>


    </div>
  </transition>


</template>

<script>
  import CommentEditor from "./CommentEditor";
  import axios from "axios";

  export default {
    name: "Comment",
    components: {CommentEditor},
    props: {
      user: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      post: {
        type: Object,
        required: true
      },
      img: {
        type: String,
        default: 'pictures/profile/default.png'
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dateObj: null,
        dateInfo: null,
        timeInfo: null,
        contentInfo: this.content,
        editContent: '',
        edit: false
      }
    },
    mounted() {
      this.dateObj = new Date(this.date);
      this.dateInfo = this.dateObj.toDateString();
      this.timeInfo = `${this.dateObj.getHours()}:${this.dateObj.getMinutes()}`
    },
    methods: {
      storeEdit(event) {
        this.editContent = event['value'];
      },
      async deleteComment() {
        const deleteResponse = await axios.delete(`${this.post.user.username}/posts/`
          + `${this.post.id}/comments/${this.id}/`, {withCredentials: true});
        if (deleteResponse.status === 200) {
          this.$emit('delete-comment', this.id);
        }
      },
      async saveCommentEdit() {
        const editResponse = await axios.patch(`${this.post.user.username}/posts/${this.post.id}/comments/${this.id}/`,
          {'content': this.editContent}, {withCredentials: true});
        if (editResponse.status === 200) {
          this.contentInfo = this.editContent;
          this.edit = false;
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .comment-container {
    position: relative;
    display: flex;
    padding: 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid gray;
    }

    &:hover {
      background-color: var(--soft-hover);

      button {
        display: initial;
      }
    }
  }

  .hide {
    display: none;
  }

  .comment-edit {
    margin: 10px 0;
  }

  .save-button {
    margin-left: 10px;
  }

  .comment-content-container {
    margin-bottom: 0;
  }

  .comment-content {
    padding-bottom: 5px;
    text-align: justify;
  }

  .edit-delete-container {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;

    button {
      margin: 5px;
      display: none;
    }
  }

  .save-button-container {
    display: flex;
    justify-content: flex-end;
  }

  .date-info {
    text-align: right;
    font-size: 10px;
    color: #7f828b;
  }

  .user-details {
    padding: 0 10px;
    text-align: center;
    margin-right: 20px;

    p {
      font-size: 14px;
      margin: 0;
    }
  }

  .user-image {
    border-radius: 50%;
    height: 3em;
    width: 3em;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }


  .fade-out-enter-active, .fade-out-leave-active {
    transition: all .3s ease;
  }

  .fade-out-enter, .fade-out-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
