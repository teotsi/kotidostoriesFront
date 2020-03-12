<template>
    <div class="form-container"
         :class="cls">
        <form action="#">
            <h1>Create Account</h1>

            <input type="text" placeholder="Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <ButtonComponent  :msg="msg" :is-ghost=false />
        </form>
    </div>
</template>

<script>
    import ButtonComponent from "./ButtonComponent";

    export default {
        name: "Form",
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
    .form-container {
        position: absolute;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }

    .sign-in-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }

    .sign-up-container {
        left: 0;
        width: 50%;
        z-index: 2;
    }
    .container.right-panel-active .sign-in-container {
        transform: translateX(100%);
    }

    .container.right-panel-active .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    @keyframes show {
        0%, 49.99% {
            opacity: 0;
            z-index: 1;
        }

        50%, 100% {
            opacity: 1;
            z-index: 5;
        }
    }

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

    input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
        border-radius: 20px;
    }

    textarea:focus, input:focus {
        outline: none;
    }
</style>
