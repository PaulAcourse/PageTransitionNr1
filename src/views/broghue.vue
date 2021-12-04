<template id="broghue">
  <product title="Broghue" :image="image"></product>
</template>

<script>


import product from "../components/product";
import image from "@/assets/broghue.jpg"
export default {
  name: "broghue",


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
