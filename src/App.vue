<template>
  <ModalFactory />
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Services
import services from './services'

// Components
import ModalFactory from './components/ModalFactory'

// Store
import { setCurrentUser } from './store/user'

export default {
  name: 'Feedbacker',

  components: {
    ModalFactory
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    watch(
      () => route.path,
      // eslint-disable-next-line space-before-function-paren
      async () => {
        if (route.meta.hasAuth) {
          const token = localStorage.getItem('token')

          if (!token) {
            router.push({ name: 'Home' })
          } else {
            const { data } = await services.users.getMe()

            setCurrentUser(data)
          }
        }
      }
    )
  }
}
</script>
