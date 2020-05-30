<template>
    <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-left">
                <h1>Hello There!</h1>
                <p style="margin:10px;">If you already have an account then just sign back in</p>
                <button-component v-on:click.native="$emit('toggle-class')" is-ghost msg="Sign in" id="signUp" />
            </div>
            <div class="overlay-panel overlay-right">
                <h1>Good to have you back!</h1>
                <p style="margin:10px;">If you don't have an account, go make one... it's free! </p>
                <button-component v-on:click.native="$emit('toggle-class')" is-ghost msg="Sign up" id="signIn"/>
            </div>

        </div>
    </div>
</template>

<script>
    import ButtonComponent from "@/components/LogIn_SignUp/ButtonComponent";

    export default {
        name: "OverlayComponent",
        components: {ButtonComponent}
    }
</script>

<style scoped>
    .overlay {
        background: var(--gradient-soft);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: var(--bg);
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
    }

    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform 0.6s ease-in-out;
        z-index: 100;
    }

    .container.right-panel-active .overlay-container {
        transform: translateX(-100%);
    }

    .overlay-panel {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 60px;
        text-align: center;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
    }
    .overlay-panel h1{
      font-weight: bold;
      color: black;
      margin: 0px;
    }
    .overlay-panel p{
      ont-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      color: black;
      margin: 20px 0px 30px;
      padding: 25px;
    }
    .overlay-left {
        transform: translateX(-20%);

    }

    .overlay-right {
        right: 0;
        transform: translateX(0);
    }

    .container.right-panel-active .overlay {
        transform: translateX(50%);
    }


    .container.right-panel-active .overlay-left {
        transform: translateX(0);
    }

    .container.right-panel-active .overlay-right {
        transform: translateX(20%);
    }


</style>
