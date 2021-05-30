<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <TheHeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800">Listagem</h1>
        <suspense>
          <template #default>
            <Filters
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <FiltersLoading class="mt-8" />
          </template>
        </suspense>
      </div>
      <div class="col-span-3 pt-20 px-10">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ocorreu um erro ao carregar os feedbacks 😟
        </p>
        <p
          v-if="
            !state.feedbacks.length &&
              !state.isLoading &&
              !state.isLoadingFeedbacks &&
              !state.hasError
          "
          class="text-lg text-center text-gray-800 font-regular"
        >
          Nenhum feedback recebido 😟
        </p>

        <FeedbackCardLoading
          v-if="
            (state.isLoading || state.isLoadingFeedbacks) && !state.hasError
          "
        />
        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-open="!index"
          :feedback="feedback"
          class="mb-8"
        />
        <FeedbackCardLoading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue'

// Components
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import TheHeaderLogged from '../../components/TheHeaderLogged'
import FeedbackCard from '../../components/FeedbackCard'
import FeedbackCardLoading from '../../components/FeedbackCardLoading'

// Services
import services from '../../services'

export default {
  name: 'Feedbacks',

  components: {
    TheHeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },

  setup() {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      hasError: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      }
    })

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    function handleErros(error) {
      state.hasError = !!error
    }

    async function handleScroll() {
      const isBottomOfWindow =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
        document.documentElement.scrollHeight

      if (
        state.isLoading ||
        state.isLoadingMoreFeedbacks ||
        !isBottomOfWindow ||
        state.feedbacks.length >= state.pagination.total
      ) {
        return
      }

      try {
        state.isLoadingMoreFeedbacks = true

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: state.pagination.offset + 5
        })

        if (data.results.length) {
          state.feedbacks = [...state.feedbacks, ...data.results]
        }

        state.isLoadingMoreFeedbacks = false
        state.pagination = data.pagination
      } catch (error) {
        state.isLoadingMoreFeedbacks = false
        handleErros(error)
      }
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleErros(error)
      }
    }

    async function changeFeedbacksType(type) {
      try {
        state.isLoadingFeedbacks = true
        state.pagination.limit = 5
        state.pagination.offset = 0
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false
      } catch (error) {
        handleErros(error)
        state.isLoading = false
      }
    }

    return {
      state,
      fetchFeedbacks,
      changeFeedbacksType
    }
  }
}
</script>
