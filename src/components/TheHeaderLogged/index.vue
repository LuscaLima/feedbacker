<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="logo" />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => handleMenuClick('Credentials')"
          class="px-6 py-2 mr-2 text-white font-bold rounded-full cursor-pointer focus:outline-none"
        >
          Credenciais
        </li>

        <li
          @click="() => handleMenuClick('Feedbacks')"
          class="px-6 py-2 mr-2 text-white font-bold rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>

        <li
          @click="handleLogout"
          class="px-6 py-2 mr-2 text-brand-main font-bold bg-white rounded-full cursor-pointer focus:outline-none"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

// Hooks
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'

import { clearCurrentUser } from '../../store/user'

export default {
  name: 'TheHeaderLogged',

  setup() {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() =>
      store.currentUser.name ? `${store.currentUser.name} (sair)` : '...'
    )

    function handleMenuClick(route) {
      router.push({ name: route })
    }

    function handleLogout() {
      localStorage.removeItem('token')
      clearCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      handleMenuClick,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
