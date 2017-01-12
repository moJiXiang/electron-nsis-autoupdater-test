<template>
  <p>
    version 1.0.5.You are using electron v{{ versions['atom-shell'] }} with node v{{ versions.node }} on the {{ platform }} platform.
  </p>

</template>

<script>
  import os from 'os'

  export default {
    data () {
      return {
        platform: os.platform(),
        versions: process.versions
      }
    }
  }
</script>
