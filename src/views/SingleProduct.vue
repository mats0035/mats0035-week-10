<template>
  <div>
    <!-- {{ $route.params.id }} -->
    <ProductInfo :product="product" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";
export default {
  components: { ProductInfo },
  data() {
    return {
    product: ""
    };
  },
  props:{
    id: {
      type: Number,
      required: true
    }
  },
  // mapのかわりに"$store.getters.getProductByid(this.id)"でもOK
  // 複数のgetterがあるなら名前を渡す方が簡単
  computed: mapGetters(["getProductById"]),
  created(){
    this.product = this.getProductById(this.id)
    console.log(this.product)
  }
}
</script>
