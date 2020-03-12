<template>
  <div id="login">
    <header>
      <a href="#"><h1>Unfold</h1></a>
    </header>
    <div class="container"
         v-bind:class="{'right-panel-active':rightPanelActive}"
         id="container">
      <Form cls="sign-up-container" msg="Sign up"/>
      <Form cls="sign-in-container" msg="Sign in"/>
      <OverlayComponent v-on:toggle-class="rightPanelActive =!rightPanelActive"/>
    </div>
  </div>
</template>

<script>
  import Form from "./Form";
  import OverlayComponent from "./OverlayComponent";

  export default {
    name: 'LoginComponent',
    components: {
      OverlayComponent,
      Form
    },
    data: function () {
      return {
        rightPanelActive: false
      };
    }

  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  #login {
    font-family: 'Montserrat', sans-serif;
  }

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

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    top: 20%;
    right: 7.5%;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }


  body {
    background: #f6f5f7;
    /* */
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
