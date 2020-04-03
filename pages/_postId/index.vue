<template>
  <div>
    <h1>Hey</h1>
        <h1>{{title}}</h1>
    <!--    <p>{{preview}}</p>-->
    <!--    <p>{{user_id}}</p>-->
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    asyncData({params}) {
      return axios.get(`http://localhost:5000/post/${params.postId}`)
        .then((res) => {
          return {title: res.data.title}
        })

    }
  }
</script>
