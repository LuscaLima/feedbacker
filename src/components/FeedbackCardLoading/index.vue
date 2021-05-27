<template>
  <ContentLoader class="flex flex-col pl-3 rounded" width="100%" height="250px">
    <ContentLoader
      class="rounded mt-3"
      width="90%"
      height="30px"
      animation-duration="2.3s"
    />
    <ContentLoader
      class="rounded mt-3"
      width="80%"
      height="30px"
      animation-duration="2.4s"
    />
    <ContentLoader
      class="rounded mt-3"
      width="60%"
      height="30px"
      animation-duration="2.2s"
    />
    <ContentLoader
      class="rounded mt-3"
      width="70%"
      height="30px"
      animation-duration="2.5s"
    />
    <ContentLoader
      class="rounded mt-3"
      width="95%"
      height="30px"
      animation-duration="1.8s"
    />
  </ContentLoader>
</template>

<script>
// Components
import ContentLoader from '../ContentLoader'

export default {
  name: 'FeedbackCardLoading',

  components: {
    ContentLoader
  }
}
</script>
