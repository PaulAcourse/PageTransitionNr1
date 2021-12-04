<template id="navigation">
  <header class="header">
    <nav>
      <svg class="logo" viewBox="0 0 64 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="32" fill="#C4C4C4" />
      </svg>
      <div class="links">
        <router-link v-for="route in links" :to="route.path"
          :key="route"

        >{{route.name}}</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "navigation",

  props: {
    links: Array
  }
}
</script>

<style scoped>

</style>
