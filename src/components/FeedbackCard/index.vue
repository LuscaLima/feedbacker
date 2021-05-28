<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium font-gray-800">
      {{ feedback.text }}
    </div>

    <div
      class="flex mt-8 animate__animated animate__fadeInUp animete__faster"
      :class="{ animate__fadeOutUp: state.isClosing }"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase selecte-none">
            Página
          </span>
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase selecte-none">
            Dispositivo
          </span>
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase selecte-none">
            Usuário
          </span>
          <span class="font-medium text-gray-700">{{
            feedback.fingerprint
          }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-else>
      <Icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

// Components
import Badge from './Badge'
import Icon from '../Icon'

// Utils
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import { wait } from '../../utils/wait'

// Palette
import palette from '../../../palette'

export default {
  name: 'FeedbackCard',

  components: {
    Badge,
    Icon
  },

  props: {
    feedback: {
      type: Object,
      required: true
    },

    isOpen: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const state = reactive({
      isOpen: props.isOpen,
      isClosing: !props.isOpen
    })

    async function handleToggle() {
      state.isClosing = true

      await wait(150)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>
