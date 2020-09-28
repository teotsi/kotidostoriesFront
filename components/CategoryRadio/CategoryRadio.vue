<template>
  <div class="discover-followed-options">
    <b-form-group>
      <b-form-radio-group
        v-model="selected"
        :options="options"
        button-variant="purple-radio"
        buttons
        :value="selected"
        class="post-buttons"
        @input="$emit('input',selected)"
      />
    </b-form-group>
  </div>
</template>

<script>
    export default {
        name: "CategoryRadio",
      props:{
          options:{
            type:Array,
            default:()=>[
              {text: 'Discover', value: 'discover'},
              {text: 'Followed', value: 'followed'}
            ]
          }
      },
      data(){
          return{
            selected: 'discover',
          }
      },
      methods: {

      }
    }
</script>

<style scoped>
  .discover-followed-options{
    display: flex;
    justify-content: center;
  }
  .post-buttons {
    background-color: #7F828B;
    margin-bottom: 30px;
  }
</style>
