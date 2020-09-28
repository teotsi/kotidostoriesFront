<template>
  <b-spinner
    id="spinner"
    :class="{'hidden':hideSpinner}"
    :label="label"
    small
  />
</template>

<script>
  export default {
    name: "Spinner",
    props: {
      hideSpinner: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

  .hidden {
    transition: ease 0.5s;
    visibility: hidden;
  }

  #spinner {
    transition: ease 0.5s;
    margin: auto 5px;
  }

</style>
