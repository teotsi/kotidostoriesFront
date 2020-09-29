<template>
  <b-input-group>
    <template #prepend>
      <b-input-group-text variant="light">
        {{ `${value} ` }}
      </b-input-group-text>
    </template>

    <template #append>
      <b-dropdown
        text=" "
        variant="light-dropdown"
        v-bind:value="value"
      >
        <b-dropdown-item
          v-for="(category, index) in categories"
          :key="`category-${index}`"
          href="#"
          @click="$emit('input',category)"
        >
          {{ category }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</template>

<script>
export default {
  name: "CategoryDropdown",
  props:{
    value: {
      type: String,
      default: ''
    },
    categories:{
      type:Array,
      required:true
    }
  }

}
</script>

<style scoped>

</style>
