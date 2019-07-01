<template> 
  <section class="basket">
    <div class="basket__wrapper">
      <header class="basket__header">
        <div class="title is-3">{{ txt.basket.title }}</div>
        <div class="basket__close" @click="$emit('basket-close')">      
          <span class="delete is-large"></span>
        </div>
      </header>

      <div v-if="cart.length > 0" class="basket__content"> 
        <ul class=" cart-list">
          <li
            v-for="(book, key, index) in cartBooks"
            :key="index"
            class="cart-list__item"
          >
            <CardMini :book="book" />
          </li>
        </ul>
        <div class="basket__summary summary">
          <div class="summary__block">
            <div class="summary__label title is-5">{{ txt.basket.total }}</div>
            <div class="summary__price subtitle is-3">{{ cartPrice }}€</div>
          </div>
          <template v-if="discountValue">
            <div class="summary__block">
              <div class="summary__label title is-6">{{ txt.basket.promo }}</div>
              <div class="summary__price subtitle is-5 summary__price--discount">-{{ discountValue }}€</div>
            </div>
            <div class="summary__block">
              <div class="summary__label title is-3">{{ txt.basket.final }}</div>
              <div class="summary__price subtitle is-1">{{ finalPrice }}€</div>
            </div>
          </template>
        </div>
      </div>
      <div v-else class="basket__content">
        {{ txt.basket.empty }}
      </div>
    </div>
  </section>
</template>
<script>
import { min } from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import store from '../assets/scripts/store'
import CardMini from './card-mini'

export default {
  name: 'Basket',
  components: { CardMini },
  data() {
    return {
      discountValue: null,
      finalPrice: this.cartPrice || 0
    }
  },
  computed: {
    ...mapGetters({ 
      cart: 'cart',
      txt: 'texts',
      books: 'books',
      cartBooks: 'cartBooks',
      offersData: 'offersData'
    }),
    cartPrice() {
      let prices = 0
      if (this.cartBooks.length) {
        prices = this.cartBooks.reduce((accumulator, value) => accumulator.concat(value.price), [])
        prices = prices.reduce((accumulator, value) => accumulator + value)
      }
      return prices
    }
  },
  async mounted() {
    await this.getOffers()
    if (this.offersData.offers) {
      this.bestPrice()
    }
  },
  methods: {
    ...mapActions({
      getOffers: 'getOffers'
    }),
    bestPrice() {
      let percentageCutPrice = this.cartPrice
      let minusCutPrice = this.cartPrice
      let sliceCutPrice = this.cartPrice
      let cutPrices = []
      this.offersData.offers.forEach(offer => {
        
        switch (offer.type) {
          case 'percentage' :
            percentageCutPrice = this.cartPrice - (this.cartPrice * offer.value / 100)
            break
          case 'minus' :
            minusCutPrice = this.cartPrice - offer.value
            break
          case 'slice' :
            let floor = Math.floor(this.cartPrice / offer.sliceValue)
            sliceCutPrice = this.cartPrice % floor === 0 ? this.cartPrice - floor * offer.value : this.cartPrice
            break
          default :
        }
      })
      cutPrices.push(percentageCutPrice)
      cutPrices.push(minusCutPrice)
      cutPrices.push(sliceCutPrice)
      this.discountValue = this.cartPrice - min(cutPrices)
      this.finalPrice = min(cutPrices)
    }
  }
};
</script>

<style scope lang="scss">
@import "~bulma/sass/utilities/_all";

.basket {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  width: 40rem;
  max-width: 100%;
  z-index: 100;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    right: 100%;
    bottom: 0;
    left: -200vw;
    background: rgba(0,0,0,0.75);
  }

  &__wrapper {
    padding: 1rem;
    overflow: hidden;
  }

  &__header {
    position: absolute;
    background: #f7f7f7;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

    .title:not(:last-child) {
      margin: 0;
    }
  }

  &__content {
    margin-top: 4rem;
    overflow-y: scroll;
    height: calc(100vh - 4rem);
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    cursor: pointer;
    margin: 1rem;
  }

  &-slide-enter-active,
  &-slide-leave-active {
    transition: opacity 0.5s, transform 0.25s;
  }

  &-slide-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  &-slide-leave-to {
    opacity: 0;
    transition: opacity 0.2s;
  }
}

.cart-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
  padding-bottom: 0.75rem;
}

.summary {
  padding: 0.75rem;
  background: $info;
  color: $white;
  
  &__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  &__price,
  &__label {

    &.title:not(.is-spaced) + &.subtitle,
    &.title:not(:last-child) {
      color: $white;
      margin: 0;
    }
  }
}

</style>