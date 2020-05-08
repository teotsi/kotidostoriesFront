import axios from "axios";

export default async function ({store}) {
  console.log("load")
  axios.get('http://localhost:5000/user/')
    .then(response=> {
      store.commit('SET_USERS', response.data.users)
    })
}
