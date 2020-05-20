<template>
  <div class="image-wrapper">
    <div class="preview-image">
      <img :src="imagePreviewUrl" alt="selected image" id="post-image" v-if="imagePreviewUrl">
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text accept="image/jpeg, image/png, image/gif" variant="light">Image 📷
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-file
          class="file-input"
          @change="previewImage"
          drop-placeholder="Drop image here..."
          :placeholder="caption"
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
    methods: {
      previewImage(event) {
        if (event.target.files[0]) {
          const file = event.target.files[0];
          this.imagePreviewUrl = URL.createObjectURL(file);
          this.$emit('image-upload', file);
        }
      }
    },
    data() {
      return {
        imagePreviewUrl: this.imageUrl
      }

    }
  }
</script>

<style scoped>

  #post-image {
    z-index: 5;
    position: relative;
    margin: 20px auto;
    max-width: 100%;
    max-height: 250px;
    transition: ease 0.5s;
    box-shadow: var(--soft-shadow);
  }

  #post-image:hover {
    transform: scale(1.5);
    transition: ease 0.5s;
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
</style>
