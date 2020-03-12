<template>
    <div class="form-container"
         :class="cls">
        <form action="#">
            <h1>Create Account</h1>

            <input type="text" placeholder="Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password" style="margin-bottom:25px;"/>
            <ButtonComponent  :msg="msg" :is-ghost=false />
        </form>
    </div>
</template>

<script>
    import ButtonComponent from "./ButtonComponent";

    export default {
        name: "SignUpForm",
        components: {
            ButtonComponent
        },
        props: {
            cls: String,
            msg: String
        }
    }
</script>

<style scoped>
  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 20px;
  }

  textarea:focus, input:focus{
    outline:none;
  }

</style>
