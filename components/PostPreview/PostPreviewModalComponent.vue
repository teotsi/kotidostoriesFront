<template>
      <b-modal :id="id" size="xl">
                <div class="image-container">
                    <b-img :src="img+'#'+new Date().getTime()" class="post-img" fluid-grow/>
                </div> 
                <div class="preview-container">
                    <h1 v-html="title" id="title"/>
                    <p v-html="preview" id="preview"/>
                </div>
                <div class="info-container">
                    <span class="reactions"><font-awesome-icon :icon="['far', 'heart']"/>{{reactions}}</span>
                    <span class="comments"><font-awesome-icon :icon="['far', 'comments']"/>{{comments}}</span>
                </div>
                <template v-slot:modal-footer>
                    <b-button variant="contrast" :href="`/${id}`">Read 📚</b-button>
                </template>
      </b-modal>
</template>

<script>
import {truncate} from "../../assets/js/utils";

export default {
    props:{
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        preview: {
            type: String
        },
        user: {
            type: String, 
            required: true
        },
        img: {
            type: String,
            default: 'http://localhost:5000/post/default.jpg'
        },
        comments: Number,
        reactions: Number
    },
    methods: {
        truncate(str, type){
            return truncate(str, type);
        }
    }
}
</script>
    

<style scoped>

.post-img{
    height: 500px;
    object-fit: cover;
}


.image-container{
}

.preview-container{
    
}

.info-container{
    
}

#preview{
    font-size: 1.2rem;
}

</style>