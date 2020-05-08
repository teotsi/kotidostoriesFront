<template>
        <div class="posts">
            <nuxt-link :to="`/${id}/`">
                <div class="post-image">
                    <img :src="`http://localhost:5000/${img}`" alt="Post image">
                </div>
            </nuxt-link>

            <div style="grid-column=2; padding-top: 15px;">
                <nuxt-link :to="`/${id}/`">
                    <h4>{{title}}</h4>
                </nuxt-link>
                <p>{{preview}}</p>
            </div>
        </div>

</template>

<script>
export default {

    props:{
        title:{
            type:String,
            required:true
        },
        preview:{
            type: String,
            required: true
        },
        id:{
            type: String,
            required: true
        },
        img:{
            type: String,
            default: 'post/default.png'
        }
    }

}
</script>

<style scoped>

.posts{
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-top: 20px;
    grid-column: 2;
    width: 100%;
    height: 120px;
    background-color: gray;
    border-radius: 15px;
    word-wrap: break-word;
}

.post-image{
    width: 70%;
    height: 70%;
    background-color: black;
    border-radius: 15px;
    grid-column: 1;
    margin: auto;

}

img{
    width: 100%;
    height: 100%;
    border-radius: 15px;
}

</style>
