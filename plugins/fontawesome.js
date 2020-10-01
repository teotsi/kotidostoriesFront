import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon,faSun,faClipboard, faEnvelope, faHeart, faLightbulb, faThumbsUp, faLaugh} from '@fortawesome/free-solid-svg-icons'
import { faComments, faHeart as farHeart, faLightbulb as farLightbulb, faThumbsUp as farThumbsUp, faLaugh as farLaugh} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faMoon,faSun,faClipboard, faEnvelope,  faHeart, faLightbulb, faThumbsUp, faLaugh)
library.add(faComments, farHeart, farLightbulb,farThumbsUp, farLaugh)
library.add(faFacebook, faTwitter)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
