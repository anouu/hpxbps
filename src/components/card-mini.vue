<template> 
  <section :id="book.isbn" class="card card--mini">
    <div class="card__image">
      <img :src="book.cover" :alt="book.title">
    </div>
    <div class="card__info info">
      <h1 class="title is-4">{{ book.title }}</h1>
    </div>
    <div class="card__actions">
      <div class="info__price">{{ book.price }}€</div>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import store from '../assets/scripts/store'

export default {
  name: 'CardMini',
  props: {
    book: {
      type: Object,
      default: () => ({})
    },

  },
  computed: {
    ...mapGetters({
      txt: 'texts'
    }),
  },
};
</script>

<style scope lang="scss">

.card {
 $self: &;

  &--mini {
    grid-template-columns: 4em auto 4em;
    grid-gap: 1rem;
    padding: 0.75rem;


    #{$self}__actions {
      margin: 0;
    }
  }
}
</style>