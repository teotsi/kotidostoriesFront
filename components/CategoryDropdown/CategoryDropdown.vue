<template>
  <b-input-group>
    <template #prepend>
      <b-input-group-text variant="light">
        {{ displayValue }}
      </b-input-group-text>
    </template>

    <template #append>
      <b-dropdown
        :value="value"
        text=" "
        variant="light-dropdown"
      >
        <b-dropdown-item
          v-for="(category, name) in categories"
          :key="`category-${name}`"
          href="#"
          @click="emitCategory(name)"
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
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    emitCategory(name) {
      this.$emit('input', name);
      this.displayValue = this.categories[name];
    }
  },
  data() {
    const categories = this.$store.state.categories
    return {
      categories,
      displayValue: categories[this.value] ?? this.value
    }
  }
}
</script>

<style scoped>

</style>
