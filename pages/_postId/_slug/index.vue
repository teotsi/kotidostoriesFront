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
      console.log(this.$route.params)
      if (this.$route.params.slug === undefined) {
        if (!url.endsWith('/')) {
          url += '/'
        }
        url+=this.slug
      }
      history.replaceState({}, this.title, url) // or use your own application logic: globalSiteUrl, $route... or queryString some vars...

    }
  }
</script>
