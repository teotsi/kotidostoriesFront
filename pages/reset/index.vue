<template>
  <div>
    <custom-form :has-password="false"
                 :on-submit-reset="reset"
                 id="reset"
                 msg="Send reset email"></custom-form>
  </div>
</template>

<script>
  import CustomForm from "../../components/LogIn_SignUp/CustomForm";
  import axios from "../../.nuxt/axios";

  export default {
    name: "index.vue",
    components: {
      CustomForm
    },
    methods: {
      reset: function () {
        axios.post('http://localhost:5000/reset', {'user_id': this.$auth.user.id})
          .then(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>

<style scoped>

</style>
