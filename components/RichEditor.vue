<template>
  <transition name="fade">
  <ckeditor
    :editor="editor"
    :value="value"
    :config="editorConfig"
    :v-model="this.editorData"
    @input="ev => $emit('input', ev)"
  />
  </transition>
</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-vue'
  import UnfoldEditor from '@teotsi/unfold-ckeditor'
  import {loadUsers} from "../assets/js/utils";
  import axios from "axios";

  export default {
    name: 'RichEditor',
    props: {
      value: [String],
      options: {
        type: [Object],
        default: () => {}
      },
      intro:{
        type: String,
        default:`
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
        editorData: '<p>Content of the editor.</p>',
      }
    },
    computed:{
      users(){
        axios.get('http://localhost:5000/user/')
          .then(response=> {
            console.log(response);
            return response.data.users;
          })
      }
    }
  }
</script>

<style>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
