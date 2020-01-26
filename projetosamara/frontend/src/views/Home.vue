<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'selectedCityCode', 'selectedYear'
    ])
  },
  beforeMount () {
    if (!this.selectedCityCode) {
      this.$router.push({
        name: 'selecionar'
      })
    } else {
      this.$router.push({
        name: 'licitacoes'
      })
    }
  }
}
</script>
