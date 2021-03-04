<template>
  <transition
    mode="out-in"
    name="fade-out"
  >
    <div
      v-if="edit"
      class="comment-edit"
    >
      <h4>Edit comment!</h4>
      <comment-editor v-model="editContent"/>
      <div class="save-button-container">
        <b-button
          size="sm"
          variant="outline-danger"
          @click="edit=false"
        >
          Cancel ❌
        </b-button>
        <b-button
          :disabled="editContent === content"
          class="save-button"
          size="sm"
          variant="contrast"
          @click="saveCommentEdit"
        >
          Save 💾
        </b-button>
      </div>
    </div>

    <div
      v-else
      class="comment-container"
    >
      <div class="user-details">
        <div class="user-image">
          <img
            :src="`${$axios.defaults.baseURL}${userImg}#${new Date().getTime()}`"
            alt="User image"
          >
        </div>

        <p>{{ user }}</p>
      </div>

      <div class="comment-content-container">
        <div
          class="comment-content"
          v-html="contentInfo"
        />
        <span class="date-info">
          {{ dateInfo }},{{ timeInfo }}
        </span>
      </div>

      <div
        v-if="this.$auth.loggedIn && user=== this.$auth.user.username"
        class="edit-delete-container"
      >
        <b-button
          size="sm"
          variant="danger"
          @click="deleteComment"
        >
          Delete
        </b-button>
        <b-button
          size="sm"
          variant="contrast"
          @click="edit=!edit"
        >
          Edit 📝
        </b-button>
      </div>
    </div>
  </transition>
</template>

<script>
import UnfoldEditor from "@/components/UnfoldEditor";
import CommentEditor from "~/components/Comment/CommentEditor";

export default {
  name: "Comment",
  components: {CommentEditor, UnfoldEditor},
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
      userImg: this.img,
      dateObj: null,
      dateInfo: null,
      timeInfo: null,
      contentInfo: this.content,
      editContent: this.content,
      edit: false
    }
  },
  mounted() {
    this.dateObj = new Date(this.date);
    this.dateInfo = this.dateObj.toDateString();
    this.timeInfo = `${this.dateObj.getHours()}:${this.dateObj.getMinutes()}`
  },
  methods: {
    async deleteComment() {
      const deleteResponse = await this.$axios.delete(`user/${this.post.user.username}/posts/`
        + `${this.post.id}/comments/${this.id}/`, {withCredentials: true});
      if (deleteResponse.status === 200) {
        this.$emit('delete-comment', this.id);
      }
    },
    async saveCommentEdit() {
      this.edit = false;
      const editResponse = await this.$axios.patch(`user/${this.post.user.username}/posts/${this.post.id}/comments/${this.id}/`,
        {'content': this.editContent}, {withCredentials: true});
      if (editResponse.status === 200) {
        this.contentInfo = this.editContent;
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
  margin-top:10px;
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
