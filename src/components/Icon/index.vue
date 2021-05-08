<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
// Components
import Loading from './Loading'

export default {
  name: 'Icon',

  components: {
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
