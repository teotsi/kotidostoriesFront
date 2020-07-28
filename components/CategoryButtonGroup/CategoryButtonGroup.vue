<template>
    <div>
      <b-form-group >
        <b-form-checkbox-group
          class="category-group"
          v-model="selected"
          :options="buttons"
          stacked
          :value="selected"
          @input="$emit('input',selected)"
          buttons
          button-variant="category"
        ></b-form-checkbox-group>
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
