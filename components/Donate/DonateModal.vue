<template>
  <div class="donate-wrapper">
    <b-button @click="show=true"
              v-b-modal.donate-modal
              variant="donate"
    >Donate! 💫
    </b-button>
    <b-modal id="donate-modal">
      <transition mode="out-in" name="fade-out">
        <b-form-group class="donate-container" label="Select an amount below!" v-if="show">
          <b-form-radio-group id="radio-group-2" name="radio-sub-component" v-model="selected">
            <b-form-radio value="1">$1</b-form-radio>
            <b-form-radio value="5">$5</b-form-radio>
            <b-form-radio value="20">$20</b-form-radio>
            <b-form-radio value="other">other</b-form-radio>
            <b-input-group prepend="💲">
              <b-form-input :disabled="selected!=='other'"
                            class="donate-input"
                            min="1"
                            type="number"
                            v-model.number="donateOther"/>
            </b-input-group>
          </b-form-radio-group>
        </b-form-group>

        <div class="success-container" v-else>
          <h3>Success!</h3>
          <p>Your donation was sent ✔ Thank you for showing your support to both the writers and Unfold.</p>
        </div>
      </transition>


      <template v-slot:modal-footer="{cancel}">
        <Transition mode="out-in" name="fade-out"></Transition>
        <div class="donate-options" v-if="show">
          <b-button @click="cancel()" variant="light">Cancel</b-button>
          <b-button :disabled="!selected"
                    @click="donate"
                    variant="donate">Donate!
          </b-button>
        </div>
        <div v-else>
          <b-button @click="cancel()" variant="light">Return</b-button>
        </div>

      </template>
    </b-modal>
  </div>

</template>

<script>
  export default {
    name: 'donateModal',
    props: {
      user: {
        type: String,
        required: true
      }
    },
    methods: {
      async donate() {
        let amount = this.selected !== 'other' ? this.selected : this.donateOther;
        const donateResponse = await this.$axios.post(`${this.user}/donation/`, {'amount': amount}, {withCredentials: true})
        if (donateResponse.status === 200) {
          this.show = false;
        }
      }
    },
    data() {
      return {
        selected: null,
        donateOther: 50,
        show: true
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
