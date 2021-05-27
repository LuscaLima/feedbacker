<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ feedback.createdAt }}
      </span>
    </div>
  </div>
</template>

<script>
// Components
import Badge from './Badge'

export default {
  name: 'FeedbackCard',

  components: {
    Badge
  },

  props: {
    feedback: {
      type: Object,
      required: true
    }
  },

  setup() {
    function handleToggle() {}

    return {
      handleToggle
    }
  }
}
</script>
