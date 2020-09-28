<template>
  <b-modal
    :id="id"
    body-bg-variant="modal"
    footer-bg-variant="modal"
    header-bg-variant="modal"
    header-text-variant="info"
    size="xl"
  >
    <div class="image-container">
      <b-img
        :src="img+'#'+new Date().getTime()"
        class="post-img"
        fluid-grow
      />
    </div>
    <div class="preview-container">
      <h1
        class="modal-title"
        v-html="title"
      >
        <span class="inline">by </span>
      </h1>
      <div class="author-details">
        <p>
          by
          <nuxt-link
            :to="`/user/${user}`"
            no-prefetch
          >
            {{ user }}
          </nuxt-link>
        </p>
        <nuxt-link
          :to="`/user/${user}`"
          no-prefetch
        >
          <div class="author-image">
            <img
              :src="`${$axios.defaults.baseURL}${userImg}#${new Date().getTime()}`"
              alt="User image"
            >
          </div>
        </nuxt-link>
      </div>
    </div>
    <div
      class="modal-preview"
      v-html="preview"
    />
    <div class="info-container">
      <span class="reactions"><font-awesome-icon
        size="lg"
        :icon="['far', 'heart']"
      />{{ reactions }}</span>
      <span class="comments"><font-awesome-icon
        size="lg"
        :icon="['far', 'comments']"
      />{{ comments }}</span>
      <span class="length">{{ estimate(length) }}</span>
    </div>
    <template #modal-footer>
      <b-button
        :href="`/${id}`"
        variant="contrast"
      >
        Read 📚
      </b-button>
    </template>
  </b-modal>
</template>

<script>
  import {truncate} from "../../assets/js/utils";

  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      preview: {
        type: String
      },
      user: {
        type: String,
        required: true
      },
      userImg: {
        type: String,
        default: 'http://localhost:5000/profile/default.jpg'
      },
      img: {
        type: String,
        default: 'http://localhost:5000/post/default.jpg'
      },
      length: Number,
      comments: Number,
      reactions: Number
    },
    methods: {
      truncate(str, type) {
        return truncate(str, type);
      },
      estimate(time) {
        return time < 1 ? 'Less than a min read' : `About ${time} min read`;
      }
    }
  }
</script>


<style lang="scss" scoped>
  .preview-container{
    display: flex;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }

  .post-img {
    height: 500px;
    object-fit: cover;
  }

  .author-details {
    display: flex;
    p{
      margin: 1.6rem 1rem;
    }
    a{
      margin:5px 0 ;
    }
  }

  .author-image {
    height: 4em;
    width: 4em;

    img {
      display: inline;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .modal-title {
    display: inline-block;
    font-family: var(--title-font);
    color: var(--soft-primary-text);
  }

  .modal-preview {
    text-align: justify;
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  .info-container{
    width: 100%;
    justify-content: space-between;
    display: flex;
    color: var(--preview-color);
  }
  @media (min-width: 1000px) {
    .info-container{
      width: 30%;
    }
  }

</style>
