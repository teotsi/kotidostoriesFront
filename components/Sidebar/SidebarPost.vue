<template>
  <div class="sidebar-post">

    <div class="post-content">

      <h4 class="post-title">
        <a :href="`/${post.id}`">
          {{post.title}}
        </a>
      </h4>
      <p class="post-author">
        <a :href="`/user/${post.user.username}`">
          {{post.user.username}}
        </a>

      </p>
      <span class="date-info">
            {{this.dateInfo}},{{this.timeInfo}}
      </span>
    </div>

    <div class="post-image">
      <img :src="`http://localhost:5000/${post.img}`" alt="User image">
    </div>
  </div>
</template>

<script>
  export default {
    name: "SidebarPost",
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        dateObj: null,
        dateInfo: null,
        timeInfo: null
      }
    },
    mounted() {
      this.dateObj = new Date(this.post.date);
      this.dateInfo = this.dateObj.toDateString();
      this.timeInfo = `${this.dateObj.getHours()}:${this.dateObj.getMinutes()}`
    }
  }
</script>

<style scoped>
  .sidebar-post {
    width: 300px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed gray;
  }

  .sidebar-post:first-child {
    border-top: 1px dashed gray;
  }

  .post-image {
    align-items: center;
    margin-left: 50px;
  }

  img {
    height: 5em;
    width: 5em;
    object-fit: cover;
  }

  .post-title, .post-title a {
    font-family: var(--title-font);
    color: var(--soft-black);
    font-size: 16px;
    font-weight: 600;
  }

  .post-content {
    padding: 10px 0;
  }

  .post-author {
    font-size: 12px;
    margin: 0;
  }

  .post-author a, .post-author a:hover, .post-author a:visited {
    color: #717171;
    text-decoration: none !important;
  }

  .date-info {
    text-align: right;
    font-size: 10px;
    color: #7f828b;
    position: relative;
    bottom: 0;
  }

</style>
