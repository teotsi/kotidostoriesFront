<template>
  <transition name="fade">
    <ckeditor
      :config="editorConfig"
      :editor="editor"
      :value="intro"
      @input="ev => $emit('input', ev)"
    />
  </transition>
</template>

<script>
  import SpinnerPlaceholder from "./SpinnerPlaceholder/SpinnerPlaceholder";

  let UnfoldEditor;
  let CKEditor;
  if (process.client) {
    UnfoldEditor = require('@teotsi/unfold-ckeditor');
    CKEditor = require("@ckeditor/ckeditor5-vue");
  } else {
    CKEditor = { component: SpinnerPlaceholder};
  }

  export default {
    name: 'UnfoldEditor',
    props: {
      value: [String],
      options: {
        type: [Object],
        default: () => {
        }
      },
      intro: {
        type: String,
        default: `
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
      }
    },
    components: {
      ckeditor: CKEditor.component
    },
    data() {
      return {
        editor: UnfoldEditor,
        editorConfig: {
          mention: {
            feeds: [
              {
                marker: '@',
                feed: this.users,
                minimumCharacters: 1
              }
            ]
          }
        },
        editorData: this.intro,
      }
    },
    computed: {
      async users() {
        const userResponse = this.$axios.get('user/')
        console.log(userResponse);
        return userResponse.data.users;
      }
    },
    mounted() {
      this.value = this.intro;
      this.$emit('input', this.value)
    }
  }
</script>

<style>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
