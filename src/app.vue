<template>
  <main>
    <header class="navbar">
      <div class="navbar-brand">
        <h1 class="title is-1">{{ txt.hero }}</h1>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button 
              class="cart-button button"
              @click="openBasket = true"
            >
              <span class="cart-icon icon is-large">
                <i class="fas fa-shopping-cart"></i>
              </span>
              <span v-if="cart.length > 0" class="count">{{ cart.length }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <ul v-if="books" class="book-list">
        <li
          v-for="(book, key, index) in books"
          :key="index"
          class="book-list__item"
        >
          <Card :book="book" />
        </li>
      </ul>
    </section>
    <transition name="basket-slide">
      <Basket 
        v-if="openBasket"
        @basket-close="openBasket = false"
      />
    </transition>
  </main>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
import store from './assets/scripts/store'
import Card from './components/card'
import Basket from './components/basket'

export default {
  name: 'App',
  store,
  components: { 
    Card,
    Basket,
  },
  data() {
    return {
      books: [],
      openBasket: false,
    }
  },
  computed: {
    ...mapGetters({ 
      cart: 'cart',
      txt: 'texts'
    }),
  },
  mounted() {
    this.getBooks()
  },
  methods: {
    ...mapMutations({ 
      updateBooks: 'GET_BOOKS',
    }),

    async getBooks() {
      this.books = (await axios.get('http://henri-potier.xebia.fr/books')).data
      this.updateBooks(this.books)
    }
  }
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";

.book-list {
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 2rem;
}

.cart {

  &-button {
    display: flex;
  }

  &-icon {
    position: relative;
  }
}

.count {
  width: 1.5rem;
  height: 1.5rem;
  top: 0;
  right: 0;
  background: $info;
  border-radius: 50%;
  color: $white;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
