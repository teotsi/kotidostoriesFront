<template>
  <font-awesome-icon
    :id="icon"
    :icon="iconType"
    size="2x"
    :value="value"
    @click="toggleReaction"
    @mouseout="toggleFill"
    @mouseover="toggleFill"
  />
</template>

<script>
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
    },
    postId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      status: this.enabled,
      reactionId: this.existingId,
      iconType: [this.enabled ? 'fas' : 'far', this.icon]
    }
  },
  watch: {
    enabled: function () {
      this.status = this.enabled
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
      this.status = !this.status
      this.$emit('input', {icon: this.icon, enabled: this.status, name: this.name});

    },
    toggleFill(event) {
      if (!this.status) {
        this.iconType = [event.type === 'mouseover' ? 'fas' : 'far', this.icon]
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
