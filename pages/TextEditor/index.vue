<template>
  <div class="container">
    <rich-editor></rich-editor>
    <div class="save__buttons">
      <b-button variant="outline-danger">Cancel</b-button>
      <b-button>Publish</b-button>
      <b-button id="buttonSave">Save</b-button>
    </div>
  </div>
</template>

<script>
import RichEditor from '../../components/RichEditor';

export default {
  components: {
    RichEditor
  },
  middleware:'redirectLogin'
}
</script>

<style>
.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 100px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
