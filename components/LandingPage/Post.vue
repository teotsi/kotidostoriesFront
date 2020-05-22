<template>
  <div class="post-details">
    <nuxt-link :to="`/${id}/${slug}`" id="link">
      <div class="content-image">
        <b-img :src="img+'#'+new Date().getTime()" class="post-img" fluid-grow/>
      </div>
      <div class="shadowclass">
        <div class="content-title">
          <h2>{{title}}</h2>
        </div>
        <div class="content-preview">
          <div v-html="preview">
          </div>
          <!--        <p>{{truncate(preview, 'preview')}}</p>-->
        </div>

        <div class="footer-container">
          <div class="content-footer">
            <div class="user-info">
              <b-icon class="user-small-img" icon="person-fill"></b-icon>
              <span style="font-size: 16px;color: #fff;">{{user}}</span>
            </div>
            <span class="pull-right">
                <a data-placement="left" data-toggle="tooltip" href="#" title="Comments">
                  <font-awesome-icon :icon="['far', 'comments']"/>{{comments}}</a>
                <a data-placement="right" data-toggle="tooltip" href="#" title="Loved">
                   <font-awesome-icon :icon="['far', 'heart']"/>
                   {{reactions}}</a>
                </span>
          </div>

        </div>

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
        default: 'http://localhost:5000/post/default.jpg'
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

  .shadowclass{
    /*text-align: center;*/
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
    background-color: #fff;
    text-align: center;
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content-title h2 {
    vertical-align: middle;

    font-size: 24px;
    font-family: var(--title-font);
    color: var(--soft-black);
  }

  .content-title, .content-preview {
    background-color: white;
    width: 80%;
  }

  .content-title {
    display: inline-block;
    margin: -2rem 10% 0 10%;
  }

  .content-preview {
    min-height: 80px;
    max-height: 3rem;
    align-items: center;
    padding: 5px;
    text-align: center;
    color: #7F828B;
    margin: auto;
  }

  .content-preview div, .content-title h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .content-preview div {
    -webkit-line-clamp: 3;
  }

  .content-title h2 {
    -webkit-line-clamp: 2;
  }


  .content-footer {
    background-color: #950ca0;
    padding: 10px;
    position: relative;
    width: 80%;
    display: flex;
    justify-content: space-between;
  }

  .content-footer::before {
    content: '';
    position: absolute;
    width: 95.5%;
    height: 3px;
    bottom: 0;
    left: 8px;
    z-index: -1;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
  }

  .footer-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .pull-right {
    float: right;
  }
</style>
