<template>
  <div class="grid-wrapper">
    <div class="content-container">
      <h1 class="title">{{post.title}} <span class="inline">by <nuxt-link :to="'user/'+ post.user.username">{{post.user.username}} </nuxt-link> </span></h1>
      <div class="image-container">
        <img :src="'http://localhost:5000/'+post.img" class="main-image" alt="Story image">
      </div>

      <div class="main-text" v-html="post.content"></div>
    </div>

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
            post: res.data
          }
        })

    },
    mounted() {
      //weird solution to add slug on url, if there's such a need
      addSlug(this.$route.params, this.slug);
    }
  }
</script>

<style>
  .inline {
    font-weight: normal;
  }

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .content-container {
    max-width: 600px;
    padding: 0 15px;

    grid-column:1;
    border-radius: 10px;
    /*box-shadow: var(--soft-shadow);*/
    margin: 20px auto;
  }

  .image-container{
    width: 100%;
    box-shadow: var(--soft-shadow);
    margin: 10px 0;
  }

  .main-image {
    max-width:100%;
    max-height:100%;
    width: 100%;
  }

  .title {
    font-family: var(--title-font);
    color: var(--soft-black);
  }

  .main-text {
    text-align: justify;
  }

  .story-form {
    width: 100%;
  }

  .email-button-container {
    height: 42px !important;
    width: 100px !important;
  }

  @media (min-width: 800px) {
    .grid-wrapper{
      grid-template-columns: 32% 36% 32%;
    }
    .content-container{
      grid-column: 2/3;
      max-width: initial;
    }
  }
</style>
