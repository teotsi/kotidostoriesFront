<template>
    <div class="featured">
        <nuxt-link :to="`/${id}/`" id="featured-link">
            <div class= "image-wrapper">
                <img :src="image" alt="Post image">
            </div>
            <h6 class="featured_title">{{title}}</h6>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'featuredStory',
    props: {
        title:{
            type:String,
            required: true
        },
        image:{
            type:String,
            default: 'http://localhost:5000/post/default.png'
        },
        id: {
            type:String,
            required:true
        }
    }
}
</script>

<style scoped>

.image-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 15px;
}

img{
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
}



.featured{
    width: 180px;
    height: 270px;
    background-color: black;
    border-radius: 15px;
    margin: auto;
    margin-top: 40px;
    position: relative;
}

.featured_title{
    color: black;
    margin: 0;
    font-weight: 600;
    padding-top: 10px;
    text-align:center;
}

#featured-link{
        text-decoration: none;
}



</style>
