import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'roboto', 'inconsolata','monospace'];
Quill.register(Font, true);
Vue.use(VueQuillEditor)
