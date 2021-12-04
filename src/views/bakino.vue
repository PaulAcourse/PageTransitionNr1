<template id="bakino">
  <product title="Bakino"  :image="image"></product>
</template>

<script>


import product from "../components/product";
import image from "@/assets/bakino.jpg"

export default {
  name: "bakino",

  data() {


    return {

      image: image

    }

  },
  components: {
    product
  }
}
</script>

<style scoped>

</style>
