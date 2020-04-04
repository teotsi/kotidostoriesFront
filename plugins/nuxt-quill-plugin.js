import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'
var Font = Quill.import('formats/font');
var SizeStyle = Quill.import('attributors/style/size');

Font.whitelist = ['mirza', 'roboto', 'inconsolata','monospace'];
Quill.register(Font, true);
Quill.register(SizeStyle, true);

Vue.use(VueQuillEditor)
