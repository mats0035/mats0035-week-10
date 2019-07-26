import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    // 第２引数はactionsから来た送信対象のproductsデータ
    SET_PRODUCTS(state, serverData) {
      state.products = serverData;
    },
    PRODUCTS_SOLD(state, data) {
      // update the product quantity in the state
      const productIndex = this.getters.getProductIndex(data.product.id);
      state.products[productIndex].quantity -= data.quantity;

      // the line above is same as writing this:
      // state.products[productIndex].quantity = state.products[productIndex].quanitity - data.quantity;

      // Make API call to update the DB
      axios.put("https://mats0035-week-10.firebaseio.com/products.json",
      state.products)
      .then(response => {
        console.log("your data was updated " + response.status);
      })
      .catch(error => {
        console.log("there was an issue saving your data " + error.response);
      });
    },
    PRODUCT_QUANTITY(state, data) {
      // get the index of the product from the array of products
      const productIndex = this.getters.getProductIndex(data.product.id);
      // update the quantity of the product at the found index
      state.products[productIndex].quantity = data.quantity;
      // Make API call to update the DB
      axios.put("https://mats0035-week-10.firebaseio.com/products.json",
      state.products)
      .then(response => {
        console.log("your data was updated " + response.status);
      })
      .catch(error => {
        console.log("there was an issue saving your data " + error.response);
      });
    }
  },
  actions: {
    // 引数は渡すデータ？
    fetchData({ commit }) {
      // URLの下のproductsというDBにアクセスする
      axios
      .get("https://mats0035-week-10.firebaseio.com/products.json")
      .then(response => {
        commit("SET_PRODUCTS", response.data);
      });
    },
    buyProducts({commit}, { quantity, product }) {
      commit("PRODUCTS_SOLD", { quantity, product });
    },
    updateQuantity({commit}, { quantity, product }) {
      // commit the mutation to update the state, sending the payload as { quantity, product }
      commit("PRODUCT_QUANTITY", { quantity, product });
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    getProductIndex: state => id => {
      return state.products.findIndex(product => product.id === id);
    }
  }
});
// https://mats0035-week-10.firebaseio.com/