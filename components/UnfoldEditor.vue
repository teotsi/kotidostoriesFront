<template>
    <ckeditor
      v-if="showy"
      class="editor-fade"
      :config="editorConfig"
      :editor="editor"
      :value="intro"
      @input="ev => $emit('input', ev)"
    />
</template>

<script>
  import SpinnerPlaceholder from "../components/SpinnerPlaceholder/SpinnerPlaceholder";

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
        showy:false
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
      this.showy = true;
      this.value = this.intro;
      this.$emit('input', this.value)
    }
  }
</script>

<style scoped>
</style>
