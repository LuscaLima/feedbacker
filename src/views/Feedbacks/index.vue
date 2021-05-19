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
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            loading...
          </template>
        </suspense>
      </div>
      <div class="col-span-3 pt-20 px-10">
        feedbacks
      </div>
    </div>
  </div>
</template>

<script>
// Components
import TheHeaderLogged from '../../components/TheHeaderLogged'
import Filters from './Filters'

export default {
  name: 'Feedbacks',

  components: {
    TheHeaderLogged,
    Filters
  }
}
</script>
