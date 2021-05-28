<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
// Components
import Copy from './Copy'
import Loading from './Loading'
import ChevronDown from './ChevronDown'

export default {
  name: 'Icon',

  components: {
    Copy,
    Loading,
    ChevronDown
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
