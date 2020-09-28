<template>
  <font-awesome-icon
    :id="icon"
    :icon="iconType"
    size="2x"
    @click="toggleReaction"
    @mouseout="toggleReaction"
    @mouseover="toggleReaction"
  />
</template>

<script>
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
    },
    methods: {
      async toggleReaction(event) {
        if (event.type === 'click') {
          this.$emit('toggle-reaction');
          if (!this.enabled) {
            const reactionResponse = await this.$axios.post(`post/${this.$route.params.postId}/reaction/`,
              {type: normalizeReaction(this.icon)}, {withCredentials: true})
            this.enabled = true;
            this.reactionId = reactionResponse.data.reaction.id;
          } else {
            await this.$axios.delete(`post/${this.$route.params.postId}/reaction/${this.reactionId}/`,
              {withCredentials: true})
            this.enabled = false;
            this.reactionId = null;

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
    }
  }
</script>

<style scoped>

  svg:hover {
    cursor: pointer;
  }
</style>
