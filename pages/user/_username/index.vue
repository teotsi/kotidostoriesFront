<template>
  <div class="grid-container">
    <div id="side_bar">
            <div id="profile_pic"></div>
            <div id="stats"></div>
            <div id="about"></div>
            <div id="socials"></div>
    </div>

    <div id="main_profile_section">
            <div id="featured_stories">
                <h3 id="section_title">Featured Stories</h3>
                <div class="grid-containerB">
                    <div class="flex-container">
                        <featured-story
                        :key= "story.id"
                        :title="story.title"
                        :image="'http://localhost:5000/'+story.img"
                        :id ="story.id"
                        v-for="story in this.user.posts.slice(0,3)"/>
                        
                    </div>
                </div>
            </div>
            <!-- <div id="posts">
                <h3 id="section_title">User's Posts</h3>  
                <div class="post-grid-container">
                    <profile-post
                        :key="post.id"
                        :title="post.title"
                        :preview="post.preview"
                        :img="post.img"
                        :id="post.id"
                        v-for="post in this.user.posts"
                    />
                </div>
            </div> -->
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import featuredStory from '../../../components/Profile_Page/featuredStory';
import profilePost from '../../../components/Profile_Page/profilePost';
export default {
    components:{
        featuredStory,
        profilePost
    },

    asyncData({params}) {
      return axios.get(`http://localhost:5000/user/${params.username}`)
        .then((res) => {
            console.log(res)
          return {
            user: res.data.user
          }
        })

    },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,800');

*{
    font-family: 'Montserrat', sans-serif;
    word-spacing: 1px;
}

html, body{
    padding: 0;
    margin: 0;
    overflow: hidden;
}

/* ------HEADER------ */

#header_div{
    background-image: linear-gradient(35deg, #FFCCCC, #CCFFFF);
    padding: 3px;
    margin:0;
}

#header_anchor{
    text-decoration: none;
}

#header_anchor:visited{
    color:black;
}

/* ------MAIN------ */

.grid-container{
    display: grid;
    grid-template-columns: 1fr 4fr;
}


#section_title{
    margin: 0;
    padding-left: 7%;
    padding-top: 5%;
}

#main_profile_section{
    grid-column: 2;
}

#featured_stories{
    width: 100%;
    height: 45%;
}

#posts{
    width: 100%;
    height: 510px;
}

.posts{
    grid-column: 2;
}

/* ------FEATURED STORIES------ */

.post-grid-container{
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    height: 85%;
    width: 100%;
    overflow: scroll;
}

.flex-container{
    display: flex;
    flex-wrap: nowrap;
    grid-column: 2;
}

.flex-container > div{
    vertical-align: middle;
}

/* ------SIDEBAR------ */

#side_bar{
    grid-column: 1;
    width: 100%;
    height: 90.89vh;
    background-image: linear-gradient(35deg, #FFCCCC, #CCFFFF);
}

#profile_pic{
    background-color: white;
    width: 190px;
    height: 300px;
    margin: auto;
    margin-top: 40px;
    border-radius: 15px;
    border: 1.5px solid black;
}

#stats{
    background-color: white;
    width: 190px;
    height: 100px;
    margin: auto;
    margin-top: 40px;
    border-radius: 15px;
    border: 1.5px solid black;
}

#about{
    background-color: white;
    width: 190px;
    height: 150px;
    margin: auto;
    margin-top: 40px;
    border-radius: 15px;
    border: 1.5px solid black;
}

#socials{
    background-color: white;
    width: 190px;
    height: 130px;
    margin: auto;
    margin-top: 40px;
    border-radius: 15px;
    border: 1.5px solid black;
}


/* ------------------------------ */
/* @media (max-width: 1000px){

} */
</style>