<template>
  <div class="discover-followed-options">
    <b-form-group>
      <b-form-radio-group :options="options"
                          @input="$emit('input',selected)"
                          button-variant="purple"
                          buttons
                          :value="selected"
                          class="post-buttons"
                          v-model="selected">
      </b-form-radio-group>
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
      methods: {

      },
      data(){
          return{
            selected: 'discover',
          }
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
