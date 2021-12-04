<template id="product">
  <section class="hero">
    <div class="hero__left">
      <div class="hero__content">
        <h1 class="hero__title">{{ title }}</h1>
        <p class="hero__text">On had need odd ports, the candidates, few hills posterity most in with everything brown most their partially installer.</p>
        <button class="btn">Buy now</button>
      </div>
    </div>
    <div class="hero__right">
      <div class="hero__overlay"></div>
      <img :src="image" />
    </div>
  </section>
</template>

<script>
export default {

  name: "product",

  props: ['title', 'image']


}
</script>

<style scoped>

</style>