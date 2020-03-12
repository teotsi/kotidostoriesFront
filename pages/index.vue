<template>
  <LoginComponent></LoginComponent>
</template>

<script>
  import LoginComponent from "@/components/LoginComponent";

  export default {
    components: {
      LoginComponent,
    }
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  @media only screen and (max-width: 600px) {
    .container {
      width: 50%;
      height: 50%;
    }

    .container {
      position: absolute;
      top: 20%;
      left: 0%;
      right: 0%;
    }
  }

  header {
    background: linear-gradient(35deg, #CCFFFF, #FFCCCC);
    padding: 20px 10px;

  }

  body {
    background: #f6f5f7;
    /* */
    font-family: 'Montserrat', sans-serif;
    /* height: 100vh;*/
    margin: 0px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
    color: black;
  }

  h2 {
    text-align: center;
    color: black;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    color: black;
    padding: 25px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
</style>
