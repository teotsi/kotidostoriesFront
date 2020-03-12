<template>
  <div>
    <header>
      <a href="#"><h1>Unfold</h1></a>
      <ModalComponent></ModalComponent>
    </header>
    <nuxt /></div>

</template>

<script>
  import ModalComponent from "../components/ModalComponent"

export default {
  components:{
    ModalComponent
  }

}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
