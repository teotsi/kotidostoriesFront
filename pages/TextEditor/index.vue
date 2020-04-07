<template>
  <div class="container">
    <p>This is Unfold's Editor! Here you can start working on new projects, or improve your previous work. You can also
      save your project until you are ready to publish it.
      If you need any help, check out our
      <nuxt-link to="/help">Getting started</nuxt-link>
      guide. Happy writing!
    </p>
    <rich-editor></rich-editor>
    <div class="save_buttons">
      <b-button variant="outline-danger">Cancel</b-button>
      <b-button
        :disabled="!this.$auth.loggedIn">Publish
      </b-button>
      <b-button :disabled="!this.$auth.loggedIn"
                id="buttonSave"
      >Save
      </b-button>
    </div>
  </div>
</template>

<script>
  import RichEditor from '../../components/RichEditor';

  export default {
    components: {
      RichEditor
    },
    middleware: 'redirectLogin'
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


  .save_buttons {
    padding-top: 10px;
  }
</style>
