<template>
  <ckeditor
    :editor="editor"
    :value="value"
    :config="editorConfig"
    @input="ev => $emit('input', ev)"
  />
</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-vue'
  import UnfoldEditor from '@teotsi/unfold-ckeditor'

  export default {
    name: 'RichEditor',
    props: {
      value: [String],
      options: {
        type: [Object],
        default: () => {}
      }
    },
    components: {
      ckeditor: CKEditor.component
    },
    data() {
      return {
        editor: UnfoldEditor,
        editorConfig: this.options,
      }
    }
  }
</script>
