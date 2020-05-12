<template>
  <div class="comment-container">
    <div class="user-details">
      <div class="user-image">
        <img :src="`http://localhost:5000/${img}`" alt="User image">
      </div>

      <p>{{user}}</p>
    </div>

    <div class="comment-content-container">
      <p class="comment-content">
        {{content}}
      </p>
      <span class="date-info">
            {{this.dateInfo}},{{this.timeInfo}}
      </span>
  </div>

  </div>
</template>

<script>
  export default {
    name: "Comment",
    props: {
      user: {
        type: String,
        required: true
      },
      img: {
        type: String,
        default: 'pictures/profile/default.png'
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        dateObj:null,
        dateInfo: null,
        timeInfo: null
      }
    },
    mounted() {
      this.dateObj = new Date(this.date);
      this.dateInfo = this.dateObj.toDateString();
      this.timeInfo = `${this.dateObj.getHours()}:${this.dateObj.getMinutes()}`
    }
  }
</script>

<style scoped>
  .comment-container {
    display: flex;
    padding: 10px 0;
  }

  .comment-container:not(:last-child){
    border-bottom: 1px solid gray;
  }

  .comment-container:hover{
    background-color: #e9e9e9;
  }

  .comment-content-container{
    margin-bottom: 0;
  }
  .comment-content {
    text-align: justify;
  }
  .date-info{
    text-align: right;
    font-size: 10px;
    color: #7f828b;
  }

  .user-details {
    padding: 0 10px;
    text-align: center;
    margin-right: 20px;
  }
  .user-details p {
    font-size: 14px;
    margin: 0;
  }

  .user-image {
    border-radius: 50%;
    height: 3em;
    width: 3em;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
