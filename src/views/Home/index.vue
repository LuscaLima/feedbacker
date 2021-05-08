<template>
  <CustomHeader @login="handleLogin" @account-create="handleAccountCreate" />
  <Contact />
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">
      feedbacker &copy; {{ new Date().getFullYear() }}
    </p>
  </footer>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Components
import CustomHeader from './CustomHeader'
import Contact from './Contact'

// Hooks
import useModal from '../../hooks/useModal'

export default {
  name: 'Home',

  components: {
    CustomHeader,
    Contact
  },

  setup() {
    const modal = useModal()
    const router = useRouter()

    onMounted(() => {
      const token = localStorage.getItem('token')

      if (token) {
        router.push({
          name: 'Feedbacks'
        })
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalAccountCreate'
      })
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>

<style></style>
