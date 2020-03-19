import axios from "axios";

export default function ({query, store, redirect}) {
  let token = query.token;
  if (token) {
    store.commit('SET_TOKEN', token);
    axios.post('http://localhost:5000/verifyToken/', {'token': token})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        store.commit('SET_VALID_TOKEN', false);
        console.log('commit')
      })
  }
}
