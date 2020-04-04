<template>
  <section class="container">
    <client-only>
      <div id="toolbar-container">
    <span class="ql-formats">
      <select class="ql-font">
        <option selected>Sans Serif</option>
        <option value="inconsolata">Inconsolata</option>
        <option value="roboto">Roboto</option>
        <option value="mirza">Mirza</option>
        <option value="arial">Arial</option>
      </select>

      <select class="ql-size">
      <option value="10px">Small</option>
      <option selected value="16px">Normal</option>
      <option value="18px">Large</option>
      <option value="32px">Huge</option>
      </select>

    </span>
        <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
        <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
        <span class="ql-formats">
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
      <button class="ql-link"></button>
    </span>
        <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
    </span>
        <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
        <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span>
        <span class="ql-formats">
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </span>
        <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>

      </div>
      <quill-editor
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        ref="editor"
        v-model="content"
      />
    </client-only>
  </section>
</template>

<script>
  export default {
    name: 'editor',
    data() {
      return {
        content: `
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
        editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
            toolbar: '#toolbar-container'
          }
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    }
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Mirza');
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');
  /* Set default font-family */

  /* Set dropdown font-families */
  #toolbar-container .ql-font span[data-label="Montserrat"]::before {
    font-family: "Montserrat";
  }

  #toolbar-container .ql-font span[data-label="Mirza"]::before {
    font-family: "Mirza";
  }

  #toolbar-container .ql-font span[data-label="Roboto"]::before {
    font-family: "Roboto";
  }

  #toolbar-container .ql-font span[data-label="Inconsolata"]::before {
    font-family: "Inconsolata";
  }

  /* Set content font-families */
  .ql-font-mirza {
    font-family: "Mirza";
  }

  .ql-font-roboto {
    font-family: "Roboto";
  }

  .ql-font-inconsolata {
    font-family: "Inconsolata";
  }
</style>
