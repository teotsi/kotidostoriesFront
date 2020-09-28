<template>
  <div
    v-if="showy"
    class="editor"
  >
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="editor"
    >
      <div class="menubar">
        <p
          v-if="eventName!=='comment'"
          class="preview-title"
        >
          {{ eventMessage }}
        </p>
        <b-button
          id="boldB"
          :class="{ 'is-active': isActive.bold() }"
          class="menubar__button"
          variant="white"
          @click="commands.bold"
        />

        <b-button
          id="italic"
          :class="{ 'is-active': isActive.italic() }"
          class="menubar__button"
          variant="white"
          @click="commands.italic"
        />

        <b-button
          id="underline"
          :class="{ 'is-active': isActive.underline() }"
          class="menubar__button"
          variant="white"
          @click="commands.underline"
        />

        <b-button
          id="bullet_list"
          :class="{ 'is-active': isActive.bullet_list() }"
          class="menubar__button"
          variant="white"
          @click="commands.bullet_list"
        />

        <b-button
          id="undo"
          class="menubar__button"
          variant="white"
          @click="commands.undo"
        />
        <b-button
          id="redo"
          class="menubar__button"
          variant="white"
          @click="commands.redo"
        />
      </div>
    </editor-menu-bar>

    <editor-content
      :editor="editor"
      class="editor__content"
    />
  </div>
</template>

<script>
  import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
  import {Bold, BulletList, History, Italic, Link, ListItem, TodoItem, TodoList, Underline,} from 'tiptap-extensions'

  export default {
    name: 'CommentEditor',
    components: {
      EditorContent,
      EditorMenuBar,
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      eventName: {
        type: String,
        default: 'comment'
      },
      eventMessage: {
        type: String,
        default: 'Preview 👀'
      },
      id: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        editor: null,
        showy:false
      }
    },
    watch: {
      value(val) {
        if (this.editor && !this.editorChange) {
          this.editor.setContent(val, true);
        }
        this.editorChange = false;
      }
    },
    beforeUnmount() {
      this.editor.destroy()
    },
    mounted: function () {
      this.editor = new Editor({
        extensions: [
          new BulletList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Italic(),
          new Underline(),
          new History(),
        ],
        onUpdate: ({getHTML}) => {
          this.editorChange = true;
          this.$emit(`${this.eventName}-input`, {"value": getHTML(), "id": this.id});
          let vm = this.$parent;
          vm.$emit(`${this.eventName}-input`, {"value": getHTML(), "id": this.id});
        },
        content: this.value
      });
      this.showy=true;
    }
  }
</script>
<style lang="scss" scoped>
  $color-black: #000000;
  $color-white: #ffffff;
  $color-grey: #dddddd;


  .editor__content {
    outline: none;
  }

  #boldB, #italic, #underline, #bullet_list, #undo, #redo {

  }

  .preview-title {
    display: inline;
    float: left;
    margin-left: 10px;
    margin-bottom: 0;
    padding-top: 2px;
    color: var(--soft-primary-text);
  }

  #boldB {
    background-image: url("../../assets/images/icons/bold.svg");
  }

  #italic {
    background-image: url("../../assets/images/icons/italic.svg");
  }

  #underline {
    background-image: url("../../assets/images/icons/underline.svg");
  }

  #bullet_list {
    background-image: url("../../assets/images/icons/ul.svg");
  }

  #undo {
    background-image: url("../../assets/images/icons/undo.svg");
  }

  #redo {
    background-image: url("../../assets/images/icons/redo.svg");
  }

  .menubar {
    background: var(--comment-editor-bg);
    border-bottom: 1px solid #ced4da;

    .menubar__button {
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      margin: 5px;
      padding: 1px;
      border-radius: 2px;

      &.is-active {
        background-color: #b1b1b1;
      }

      &:hover {
        background-color: #cecece;
      }

    }
  }

  .editor {
    transition: ease-in;
    position: relative;
    margin: 0 auto 1rem auto;
    border: 1px solid #ced4da;

    &__content {
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      text-align: justify;
      padding: 10px;

      * {
        caret-color: currentColor;
      }

      pre {
        padding: 0.7rem 1rem;
        border-radius: 5px;
        background: $color-black;
        color: $color-white;
        font-size: 0.8rem;
        overflow-x: auto;

        code {
          display: block;
        }
      }

      p code {
        display: inline-block;
        padding: 0 0.4rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: rgba($color-black, 0.1);
        color: rgba($color-black, 0.8);
      }

      ul,
      ol {
        padding-left: 1rem;
      }

      li > p,
      li > ol,
      li > ul {
        margin: 0;
      }

      a {
        color: inherit;
      }

      blockquote {
        border-left: 3px solid rgba($color-black, 0.1);
        color: rgba($color-black, 0.8);
        padding-left: 0.8rem;
        font-style: italic;

        p {
          margin: 0;
        }
      }

      img {
        max-width: 100%;
        border-radius: 3px;
      }

      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;

        td, th {
          min-width: 1em;
          border: 2px solid $color-grey;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;

          > * {
            margin-bottom: 0;
          }
        }

        th {
          font-weight: bold;
          text-align: left;
        }

        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #adf;
          pointer-events: none;
        }
      }

      .tableWrapper {
        margin: 1em 0;
        overflow-x: auto;
      }

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }
    }
  }
</style>
© 2020 GitHub, Inc.
