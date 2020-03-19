<template>
  <nuxt-link
    :to="id">
    <article class="landing-post">
      <div class="landing-post-content">
        <h1>{{title}}</h1>
        <p>{{preview}}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
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
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
  }
  .landing-post{
    border-radius: 3px;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    width: 90%;
    height: 20rem;
    margin: 1rem;
  }
  .landing-post-content{
    text-align: center;
    padding: 1rem;
  }

  @media (min-width: 35rem) {
    .landing-post{
      width: 25rem;
    }
  }
</style>
