<template>
  <div>
<!--    <h1>{{title}}</h1>-->
<!--    <p>{{preview}}</p>-->
<!--    <p>{{user_id}}</p>-->
  </div>
</template>

<script>
  export default {
    async asyncData(context) {
      let response = await context.$axios.get()
    }
  }
</script>
