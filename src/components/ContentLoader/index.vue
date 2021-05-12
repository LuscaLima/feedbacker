<template>
  <div
    class="content-loader opacity-75"
    v-bind="$attrs"
    :style="{ width: computedWidth, height }"
  >
    <span :style="{ animationDuration }" class="content-loader--fx"></span>
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'ContentLoader',

  props: {
    width: {
      type: String,
      default: '1rem'
    },

    height: {
      type: String,
      default: '1rem'
    },

    minWidth: {
      type: Number,
      default: 80
    },

    maxWidth: {
      type: Number,
      default: 100
    },

    animationDuration: {
      type: String,
      default: '1.6s'
    }
  },

  setup(props) {
    const computedWidth = computed(() => {
      const value = Math.random() * (props.width - props.minWidth)
      return props.width ?? `${Math.floor(value + props.minWidth)}%`
    })

    return {
      computedWidth
    }
  }
}
</script>

<style lang="postcss" scoped>
.content-loader {
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
}

.content-loader--fx {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
  background-position: 0 0;
  background-size: 1000 100;
  animation: shimmer infinite alternate ease-in-out;
}

@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
