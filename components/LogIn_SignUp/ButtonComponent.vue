<template>
  <button :disabled="disable" :id="id" v-bind:class="{ghost:isGhost}">{{msg}}</button>
</template>

<script>
  export default {
    name: "ButtonComponent",
    props: {
      msg: String,
      isGhost: Boolean,
      id: String,
      disable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  button {
    border-radius: 20px;
    border: 3px solid #000000;
    background-color: #FFFFFF;
    color: #000000;
    font-size: 15px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border: 3px solid #000000;
  }

  button:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

</style>
