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
  import {addSlug} from "../../../assets/js/utils";

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
      addSlug(this.$route.params,this.slug);
    }
  }
</script>

<style>
  .email-button-container {
    height: 42px!important;
    width: 100px!important;
  }
</style>
