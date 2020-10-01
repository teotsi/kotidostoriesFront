<template>
  <div class="footer-container">
    <div class="content-footer">
      <div class="user-info">
        <b-icon
          class="user-small-img"
          icon="person-fill"
        />
        <span style="font-size: 16px;color: #fff;">{{ user }}</span>
      </div>
      <span class="pull-right">
        <a
          data-placement="left"
          data-toggle="tooltip"
          href="#"
          title="Comments"
        >
          <font-awesome-icon :icon="['far', 'comments']" />{{ comments }}</a>
        <a
          data-placement="right"
          data-toggle="tooltip"
          href="#"
          title="Loved"
        >
          <font-awesome-icon :icon="['far', 'heart']" />
          {{ reactions }}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFooter",
  props: {
    comments: {
      type: Number,
      default: 0
    },
    reactions: {
      type: Number,
      default: 0
    },
    user: {
      type: String,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>

.content-footer {
  background-color: #950ca0;
  padding: 10px;
  position: relative;
  width: 80%;
  display: flex;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    width: 95.5%;
    height: 3px;
    bottom: 0;
    left: 8px;
    z-index: -1;
    box-shadow: 0px 0px 10px 1px var(--primary-shadow-color);
  }
}


.footer-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pull-right {
  float: right;
}
</style>
