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
      <rich-editor v-on:input="store"></rich-editor>
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

        <b-dropdown :disabled="!disabled" @click="publish" id="popover-target-1" split text="Publish!">
          <b-dropdown-item @click="saveDraft" href="#">Save draft</b-dropdown-item>
        </b-dropdown>
        <b-popover
          :disabled.sync="disabled"
          placement="top"
          ref="popover"
          target="popover-target-1" triggers="hover">
          You have to select a category first!
        </b-popover>
        <b-button @click="back" variant="outline-danger">Cancel</b-button>

      </div>
    </div>
  </transition>
</template>

<script>
  import RichEditor from '../../../components/RichEditor';

  export default {
    components: {
      RichEditor
    },
    methods: {
      saveDraft() {
        this.published = false;
        this.publish()
      },
      disableByRef(category) {
        this.disabled = true;
        console.log(this.disabled);
        this.selectedCategory = category;
        this.$refs.popover.$emit('disable')
      },
      back() {
        this.$router.push('/');
      },
      store(event) {
        this.post.content = event
      },
      publish() {
        if (!this.$route.params.postId) {
          let data = {
            title: this.post.title.trim(),
            content: this.post.content,
            preview: "Yeah, this is just another placeholder tbemh",
            category: this.selectedCategory.slice(0, -2).toLowerCase().trim(),
            published: this.published
          };
          this.$axios.$post('/post/', data, {withCredentials: true})
            .then((response) => {
              let post = response.post;
              this.$router.push(`/${post.id}`)
            })
        }
      }
    },
    middleware: ['redirectLogin', 'loadUsers'],
    data: function () {
      return {
        post: {
          title: "",
          content: "",
          preview: "",
          published: true,
        },
        disabled: false,
        results: "",
        selectedCategory: "Select Category 📝",
        categories: [
          'Love 💖',
          'Funny 😂',
          'Poem 🧾',
          'Sci-fi 👾',
          'Horror 👻'
        ],
        validTitle: null
      }
    },
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
    margin: 20px;
  }

  .input-group-text {
    background-color: inherit;
  }

  .input-group {
    width: auto;
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
