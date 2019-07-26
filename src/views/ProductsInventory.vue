<template>
  <div>
    <h1>Product Inventory Page</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <!-- <th scope="row">{{ product.id }}</th> -->
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <!-- <td>{{ product.quantity }}</td> -->
          <td>
            <input type="number" min="0" v-model="product.quantity" />
            <!-- <input type="number" v-model="product.quantity" /> -->
          </td>
          <td>
            <button @click="sendQuantity(product.quantity, product)" class="btn btn-warning">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  created() {
    this.$store.dispatch("fetchData");
  },
  computed: mapState(["products"]),
  methods: {
    ...mapActions(["updateQuantity"]),
    sendQuantity(quantity, product) {
      // send the quantity to store and update the state and database
      // if (quantity >= 0) {
      //   (property);quantity: any
      //   this.updateQuantity({ quantity: quantity, product:product });
      // } else {
      //   // throw an error
      //   console.log("quantity must be 0 or above")
      // }
      // send the quantity to store and update the state and database
      this.updateQuantity({ quantity: quantity, product: product});
    }
  }
};
</script>
