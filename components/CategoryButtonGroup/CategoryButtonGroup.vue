<template>
  <div>
    <b-form-group>
      <b-form-checkbox-group
        v-model="selected"
        class="category-group"
        :options="buttons"
        stacked
        :value="selected"
        buttons
        button-variant="category"
        @input="$emit('input',selected)"
      />
    </b-form-group>
  </div>
</template>

<script>
    export default {
        name: "CategoryButtonGroup",
        props:{
          preSelected:{
            type:Array,
            default:()=>[]
          },
          buttons:{
            type:Array,
            required:true
          }
        },
      data(){
          return {
            selected:this.preSelected,

          }
      }
    }
</script>

<style lang="scss">
  .category-group{
    width: 100%;
    label{
      margin-bottom: 15px!important;
    }
  }
</style>
