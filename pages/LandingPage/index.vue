<template>
  <section id="posts">
  <LandingPosts
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
    :preview="post.preview"
    :date="post.date"
    :id="post.id"
    :content="post.content"/>
  </section>
</template>

<script>
  import LandingPosts from "../../components/Posts/LandingPosts";
  export default {
    components: {
      LandingPosts,
    },
    data(){
      return {
        posts: [
          {
            title: "My childhood story",
            preview: "Eating a lot of cheetos and ice cream!",
            id: "story#1",
            content: "I wasn't a fat kid but my grandfather used to buy me a lot of these foods bla bla bla big content that nobody cares. ",
            date: "19/3/2020"
          },
          {
            title: "Yo fat momma",
            preview: "Do you know how fat is yo momma?",
            id: "story#2",
            content: "Yo momma is so fat, I took a picture of her last Christmas and it's still printing.",
            date: "18/3/2020"
          }
        ]
      }
    }
  }
</script>

<style>
  #posts{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 35rem) {
    #posts{
      flex-direction: row;
    }

  }
</style>
