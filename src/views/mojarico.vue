<template id="mojarico">
  <product title="Mojarico" :image="image"></product>
</template>


<script>


import product from "../components/product";
import image from "@/assets/mojari.jpg"

export default {
  name: "mojarico",


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
