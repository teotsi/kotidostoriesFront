import Vue from 'vue'
import {config, library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faLaugh} from '@fortawesome/free-solid-svg-icons/faLaugh'
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faClipboard} from "@fortawesome/free-solid-svg-icons/faClipboard";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faLightbulb} from "@fortawesome/free-solid-svg-icons/faLightbulb";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faLaugh as farLaugh} from '@fortawesome/free-regular-svg-icons/faLaugh'
import {faComments} from "@fortawesome/free-regular-svg-icons/faComments";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faLightbulb as farLightbulb} from "@fortawesome/free-regular-svg-icons/faLightbulb";
import {faThumbsUp as farThumbsUp} from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook'
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faMoon, faSun, faClipboard, faEnvelope, faHeart, faLightbulb, faThumbsUp, faLaugh)
library.add(faComments, farHeart, farLightbulb, farThumbsUp, farLaugh)
library.add(faFacebook, faTwitter)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
