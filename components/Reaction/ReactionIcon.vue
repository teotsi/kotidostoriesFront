<template>
  <font-awesome-icon
    :icon="iconType"
    :id="icon"
    @click="toggleReaction"
    @mouseout="toggleReaction"
    @mouseover="toggleReaction"
    size="2x"
  />
</template>

<script>
  import axios from "axios";
  import {normalizeReaction} from "../../assets/js/utils";

  export default {
    name: "ReactionIcon",
    props: {
      icon: {
        type: String,
        required: true
      },
      enabled: {
        type: Boolean,
        default: false
      },
      existingId: {
        type: String,
        default: null
      }
    },
    methods: {
      toggleReaction(event) {
        if (event.type === 'click') {
          this.$emit('toggle-reaction');
          if (!this.enabled) {
            axios.post(`http://localhost:5000/post/${this.$route.params.postId}/reaction/`,
              {type: normalizeReaction(this.icon)}, {withCredentials: true})
              .then((response) => {
                this.enabled = true;
                this.reactionId = response.data.reaction.id;
              });
          } else {
            axios.delete(`http://localhost:5000/post/${this.$route.params.postId}/reaction/${this.reactionId}/`,
              {withCredentials: true})
              .then((response) => {
                console.log(response);
                this.enabled = false;
                this.reactionId = null;
              });

          }
        } else {
          if (!this.enabled) {
            if (event.type === 'mouseout') {
              this.iconType = ['far', this.icon]
            } else {
              this.iconType = ['fas', this.icon]
            }
          }
        }
      }
    },
    data() {
      return {
        iconType: this.enabled ? ['fas', this.icon] : ['far', this.icon],
        reactionId: this.existingId,
        test: 'test'
      }
    },
    watch: {
      enabled: function () {
        if (this.enabled) {
          this.iconType = ['fas', this.icon];
        } else {
          this.iconType = ['far', this.icon];
        }
      },
      existingId: function () {
        console.log(this.existingId)
      }
    }
  }
</script>

<style scoped>

  svg:hover {
    cursor: pointer;
  }
</style>
