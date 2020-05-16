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
      <div class="image-wrapper">
        <div class="preview-image">
          <img :src="imageUrl" alt="selected image" id="post-image" v-if="imageUrl">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text accept="image/jpeg, image/png, image/gif" variant="light">Image 📷
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-file
              @change="previewImage"
              drop-placeholder="Drop image here..."
              placeholder="Choose an image for your story!"
              v-model="post.image"
            />
          </b-input-group>
        </div>
      </div>


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
      <comment-editor eventName="preview"
                      :value="previewInput"
                      v-on:preview-input="storePreview"/>
      <unfold-editor :intro="intro" v-on:input="store"/>
      <div class="save-buttons">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text variant="light">{{`${selectedCategory} ` }}</b-input-group-text>
          </template>

          <template v-slot:append>
            <b-dropdown text=" ">
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
                    split text="Publish!">
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

      </div>
    </div>
  </transition>
</template>

<script>
  import UnfoldEditor from '../../../components/UnfoldEditor';
  import CommentEditor from "../../../components/Comment/CommentEditor";


  export default {
    components: {
      UnfoldEditor,
      CommentEditor
    },
    methods: {
      previewImage(event) {
        if (event.target.files[0]) {
          const file = event.target.files[0];
          this.imageUrl = URL.createObjectURL(file);
        }

      },
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
        this.post.preview = event;
        this.checkDisabled();
      },
      publish() {
        let formData = new FormData();
        let data = {
          title: this.post.title,
          content: this.post.content,
          preview: this.post.preview,
          category: this.selectedCategory.slice(0, -2).toLowerCase().trim(),
          published: this.published
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
        disabled: false,
        results: "",
        imageUrl: null,
        selectedCategory: "Select Category 📝",
        categories: [
          'Love 💖',
          'Funny 😂',
          'Poem 🧾',
          'Sci-fi 👾',
          'Horror 👻'
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
              Write something big, or random sories of yours.
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
          image: null
        },
        previewInput: ``

      }
    },
    mounted() {
      if (this.$route.params.postId) {
        this.$axios.$get(`http://localhost:5000/post/${this.$route.params.postId}`)
          .then(response => {
            this.intro = this.post.content = response.content;
            this.post.title = response.title;
            this.disabled = true;
            this.imageUrl = `http://localhost:5000/${response.img}`;
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

<style>
  .container {
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20px;
  }

  .title {
    margin: 20px 0;
  }

  .input-group-text {
    background-color: inherit;
  }

  .input-group {
    width: auto;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
  }

  .preview-image {
    text-align: center;
    width: 50%;
  }


  .container:not(.preview-image) {
    position: relative;
    z-index: 0;
  }

  #post-image {
    z-index: 5;
    position: relative;
    margin: 20px auto;
    max-width: 100%;
    max-height: 250px;
    transition: ease 0.5s;
    box-shadow: var(--soft-shadow);
  }

  #post-image:hover {
    transform: scale(1.5);
    transition: ease 0.5s;
  }

  #title-input {
    font-family: var(--title-font);
  }

  .save-buttons {
    display: flex;
    justify-content: center;
    padding-top: 10px;
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
