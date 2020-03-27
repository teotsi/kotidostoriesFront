<template xmlns="http://www.w3.org/1999/html">
  <section id="editoPage">
    <div class="editor">
      <div>
        <p align="center"><b>
          Write your story!
        </b>
        </p>
      </div>
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
            :class="{ 'is-active': isActive.strike() }"
            variant="white"
            @click="commands.strike"
            class="menubar__button"
            id="strike"
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
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
            variant="white"
            class="menubar__button"
            id="code"
          >
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
            variant="white"
            class="menubar__button"
            id="paragraph"
          >
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            variant="white"
            class="menubar__button"
          >
            H1
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            variant="white"
            class="menubar__button"
          >
            H2
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            variant="white"
            class="menubar__button"
          >
            H3
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
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
            variant="white"
            class="menubar__button"
            id="order_list"
          >
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
            variant="white"
            class="menubar__button"
            id="blockquote"
          >
          </b-button>

          <b-button
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
            variant="white"
            class="menubar__button"
            id="code_block"
          >
          </b-button>

          <b-button
            @click="commands.horizontal_rule"
            class="menubar__button"
            variant="white"
            id="horizontal"
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
      <div class="save__buttons">
        <b-button variant="outline-danger">Cancel</b-button>
        <b-button>Publish</b-button>
        <b-button id="buttonSave">Save</b-button>
      </div>
    </div>
  </section>
</template>

<script>
  import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
  import {
    Blockquote,
    Bold,
    BulletList,
    Code,
    CodeBlock,
    HardBreak,
    Heading,
    History,
    HorizontalRule,
    Italic,
    Link,
    ListItem,
    OrderedList,
    Strike,
    TodoItem,
    TodoList,
    Underline,
  } from 'tiptap-extensions'

  export default {
    components: {
      EditorContent,
      EditorMenuBar,
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
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({levels: [1, 2, 3]}),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
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
      })
    }
  }
</script>

<style lang="scss">
  $color-black: #000000;
  $color-white: #ffffff;
  $color-grey: #dddddd;

  #editoPage{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #boldB{
    background-image: url("../../assets/images/icons/bold.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #italic{
    background-image: url("../../assets/images/icons/italic.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #strike{
    background-image: url("../../assets/images/icons/strike.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #underline{
    background-image: url("../../assets/images/icons/underline.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #code{
    background-image: url("../../assets/images/icons/code.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #paragraph{
    background-image: url("../../assets/images/icons/paragraph.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #bullet_list{
    background-image: url("../../assets/images/icons/ul.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #order_list{
    background-image: url("../../assets/images/icons/ol.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #blockquote{
    background-image: url("../../assets/images/icons/quote.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #code_block{
    background-image: url("../../assets/images/icons/code.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #horizontal{
    background-image: url("../../assets/images/icons/hr.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #undo{
    background-image: url("../../assets/images/icons/undo.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  #redo{
    background-image: url("../../assets/images/icons/redo.svg");
    background-repeat: no-repeat;
    height: 1.3rem;
    width: 1.3rem;
  }
  .editor {
    position: relative;
    max-width: 50rem;
    margin: 0 auto 5rem auto;

    &__content {

      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;

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
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .column-resize-handle {
          position: absolute;
          right: -2px; top: 0; bottom: 0;
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
