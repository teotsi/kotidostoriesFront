<template>
  <div class="dropprof">
    <font-awesome-icon
      id="theme-icon"
      :icon="icon"
      size="2x"
      @click="toggleTheme"
    />
    <b-dropdown
      class="profile-dropdown"
      no-caret
      right
      size="lg"
      toggle-class="text-decoration-none"
      variant="link"
    >
      <template #button-content>
        <div class="icon-container">
          <font-awesome-icon size="2x" :icon="['fas','user']"/>
        </div>
      </template>
      <div v-if="this.$auth.loggedIn">
        <a />
        <b-dropdown-item :href="'/user/'+profile_name">
          Profile
        </b-dropdown-item>
        <b-dropdown-item href="/TextEditor">
          New Post
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          Logout
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </b-dropdown-item>
      </div>
      <div v-else>
        <b-dropdown-item href="/">
          Log in / Sign up!
        </b-dropdown-item>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        profile_name: this.$auth.loggedIn ? this.$auth.user.username : '',
        icon: this.$colorMode.value==="dark"? ['fas', 'sun'] :['fas','moon']

      }
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        await this.$router.push('/')

      },
      toggleTheme() {
        if (this.$colorMode.preference === "dark") {
          this.$colorMode.preference = "light";
          this.icon = ['fas', 'moon']
        } else {
          this.$colorMode.preference = "dark";
          this.icon = ['fas', 'sun']
        }
      }
    }
  }
</script>

<style scoped>

  .dropprof {
    padding-right: 5px;
  }

  #theme-icon {
    margin-bottom: -6px;
    transition: ease-in 0.5s;
  }
  .icon-container, #theme-icon {
    color:white;
  }
</style>
