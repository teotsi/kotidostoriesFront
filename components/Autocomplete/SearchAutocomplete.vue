<template>
  <div class="autocomplete-container">
    <b-input-group class="search" >
      <b-form-input @mouseup="toggleWidth" @blur="toggleWidth" autocomplete="off" id="autocomplete-input"
                    v-model="input"></b-form-input>
      <b-input-group-append>
        <b-button>Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <div :class="['autocomplete-list',!show?'hide':'']" >
      <auto-complete-item
        v-for="suggestion in matches"
        :key="suggestion.id"
        :post="suggestion"/>
    </div>
  </div>
</template>

<script>
  import AutoCompleteItem from "./AutoCompleteItem";

  export default {
    name: "SearchAutocomplete",
    components: {AutoCompleteItem},
    props: {
      suggestions: {
        required: true
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleWidth(event) {
        console.log(event)
        if (event.type === 'mouseup') {
          event.target.parentElement.parentElement.style.width =
            event.target.parentElement.nextElementSibling.style.width = "40%";
        } else {
          event.target.parentElement.parentElement.style.width =
            event.target.parentElement.nextElementSibling.style.width = "20%";

        }
      }
    },
    data() {
      return {
        open: false,
        current: 0,
        input: ""
      }
    },
    computed: {
      //Filtering the suggestion based on the input
      matches() {
        if (this.input.length > 0) {
          return this.suggestions.filter((post) => {
            return post.title.toLowerCase().indexOf(this.input) >= 0;
          });
        }
        return [];
      }
    }
  }
</script>

<style scoped>
  .autocomplete-container, .autocomplete-list {
    width: 20%;
    transition: ease 0.2s;
  }

  .input-group-append button {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .hide {
    display: none;
  }

  .autocomplete-list {

    list-style: none;
    position: absolute;
    margin-top: 20px;
    padding: 0;
    text-align: center;
    box-shadow: var(--soft-shadow);
    z-index: 1;
  }

  .search input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 0 0 1px 0px white inset, 0 0 1px 0px white;
  }

</style>
