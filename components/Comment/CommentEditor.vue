<template>
  <div class="editor">

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <b-button
          :class="{ 'is-active': isActive.bold() }"
          variant="white"
          @click="commands.bold"
          class="menubar__button"
          id="boldB"
        >
        </b-button>

        <b-button
          :class="{ 'is-active': isActive.italic() }"
          variant="white"
          @click="commands.italic"
          class="menubar__button"
          id="italic"
        >
        </b-button>

        <b-button
          :class="{ 'is-active': isActive.underline() }"
          variant="white"
          @click="commands.underline"
          class="menubar__button"
          id="underline"
        >
        </b-button>

        <b-button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          variant="white"
          class="menubar__button"
          id="bullet_list"
        >
        </b-button>

        <b-button
          @click="commands.undo"
          class="menubar__button"
          variant="white"
          id="undo"
        >
        </b-button>
        <b-button
          @click="commands.redo"
          class="menubar__button"
          variant="white"
          id="redo"
        >
        </b-button>

      </div>
    </editor-menu-bar>

    <editor-content :editor="editor" class="editor__content"/>
  </div>
</template>

<script>
  import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
  import {
    Bold,
    BulletList,
    History,
    Italic,
    Link,
    ListItem,
    TodoItem,
    TodoList,
    Underline,
  } from 'tiptap-extensions'

  export default {
    name: 'CommentEditor',
    components: {
      EditorContent,
      EditorMenuBar,
    },
    props: {
      value:{
        type: String,
        default:''
      },
      eventName:{
        type:String,
        default: 'comment'
      }
    },
    data() {
      return {
        editor: null
      }
    },
    beforeDestroy() {
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
        onUpdate: ({ getHTML }) => {
          this.editorChange = true;
          this.$emit(`${this.eventName}-input`, getHTML());
        },
        content: this.value
      })
    },
    watch: {
      value(val) {
        if (this.editor && !this.editorChange) {
          this.editor.setContent(val, true);
        }
        this.editorChange = false;
      }
    }
  }
</script>
<style scoped lang="scss">
  $color-black: #000000;
  $color-white: #ffffff;
  $color-grey: #dddddd;


  .editor__content {
    outline: none;
  }
  #boldB {
    background-image: url("../../assets/images/icons/bold.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #italic {
    background-image: url("../../assets/images/icons/italic.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #strike {
    background-image: url("../../assets/images/icons/strike.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #underline {
    background-image: url("../../assets/images/icons/underline.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #code {
    background-image: url("../../assets/images/icons/code.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #paragraph {
    background-image: url("../../assets/images/icons/paragraph.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #bullet_list {
    background-image: url("../../assets/images/icons/ul.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #order_list {
    background-image: url("../../assets/images/icons/ol.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #blockquote {
    background-image: url("../../assets/images/icons/quote.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #code_block {
    background-image: url("../../assets/images/icons/code.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #horizontal {
    background-image: url("../../assets/images/icons/hr.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #undo {
    background-image: url("../../assets/images/icons/undo.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  #redo {
    background-image: url("../../assets/images/icons/redo.svg");
    background-repeat: no-repeat;
    height: 1rem;
    width: 1rem;
  }

  .editor {
    position: relative;
    margin: 0 auto 1rem auto;
    border: 1px solid var(--soft-black);

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
