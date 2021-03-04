<template>
  <unfold-editor
    :value="value"
    @input="ev => $emit('input', ev)"
    :default-toolbar="[
      'heading',
      '|',
			'bold',
			'italic',
			'bulletedList',
			'|',
			'undo',
			'redo',]"
    class="comment-editor"
  />
</template>

<script>
import UnfoldEditor from "~/components/UnfoldEditor";

export default {
  name: "CommentEditor",
  components: {UnfoldEditor},
  props: {
    value:{
      type: String,
      default:''
    }
  }
}
</script>

<style scoped>

</style>
