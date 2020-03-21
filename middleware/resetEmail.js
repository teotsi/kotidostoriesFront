import axios from "axios";

export  default async function ({query, store, redirect}) {
  let token = query.token;
  if (token) {
    store.commit('SET_TOKEN', token);
    return axios.post('http://localhost:5000/verifyToken/', {'token': token}, {errorHandle: false})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        store.commit('SET_VALID_TOKEN', false);
        console.log('commit')
      })
  }else{
    store.commit('SET_VALID_TOKEN', false);
  }
}
