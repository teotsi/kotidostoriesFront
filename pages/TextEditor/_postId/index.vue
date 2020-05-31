<template>
  <transition name="fade">
    <div class="container">
      <p>This is Unfold's Editor! Here you can start working on new projects, or improve your previous work. You can
        also
        save your project until you are ready to publish it.
        If you need any help, check out our
        <nuxt-link to="/help">Getting started</nuxt-link>
        guide. Happy writing!
      </p>

      <image-upload :image-url="imageUrl"
                    caption="Choose an image for your story!"
                    v-on:image-upload="storeImage"/>

      <div class="title">
        <b-input-group class="mt-3" prepend="Title 📕">
          <b-form-input
            :state="validTitle"
            @input="checkTitle"
            id="title-input"
            placeholder="Enter a title!"
            v-model="post.title"></b-form-input>
        </b-input-group>
      </div>
      <comment-editor :value="previewInput"
                      eventName="preview"
                      v-on:preview-input="storePreview"/>
      <unfold-editor :intro="intro" v-on:input="store"/>
      <div class="save-buttons">
        <b-input-group prepend="Featured?">
          <b-input-group-append is-text>
            <b-form-checkbox :value="true" v-model="post.featured"/>
          </b-input-group-append>
        </b-input-group>

        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text variant="light">{{`${selectedCategory} ` }}</b-input-group-text>
          </template>

          <template v-slot:append>
            <b-dropdown text=" " variant="light-dropdown">
              <b-dropdown-item
                :key="`category-${index}`"
                @click="disableByRef(category)"
                href="#"
                v-for="(category, index) in categories">{{category}}
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-input-group>

        <b-dropdown :disabled="!disabled"
                    @click="publish"
                    id="popover-target-1"
                    split
                    text="Publish!" variant="light-dropdown">
          <b-dropdown-item @click="saveDraft" href="#">Save draft</b-dropdown-item>
        </b-dropdown>
        <b-popover
          :disabled.sync="disabled"
          placement="top"
          ref="popover"
          target="popover-target-1" triggers="hover">
          You have to select a category <i>and</i> a title first!
        </b-popover>
        <b-button @click="back" variant="outline-danger">Cancel</b-button>
        <spinner :hide-spinner="hideSpinner" label="Posting story..."/>
      </div>
    </div>
  </transition>
</template>

<script>
  import UnfoldEditor from '../../../components/UnfoldEditor';
  import CommentEditor from "../../../components/Comment/CommentEditor";
  import ImageUpload from "../../../components/UploadImage/ImageUpload";
  import Spinner from "../../../components/Spinner/Spinner";
  import {fixMystery} from "../../../assets/js/utils";


  export default {
    components: {
      Spinner,
      ImageUpload,
      UnfoldEditor,
      CommentEditor
    },
    methods: {
      checkTitle() {
        if (this.post.title) {
          this.validTitle = null;
        } else {
          this.validTitle = false
        }
        this.checkDisabled();
      },
      checkDisabled() {
        console.log(this.post.preview === "<p></p>");
        this.disabled = !!(this.post.title && this.post.preview && this.post.preview !== "<p></p>" & !this.selectedCategory.includes('Category'));
        return this.disabled;
      },
      saveDraft() {
        this.published = false;
        this.publish()
      },
      disableByRef(category) {
        this.selectedCategory = category;
        if (this.checkDisabled()) {
          this.$refs.popover.$emit('disable')
        }
      },
      back() {
        this.$router.push('/');
      },
      store(event) {
        this.post.content = event;
      },
      storePreview(event) {
        this.post.preview = event.value;
        this.checkDisabled();
      },
      storeImage(image) {
        this.post.image = image;
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
        if (this.post.image) {
          formData.append('image', this.post.image);
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
    },
    middleware: ['redirectLogin', 'loadUsers'],
    data: function () {
      return {
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
        intro: `
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
        `,
        post: {
          title: "",
          content: this.intro,
          preview: this.previewInput,
          published: true,
          featured: true,
          image: null
        },
        previewInput: ``
      }
    },
    mounted() {
      if (this.$route.params.postId) {
        this.$axios.$get(`post/${this.$route.params.postId}`)
          .then(response => {
            this.intro = this.post.content = response.content;
            this.post.title = response.title;
            this.disabled = true;
            this.previewInput = response.preview;
            this.imageUrl = `${this.$axios.defaults.baseURL}/${response.img}`;
            for (let category of this.categories) {
              if (category.toLowerCase().startsWith(response.category)) {
                this.selectedCategory = category;
                break;
              }
            }
          })
      } else {
        this.post.content = this.intro;
      }
    }
  }
</script>

<style scoped>
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
