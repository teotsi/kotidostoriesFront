<template>
  <div class="post-details">
    <div v-b-modal="id">
      <!-- <nuxt-link :to="`/${id}/${slug}`" id="link"> -->
      <div class="content-image">
        <b-img
          :src="img+'#'+new Date().getTime()"
          class="post-img"
          fluid-grow
        />
      </div>
      <div class="shadowclass">
        <div class="content-title">
          <h2>{{ title }}</h2>
        </div>
        <div class="content-preview">
          <div v-html="preview" />
        </div>

        <post-footer
          :comments="comments"
          :reactions="reactions"
          :user="user"
        />
      </div>
      <!-- </nuxt-link> -->
    </div>
    <PostPreviewModalComponent
      :id="id"
      :comments="comments"
      :img="img"
      :preview="preview"
      :reactions="reactions"
      :length="estimatedTime"
      :title="title"
      :user="user"
      :user-img="userImg"
    />
  </div>
</template>

<script>
  import {truncate} from "assets/js/utils";
  import PostPreviewModalComponent from "../PostPreview/PostPreviewModalComponent"
  import PostFooter from "@/components/LandingPage/PostFooter";

  export default {
    components: {
      PostFooter,
      PostPreviewModalComponent
    },
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
      userImg:{
        type:String,
        default: 'http://localhost:5000/profile/default.png'
      },
      img: {
        type: String,
        default: 'http://localhost:5000/post/default.jpg'
      },
      comments: Number,
      reactions: Number,
      slug: String,
      estimatedTime: Number
    },
    methods: {
      truncate(str, type) {
        return truncate(str, type);
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  @media (min-width: 1200px) {
    .post-details {
      width: 30%;
    }

  }

  .shadowclass {
    /*TextEditor-align: center;*/
    /*-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);*/
    /*-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);*/
    /*box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);*/
  }

  .content-image {
    order: -1;
  }

  .post-img {
    height: 250px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: black;
  }


  .content-title {
    /*padding: 5px;*/
    text-align: center;
    height: 56px;
    flex-direction: column;
    justify-content: center;
    display: inline-block;
    margin: -2rem 10% 0 10%;

    h2 {
      vertical-align: middle;
      font-size: 24px;
      font-family: var(--title-font);
      color: var(--soft-primary-text);
      -webkit-line-clamp: 2;
    }

  }

  .content-title, .content-preview {
    background-color: var(--bg);
    width: 80%;
  }

  .content-preview {
    min-height: 80px;
    max-height: 3rem;
    align-items: center;
    padding: 5px;
    text-align: center;
    color: var(--preview-color);
    margin: auto;

    div {
      -webkit-line-clamp: 3;
    }
  }

  .content-preview div, .content-title h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

</style>
