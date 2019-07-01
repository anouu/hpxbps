<template> 
  <section :id="book.isbn" class="card">
    <div class="card__image">
      <img :src="book.cover" :alt="book.title">
    </div>
    <div class="card__info info">
      <h1 class="title is-4">{{ book.title }}</h1>
      <div class="info__synopsis">{{ book.synopsis[0] }}</div>
      <div class="card__actions">
        <div class="info__price">{{ book.price }}€</div>
        <button
          v-if="purchasable"
          @click="handleCardClick(book.isbn)"
          class="button is-medium"
        >
          {{ txt.action.buy }}
        </button>
        <button v-else class="button is-medium" disabled>{{ txt.action.already }}</button>
      </div>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import store from '../assets/scripts/store'

export default {
  name: 'Card',
  props: {
    book: {
      type: Object,
      default: () => ({})
    },

  },
  data() {
    return {
      purchasable: true,
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart',
      txt: 'texts'
    }),
  },
  methods: {
    ...mapMutations({ 
      updateCart: 'UPDATE_CART',
    }),

    handleCardClick(value) {
      this.updateCart(value)
      if (this.cart.includes(value)) {
        this.purchasable = false
      }
    }
  }
};
</script>

<style scope lang="scss">

.card {
  display: grid;
  grid-template-columns: 8em auto;
  grid-gap: 1rem;
  padding: 1rem;
  height: 100%;

  &__image {

    img {
      display: block;
    }
  }

  &__actions {
    margin-top: 2em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.info {
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  &__synopsis {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
  }

  &__price {
    margin-right: 1em;
    margin-bottom: 0;
  }
}
</style>