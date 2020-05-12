<template>
  <div class="grid-wrapper">
    <div class="content-container">
      <h1 class="title">{{post.title}} <span class="inline">by <nuxt-link :to="'user/'+ post.user.username">{{post.user.username}} </nuxt-link> </span>
      </h1>
      <div class="image-container">
        <img :src="'http://localhost:5000/'+post.img" alt="Story image" class="main-image">
      </div>

      <div class="main-text" v-html="post.content"></div>
      <section class="reaction-section">
        <h2 class="header">
          {{reactionQuote}}
        </h2>
        <div class="reaction-box">
          <reaction-icon
            :enabled="reaction[1]"
            :existingId="existingId"
            :icon="reaction[0]"
            :key="index"
            :ref="reaction[0]"
            v-for="(reaction,index) in reactions"
            v-on:toggle-reaction="toggleReaction(index,reaction[1])"
          />
        </div>
      </section>
      <hr/>
      <section class="comment-section">
        <h1 class="comments-header">
          Comments
        </h1>
        <comment
          :content="comment.content"
          :date="comment.date"
          :key="comment.id"
          :user="comment.user.username"
          v-for="comment in post.comments"
        />
      </section>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import {addSlug} from "../../../assets/js/utils";
  import ReactionIcon from "../../../components/Reaction/ReactionIcon";
  import Comment from "../../../components/Comment/Comment";

  export default {
    components: {
      Comment,
      ReactionIcon
    },
    methods: {
      toggleReaction(index, state) {
        for (let reaction of this.reactions) {
          reaction[1] = false;
        }
        this.$set(this.reactions[index], 1, !state);

      }
    },
    data() {
      return {
        reactionQuotes: [
          'What did you think?',
          'Show some appreciation!',
          'Something even cooler!'
        ],
      }
    },
    computed: {
      reactionQuote() {
        return this.reactionQuotes[Math.floor(Math.random() * this.reactionQuotes.length)];
      }
    },
    asyncData({params}) {
      return axios.get(`http://localhost:5000/post/${params.postId}`, {withCredentials: true})
        .then((res) => {
          let post = res.data;
          let reacted = post.reacted;
          let existingReaction;
          let existingId;
          let reactions = [
            ['thumbs-up', false],
            ['heart', false],
            ['lightbulb', false],
            ['laugh-beam', false]
          ];
          if (reacted) {
            existingId = post.reacted_id;
            console.log(existingId)
            if (reacted === 'love') {
              existingReaction = 'heart'
            } else if (reacted === 'like') {
              existingReaction = 'thumbs-up'
            } else if (reacted === 'laugh') {
              existingReaction = 'laugh-beam'
            } else {
              existingReaction = 'lightbulb'
            }
            for (let [index, reaction] of reactions.entries()) {
              console.log(reactions)
              if (reaction[0] === existingReaction) {
                reactions[index][1] = true;
                break
              }
            }
          }
          return {
            post: res.data,
            reactions: reactions,
            existingId:existingId
          }
        })

    },
    mounted() {
      //weird solution to add slug on url, if there's such a need
      addSlug(this.$route.params, this.slug);

    }
  }
</script>

<style>
  .inline {
    font-weight: normal;
  }

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .content-container {
    max-width: 600px;
    padding: 0 15px;

    grid-column: 1;
    border-radius: 10px;
    /*box-shadow: var(--soft-shadow);*/
    margin: 20px auto;
  }

  .image-container {
    width: 100%;
    box-shadow: var(--soft-shadow);
    margin: 10px 0;
  }

  .main-image {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }

  .title, .comments-header, .reaction-section h2 {
    font-family: var(--title-font);
    color: var(--soft-black);
  }

  .main-text {
    text-align: justify;
  }

  .story-form {
    width: 100%;
  }

  .email-button-container {
    height: 42px !important;
    width: 100px !important;
  }

  @media (min-width: 800px) {
    .grid-wrapper {
      grid-template-columns: 32% 36% 32%;
    }

    .content-container {
      grid-column: 2/3;
      max-width: initial;
    }
  }

  hr {
    border: 1px solid var(--soft-black);
  }

  .reaction-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }


</style>
