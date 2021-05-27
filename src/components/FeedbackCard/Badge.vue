<template>
  <span
    class="px-3 py-1 text-xs font-black text-white uppercase rounded-full"
    :class="`bg-${classColor}`"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'

const LABELS = {
  issue: 'problema',
  idea: 'ideia'
}

const COLORS = {
  issue: 'brand-danger',
  idea: 'brand-warning'
}

export default {
  name: 'Badge',

  props: {
    type: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const type = props.type.toLowerCase()

    const label = computed(() => LABELS[type] ?? 'outros')
    const classColor = computed(() => COLORS[type] ?? 'brand-graydark')

    return {
      label,
      classColor
    }
  }
}
</script>
