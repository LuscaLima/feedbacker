<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <TheHeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="font-black text-3xl text-brand-darkgray">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg font-regular text-gray-800">
        Esta aqui é sua chave de API
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded mt-2"
        width="600px"
        height="48px"
      />

      <div
        v-else
        class="flex py-3 px-5 mt-2 rounded justify-between items-center bg-brand-gray font-regular"
      >
        <span v-if="state.hasError">Erro ao carregar a API Key</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex" v-if="!state.hasError">
          <Icon
            name="Copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
            @click.stop="handleCopy"
          />

          <Icon
            name="Loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
            @click.stop="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg font-regular text-gray-800">
        Coloque o <i>script</i> abaixo no seu site para começar a receber
        feedbacks
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded mt-2"
        width="600px"
        height="48px"
      />

      <div
        v-else
        class="flex py-3 px-5 mt-2 rounded items-center bg-brand-gray font-medium"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>
&lt;script src="https://luscalima-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
// Components
import TheHeaderLogged from '../../components/TheHeaderLogged'
import Icon from '../../components/Icon'
import ContentLoader from '../../components/ContentLoader'

// Hooks
import { reactive, watch } from 'vue'
import useStore from '../../hooks/useStore'

// Palette
import palette from '../../../palette'

// Services
import services from '../../services'

// Store
import { setApiKey } from '../../store/user'

export default {
  name: 'Credentials',

  components: {
    TheHeaderLogged,
    Icon,
    ContentLoader
  },

  setup() {
    const store = useStore()

    const state = reactive({
      isLoading: false,
      hasError: false
    })

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleErrors(true)
        }
      }
    )

    function handleErrors(error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true

        const { data } = await services.users.generateApiKey()
        setApiKey(data.apiKey)

        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
      } catch (error) {
        handleErrors(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
