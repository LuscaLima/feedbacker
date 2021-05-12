<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
// Components
import Copy from './Copy'
import Loading from './Loading'

export default {
  name: 'Icon',

  components: {
    Copy,
    Loading
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
