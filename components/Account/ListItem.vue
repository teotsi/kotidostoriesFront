<template>
  <b-list-group-item :active="this.$store.state.active===id" :id=id @click="selectItem" href="#">
    {{message}}
  </b-list-group-item>
</template>

<script>

  export default {
    name: "ListItem",
    props: {
      id: String,
      message: String
    },
    methods: {
      selectItem() {
        this.$emit('toggle-list', this.id);
        this.$store.commit('SET_ACTIVE', this.id);
      },
      data() {
        return {}
      }
    }
  }
</script>

<style scoped>

</style>
