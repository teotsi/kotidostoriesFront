
export default (({app}) =>{
  app.filterInPlace = (a, condition) =>{
    let j = 0;

    a.forEach((e, i) => {
      if (condition.call(thisArg, e, i, a)) {
        if (i!==j) a[j] = e;
        j++;
      }
    });

    a.length = j;
    return a;
  }
})

// Vue.prototype.$checkUsername=(new_username) =>{
//   axios.get('checkUsername/' + new_username)
//     .then(() => {
//         return true
//       }
//     ).catch(() => {
//     return  false
//   })
// }

