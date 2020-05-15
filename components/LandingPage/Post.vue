<template>
  <div class="post-details">
    <nuxt-link :to="`${id}/${slug}`" id="link">
      <div class="content-image">
        <b-img :src="img+'#'+new Date().getTime()" class="post-img" fluid-grow/>
      </div>
      <div class="content-title">
        <h2>{{title}}</h2>
      </div>
      <div class="content-preview">
        <div v-html="preview">
        </div>
        <!--        <p>{{truncate(preview, 'preview')}}</p>-->
      </div>
      <div class="content-footer">
        <b-icon class="user-small-img" icon="person-fill"></b-icon>
        <span style="font-size: 16px;color: #fff;">{{user}}</span>
        <span class="pull-right">
              <a data-placement="left" data-toggle="tooltip" href="#" title="Comments">
                <font-awesome-icon :icon="['far', 'comments']"/>{{comments}}</a>
              <a data-placement="right" data-toggle="tooltip" href="#" title="Loved">
                 <font-awesome-icon :icon="['far', 'heart']"/>
                 {{reactions}}</a>
              </span>
      </div>

    </nuxt-link>

  </div>
</template>

<script>
  import {truncate} from "../../assets/js/utils";

  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      preview: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      user: {
        type: String,
        required: true
      },
      img: {
        type: String,
        default: 'http://localhost:5000/post/default.png'
      },
      comments: Number,
      reactions: Number,
      slug: String
    },
    methods: {
      truncate(str, type) {
        return truncate(str, type);
      }
    }
  }
</script>

<style scoped>
  .post-details {
    width: 100%;
    /*height: 430px;*/
    margin: 30px 15px;
    /*-webkit-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);*/
    /*-moz-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);*/
    /*box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);*/
  }

  @media (min-width: 800px) {
    .post-details {
      width: 45%;
    }
  }

  @media (min-width: 1200px ) {
    .post-details {
      width: 30%;
    }

  }

  .content-image {
    order: -1;
  }

  .post-img {
    height: 250px;
    object-fit: cover;
  }

  .content-preview {
    /*max-height: 80px;*/
    min-height: 80px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .content-title {
    /*padding: 5px;*/
    background-color: #fff;
    text-align: center;
  }

  .content-title h2 {
    font-family: var(--title-font);
    color: var(--soft-black);
  }

  .content-preview {
    align-items: center;
    padding: 5px;
    background-color: #fff;
    text-align: center;
    color: #7F828B;
    width: 80%;
    margin: auto;
  }

  .content-preview div, .content-title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .content-title {
    display: inline-block;
    background-color: white;
    width: 80%;
    margin: 0 10%;
    margin-top: -2rem;
  }

  .content-footer {
    background-color: #950ca0;
    padding: 10px;
    position: relative;
    width: 60%;
    margin: auto;
  }

  .pull-right {
    float: right;
  }
</style>
