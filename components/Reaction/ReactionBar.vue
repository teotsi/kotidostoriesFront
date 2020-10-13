<template>
  <section class="reaction-section">
    <h2 class="reaction-header">
      {{ reactionQuote }}
    </h2>
    <div class="reaction-box">
      <reaction-icon
        v-for="(reaction,key) in currentReactions"
        :key="key"
        :enabled="reaction.enabled"
        :existing-id="existingReaction"
        :icon="reaction.icon"
        :name="key"
        :post-id="postId"
        @input="toggleReaction"
      />
    </div>
  </section>
</template>

<script>
import ReactionIcon from "@/components/Reaction/ReactionIcon";

export default {
  name: "ReactionBar",
  components: {ReactionIcon},
  props: {
    postId: {
      type: String,
      required: true
    },
    existingReaction: {
      type: String,
      required: false
    },
    reactions: {
      type: Object,
      required: true
    }

  },
  data() {
    return {
      reactionQuotes: [
        'What did you think?',
        'Show some appreciation!',
        'Your feedback matters!'
      ],
      currentReactions: {...this.reactions}
    }
  },
  computed: {
    reactionQuote() {
      return this.reactionQuotes[Math.floor(Math.random() * this.reactionQuotes.length)];
    }
  },
  methods: {
    async toggleReaction(event) {
      const {enabled, name} = event
      console.log(event)
      if (enabled) {
        for (const key in this.currentReactions) {
          if (key !== name) {
            this.currentReactions = {
              ...this.currentReactions,
              [key]: {...this.currentReactions[key], enabled: false}
            }
          } else {
            this.currentReactions = {
              ...this.currentReactions,
              [key]: {...this.currentReactions[key], enabled: true}
            }
            const reactResponse = await this.$axios.post(`post/${this.postId}/reaction/`, {type: name})
            console.log(reactResponse)
          }
        }
      } else {
        const reactResponse = await this.$axios.delete(`post/${this.postId}/reaction/${this.existingReaction}/`)
        this.currentReactions = {
          ...this.currentReactions,
          [name]: {...this.currentReactions[name], enabled: false}
        }
      }
    }
  }
}
</script>

<style scoped>

.reaction-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.reaction-header {
  font-family: var(--title-font);
  color: var(--soft-primary-text);
}
</style>
