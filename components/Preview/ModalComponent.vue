<template>
  <div>
    <b-button
      variant="primary"
      @click="show=true"
    >
      Show Modal
    </b-button>

    <b-modal
      id="modalQuickView"
      class="modal fade"
      :show="show"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!--Content-->
      <div class="modal-content">
        <!--Body-->
        <div class="modal-body mb-0 p-0">
          <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
            <iframe
              class="embed-responsive-item"
              src="https://player.vimeo.com/video/115098447"
              allowfullscreen
            />
          </div>
        </div>

        <!--Footer-->
        <div class="modal-footer justify-content-center flex-column flex-md-row">
          <span class="mr-4">Spread the word!</span>
          <div>
            <a
              type="button"
              class="btn-floating btn-sm btn-fb"
            >
              <i class="fab fa-facebook-f" />
            </a>
            <!--Twitter-->
            <a
              type="button"
              class="btn-floating btn-sm btn-tw"
            >
              <i class="fab fa-twitter" />
            </a>
            <!--Google +-->
            <a
              type="button"
              class="btn-floating btn-sm btn-gplus"
            >
              <i class="fab fa-google-plus-g" />
            </a>
            <!--Linkedin-->
            <a
              type="button"
              class="btn-floating btn-sm btn-ins"
            >
              <i class="fab fa-linkedin-in" />
            </a>
          </div>
          <button
            type="button"
            class="btn btn-outline-primary btn-rounded btn-md ml-4"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
      <!--/.Content-->
    </b-modal>
  </div>
</template>

<script>
export default { data() {
      return {
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'success',
        footerTextVariant: 'dark'
      }
    },
    methods:{

    }
}
</script>

<style scoped>
.btn-nick{
    color: cyan;
    background-color: black;
}

</style>
