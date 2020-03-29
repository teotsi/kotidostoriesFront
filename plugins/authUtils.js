import Vue from 'vue'
import axios from "axios";
Vue.prototype.$feedback = (valid_username) => {
  if (valid_username === true) {
    return 'Username is available'
  } else if (valid_username === false) {
    return 'Username is taken'
  } else {
    return ''
  }
};
// Vue.prototype.$checkUsername=(new_username) =>{
//   axios.get('checkUsername/' + new_username)
//     .then(() => {
//         return true
//       }
//     ).catch(() => {
//     return  false
//   })
// }

