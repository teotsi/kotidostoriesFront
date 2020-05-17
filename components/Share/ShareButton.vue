<template>
  <a :to="`${media[name]['url']}`" target="_blank">
    <font-awesome-icon :icon="media[name]['class']" size="2x"/>
  </a>
</template>

<script>
  export default {
    name: "ShareButton",
    props: {
      name: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        media: {
          "facebook": {
            "url": "https://facebook.com/sharer/sharer.php?u=Unfold!",
            "class": ['fab', 'facebook']
          },
          "twitter": {
            "url": "https://twitter.com/intent/tweet/?url=Unfold!",
            "class": ['fab', 'twitter']

          },
          "email": {
            "url": "mailto:?body=Unfold!",
            "class": ['fas', 'envelope']
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  a{
    padding-top: 7px;
    margin-right: 10px;
    color: #212529;
  }
  a:hover{
    cursor: pointer;
    color: #656565;
  }

</style>
