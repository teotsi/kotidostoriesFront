<template>
  <ckeditor
    v-if="showy"
    :config="editorConfig"
    :editor="editor"
    :value="value"
    class="editor-fade"
    @input="ev => $emit('input', ev)"
  />
  <spinner-placeholder v-else/>
</template>

<script>
import SpinnerPlaceholder from "../components/SpinnerPlaceholder/SpinnerPlaceholder";

let UnfoldEditor;
let CKEditor;
if (process.client) {
  UnfoldEditor = require('@teotsi/unfold-ckeditor');
  CKEditor = require("@ckeditor/ckeditor5-vue");
} else {
  CKEditor = {component: SpinnerPlaceholder};
}

export default {
  name: 'UnfoldEditor',
  components: {
    SpinnerPlaceholder,
    ckeditor: CKEditor.component
  },
  props: {
    value: {
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
        `
    },
    defaultToolbar: {
      type: Array,
    },
    users: {
      type: Array,
      default: () => []
    }
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
        },
        toolbar: this.defaultToolbar
      },
      editorData: this.value,
      showy: false
    }
  },
  mounted() {
    this.editorConfig.toolbar = (this.defaultToolbar || UnfoldEditor.defaultConfig)
    this.showy = true;
  }
}
</script>

<style scoped>
</style>
