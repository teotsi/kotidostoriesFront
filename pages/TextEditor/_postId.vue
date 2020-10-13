<template>
  <transition name="fade">
    <div class="container">
      <p>
        This is Unfold's Editor! Here you can start working on new projects, or improve your previous work. You can
        also
        save your project until you are ready to publish it.
        If you need any help, check out our
        <nuxt-link to="/help">
          Getting started
        </nuxt-link>
        guide. Happy writing!
      </p>

      <image-upload
        :image-url="imageUrl"
        caption="Choose an image for your story!"
        @image-upload="storeImage"
      />

      <div class="title">
        <b-input-group
          class="mt-3"
          prepend="Title 📕"
        >
          <b-form-input
            id="title-input"

            v-model="post.title"
            :state="validTitle"
            placeholder="Enter a title!"
            @input="checkTitle"
          />
        </b-input-group>
      </div>
      <comment-editor
        :value="previewInput"
        event-name="preview"
        @preview-input="storePreview"
      />
      <unfold-editor
        :intro="post.content"
        :users="users"
        @input="store"
      />
      <div class="save-buttons">
        <b-input-group prepend="Featured?">
          <b-input-group-append is-text>
            <b-form-checkbox
              v-model="post.featured"
              :value="true"
            />
          </b-input-group-append>
        </b-input-group>

        <category-dropdown
          v-model="selectedCategory"
          :categories="categories"
          @input="disableByRef"
        />

        <b-dropdown
          id="popover-target-1"
          :disabled="!disabled"
          split
          text="Publish!"
          variant="light-dropdown"
          @click="publish"
        >
          <b-dropdown-item
            href="#"
            @click="saveDraft"
          >
            Save draft
          </b-dropdown-item>
        </b-dropdown>
        <b-popover
          ref="popover"
          v-model:disabled="disabled"
          placement="top"
          target="popover-target-1"
          triggers="hover"
        >
          You have to select a category <i>and</i> a title first!
        </b-popover>
        <b-button
          variant="outline-danger"
          @click="back"
        >
          Cancel
        </b-button>
        <spinner
          :hide-spinner="hideSpinner"
          label="Posting story..."
        />
      </div>
    </div>
  </transition>
</template>

<script>
const UnfoldEditor = () => import("@/components/UnfoldEditor")
// import UnfoldEditor from '@/components/UnfoldEditor';
import CommentEditor from "@/components/Comment/CommentEditor";
import ImageUpload from "@/components/UploadImage/ImageUpload";
import Spinner from "@/components/Spinner/Spinner";
import {fixMystery} from "assets/js/utils";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";


export default {
  components: {
    CategoryDropdown,
    Spinner,
    ImageUpload,
    UnfoldEditor,
    CommentEditor
  },
  middleware: ['auth', 'loadUsers'],
  async asyncData({params,$axios}){
    const {users} = await $axios.$get('user/')
    if (params.postId){
      const {content,title,preview,img,category, featured, published} = await $axios.$get(`post/${params.postId}/`)
      return {
        users,
        intro:content,
        post:{
          title,
          content,
          preview,
          featured,
          published,
          img:`${$axios.defaults.baseURL}/${img}`
        },
        selectedCategory:category,
        disabled:true,
        previewInput:preview,
        imageUrl:`${$axios.defaults.baseURL}/${img}`
      }
    }
    const intro = `
          <h3>
            Hi there,
          </h3>
          <p>
            You can write here your story!
          </p>
          <ul>
            <li>
              Write something big, or random stories of yours.
            </li>
            <li>
              Make your text interesting by using the tools above.
            </li>
          </ul>
          <blockquote>
            It's like being in a fairytale 👏
            <br />
            – Unfold Team
          </blockquote>
        `
    return {
      users,
      post: {
        title: "",
        content: intro,
        preview: '',
        published: true,
        featured: true,
        img: null
      },
      intro,
      previewInput:''
    }
  },
  data: function () {
    return {
      testy:'old',
      hideSpinner: true,
      disabled: false,
      results: "",
      imageUrl: null,
      selectedCategory: "Select Category 📝",
      categories: [
        'Love 💖',
        'Funny 😂',
        'Poem 🧾',
        'Sci-fi 👾',
        'Horror 👻',
        'Mystery 🕵️‍'
      ],
      validTitle: null,
    }
  },
  mounted() {
    if (!this.$route.params.postId) {
      this.post.content = this.intro;
    }
  },
  methods: {
    checkTitle() {
      this.validTitle = this.post.title ? null : false;
      this.checkDisabled();
    },
    checkDisabled() {
      this.disabled = !!(this.post.title && this.post.preview && this.post.preview !== "<p></p>"
        && !this.selectedCategory.includes('Category'));
      return this.disabled;
    },
    saveDraft() {
      this.published = false;
      this.publish()
    },
    disableByRef() {
      if (this.checkDisabled()) {
        this.$refs.popover.$emit('disable')
      }
    },
    async back() {
      await this.$router.push('/');
    },
    store(event) {
      this.post.content = event;
    },
    storePreview(event) {
      this.post.preview = event.value;
      this.checkDisabled();
    },
    storeImage(image) {
      this.post.img = image;
    },
    publish() {
      this.hideSpinner = false;
      let formData = new FormData();
      let data = {
        title: this.post.title,
        content: this.post.content,
        preview: this.post.preview,
        category: fixMystery(this.selectedCategory).split(" ")[0].toLowerCase().trim(),
        published: this.published,
        featured: this.post.featured
      };
      formData.append('data', JSON.stringify(data));
      if (this.post.img) {
        formData.append('image', this.post.img);
      }

      if (!this.$route.params.postId) { //in case of new post
        this.$axios.$post('/post/', formData, {withCredentials: true})
          .then((response) => {
            let post = response.post;
            this.$router.push(`/${post.id}`)
          })
      } else { //in case of editing existing post
        this.$axios.$put(`/post/${this.$route.params.postId}/`, formData, {withCredentials: true})
          .then(response => {
            this.$router.push(`/${this.$route.params.postId}`)
          })

      }
    }
  }
}
</script>

<style scoped>
.editor-fade{
  transition: ease-in 1s;
}

.container {
  margin: 30px auto;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}

.title {
  margin: 20px 0;
}

.input-group-text {
  background-color: var(--category-input);
  color: var(--soft-primary-text);
}

.input-group {
  width: auto;
}

.container:not(.preview-image) {
  position: relative;
  z-index: 0;
}

#title-input {
  font-family: var(--title-font);
  color: var(--soft-primary-text);
  background-color: var(--bg);
}

.save-buttons {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  margin-top: 20px;
}

.save-buttons > div {
  margin: 0 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
