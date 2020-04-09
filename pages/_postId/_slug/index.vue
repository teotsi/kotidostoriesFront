<template>
  <div>
    <h1>Hey</h1>
    <h1>{{title}}</h1>
    <div v-html="content"></div>
    <!--    <p>{{user_id}}</p>-->
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    asyncData({params}) {
      return axios.get(`http://localhost:5000/post/${params.postId}`)
        .then((res) => {
          return {
            title: res.data.title,
            content: res.data.content,
            slug: res.data.slug
          }
        })

    },
    mounted() {
      //weird solution to add slug on url, if there's such a need
      let url = window.location.toString();
      if (this.$route.params.slug === undefined) {
        if (!url.endsWith('/')) { //checking if the url already has /
          url += '/'
        }
        url+=this.slug
      }
      history.replaceState({}, this.title, url) // replacing the url without reloading the page

    }
  }
</script>
