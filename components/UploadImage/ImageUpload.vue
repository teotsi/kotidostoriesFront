<template>
  <div class="image-wrapper">
    <div class="preview-image">
      <img
        v-if="imagePreviewUrl"
        id="post-image"
        :src="imagePreviewUrl"
        alt="selected image"
      >
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text
            accept="image/jpeg, image/png, image/gif"
            class="prepend-text"
          >
            Image 📷
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-file
          class="file-input"
          drop-placeholder="Drop image here..."
          :placeholder="caption"
          @change="previewImage"
        />
      </b-input-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageUpload",
    props: {
      imageUrl: {
        type: String,
        default: null
      },
      caption: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        imagePreviewUrl: this.imageUrl
      }

    },
    watch: {
      imageUrl(val) {
        this.imagePreviewUrl = val;
      }
    },
    methods: {
      previewImage(event) {
        if (event.target.files[0]) {
          const file = event.target.files[0];
          this.imagePreviewUrl = URL.createObjectURL(file);
          this.$emit('image-upload', file);
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  #post-image {
    z-index: 5;
    position: relative;
    margin: 20px auto;
    max-width: 100%;
    max-height: 250px;
    transition: ease 0.5s;
    box-shadow: var(--soft-shadow);

    &:hover {
      transform: scale(1.5);
      transition: ease 0.5s;
    }
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
  }
  .preview-image {
    text-align: center;
    width: 50%;
  }
  .file-input{
    text-align: left;
  }
  .prepend-text{
    background-color: var(--category-input);
    color: var(--soft-primary-text);
  }

</style>
