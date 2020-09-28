<template>
  <div class="donate-wrapper">
    <b-button
      v-b-modal.donate-modal
      variant="lilac"
      @click="show=true"
    >
      Donate! 💫
    </b-button>
    <b-modal
      id="donate-modal"
      header-bg-variant="modal"
      body-bg-variant="modal"
      footer-bg-variant="modal"
      header-text-variant="info"
    >
      <transition
        mode="out-in"
        name="fade-out"
      >
        <b-form-group
          v-if="show"
          class="donate-container"
          label="Select an amount below!"
        >
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio value="1">
              $1
            </b-form-radio>
            <b-form-radio value="5">
              $5
            </b-form-radio>
            <b-form-radio value="20">
              $20
            </b-form-radio>
            <b-form-radio value="other">
              other
            </b-form-radio>
            <b-input-group prepend="💲">
              <b-form-input
                v-model.number="donateOther"
                :disabled="selected!=='other'"
                class="donate-input"
                min="1"
                type="number"
              />
            </b-input-group>
          </b-form-radio-group>
        </b-form-group>

        <div
          v-else
          class="success-container"
        >
          <h3>Success!</h3>
          <p>Your donation was sent ✔ Thank you for showing your support to both the writers and Unfold.</p>
        </div>
      </transition>


      <template #modal-footer="{cancel}">
        <Transition
          mode="out-in"
          name="fade-out"
        />
        <div
          v-if="show"
          class="donate-options"
        >
          <b-button
            variant="light"
            @click="cancel()"
          >
            Cancel
          </b-button>
          <b-button
            :disabled="!selected"
            variant="lilac"
            @click="donate"
          >
            Donate!
          </b-button>
        </div>
        <div v-else>
          <b-button
            variant="light"
            @click="cancel()"
          >
            Return
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'DonateModal',
    props: {
      user: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selected: null,
        donateOther: 50,
        show: true
      }
    },
    methods: {
      async donate() {
        let amount = this.selected !== 'other' ? this.selected : this.donateOther;
        const donateResponse = await this.$axios.post(`user/${this.user}/donation/`, {'amount': amount}, {withCredentials: true})
        if (donateResponse.status === 200) {
          this.show = false;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .donate-container div[role='radiogroup'] {
    display: flex;

    .custom-radio {
      padding: 7px 15px;
    }
  }

  .donate-input {
    width: 15%;
    flex: 1;
  }
</style>
